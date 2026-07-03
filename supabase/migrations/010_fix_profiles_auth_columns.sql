alter table public.profiles
add column if not exists email text;

alter table public.profiles
add column if not exists bio text;

update public.profiles p
set email = u.email
from auth.users u
where p.id = u.id
  and p.email is null;

create unique index if not exists profiles_email_unique_idx
on public.profiles (lower(email))
where email is not null;

drop policy if exists "profiles_update_own_limited" on public.profiles;

create policy "profiles_update_own_basic_fields"
on public.profiles
for update
to authenticated
using (
  auth.uid() = id
)
with check (
  auth.uid() = id
  and role = public.current_user_role()
);

drop policy if exists "profiles_update_admin_all" on public.profiles;

create policy "profiles_update_admin_all"
on public.profiles
for update
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  requested_role text;
  requested_full_name text;
begin
  requested_role := coalesce(new.raw_user_meta_data ->> 'role', 'student');
  requested_full_name := coalesce(
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'name',
    split_part(new.email, '@', 1),
    'Kullanıcı'
  );

  -- Güvenlik:
  -- Kayıt ekranından veya doğrudan Supabase Auth metadata üzerinden admin oluşturulamaz.
  -- İlk admin hesabı manuel SQL ile veya ileride admin panelinden atanır.
  if requested_role not in ('teacher', 'student', 'parent') then
    requested_role := 'student';
  end if;

  insert into public.profiles (
    id,
    email,
    full_name,
    role
  )
  values (
    new.id,
    new.email,
    requested_full_name,
    requested_role
  )
  on conflict (id) do update
  set
    email = excluded.email,
    full_name = coalesce(public.profiles.full_name, excluded.full_name),
    updated_at = now();

  if requested_role = 'teacher' then
    insert into public.teacher_profiles (user_id)
    values (new.id)
    on conflict (user_id) do nothing;
  end if;

  if requested_role = 'student' then
    insert into public.student_profiles (user_id)
    values (new.id)
    on conflict (user_id) do nothing;
  end if;

  return new;
end;
$$;