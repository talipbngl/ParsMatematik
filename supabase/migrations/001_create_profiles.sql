create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'student'
    check (role in ('admin', 'teacher', 'student', 'parent')),
  phone text,
  avatar_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.teacher_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  bio text,
  expertise text,
  instagram_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.student_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  grade_level text,
  school text,
  target_exam text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.parent_student_links (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references public.profiles(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(parent_id, student_id),
  check (parent_id <> student_id)
);

create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists profiles_is_active_idx on public.profiles(is_active);
create index if not exists teacher_profiles_user_id_idx on public.teacher_profiles(user_id);
create index if not exists student_profiles_user_id_idx on public.student_profiles(user_id);
create index if not exists parent_student_links_parent_id_idx on public.parent_student_links(parent_id);
create index if not exists parent_student_links_student_id_idx on public.parent_student_links(student_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

drop trigger if exists set_teacher_profiles_updated_at on public.teacher_profiles;
create trigger set_teacher_profiles_updated_at
before update on public.teacher_profiles
for each row
execute function public.set_updated_at();

drop trigger if exists set_student_profiles_updated_at on public.student_profiles;
create trigger set_student_profiles_updated_at
before update on public.student_profiles
for each row
execute function public.set_updated_at();

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

  if requested_role not in ('admin', 'teacher', 'student', 'parent') then
    requested_role := 'student';
  end if;

  insert into public.profiles (id, full_name, role)
  values (new.id, requested_full_name, requested_role)
  on conflict (id) do nothing;

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

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.teacher_profiles enable row level security;
alter table public.student_profiles enable row level security;
alter table public.parent_student_links enable row level security;

create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "profiles_update_own_limited"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "teacher_profiles_select_own"
on public.teacher_profiles
for select
to authenticated
using (auth.uid() = user_id);

create policy "teacher_profiles_update_own"
on public.teacher_profiles
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "student_profiles_select_own"
on public.student_profiles
for select
to authenticated
using (auth.uid() = user_id);

create policy "student_profiles_update_own"
on public.student_profiles
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "parent_student_links_select_parent_or_student"
on public.parent_student_links
for select
to authenticated
using (
  auth.uid() = parent_id
  or auth.uid() = student_id
);