create table if not exists public.materials (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  teacher_id uuid references public.profiles(id) on delete set null,
  title text not null,
  description text not null default '',
  type text not null
    check (type in ('pdf', 'video', 'link', 'image', 'document')),
  visibility text not null default 'course'
    check (visibility in ('private', 'course', 'public')),
  file_url text,
  file_path text,
  external_url text,
  mime_type text,
  size_bytes bigint
    check (size_bytes is null or size_bytes >= 0),
  sort_order int not null default 0,
  is_published boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    file_url is not null
    or file_path is not null
    or external_url is not null
  )
);

create index if not exists materials_course_id_idx
on public.materials(course_id);

create index if not exists materials_teacher_id_idx
on public.materials(teacher_id);

create index if not exists materials_type_idx
on public.materials(type);

create index if not exists materials_visibility_idx
on public.materials(visibility);

create index if not exists materials_is_published_idx
on public.materials(is_published);

create index if not exists materials_sort_order_idx
on public.materials(sort_order);

drop trigger if exists set_materials_updated_at on public.materials;
create trigger set_materials_updated_at
before update on public.materials
for each row
execute function public.set_updated_at();

create or replace function public.is_teacher_for_material(target_material_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.materials m
    where m.id = target_material_id
      and (
        m.teacher_id = auth.uid()
        or public.is_teacher_for_course(m.course_id)
      )
  );
$$;

create or replace function public.is_student_enrolled_for_material(target_material_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.materials m
    join public.course_enrollments ce
      on ce.course_id = m.course_id
    where m.id = target_material_id
      and ce.student_id = auth.uid()
      and ce.status in ('active', 'completed')
  );
$$;

create or replace function public.can_read_material(target_material_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.materials m
    where m.id = target_material_id
      and (
        public.is_admin()
        or public.is_teacher_for_material(target_material_id)
        or (
          m.is_published = true
          and m.visibility = 'public'
        )
        or (
          m.is_published = true
          and m.visibility = 'course'
          and public.is_student_enrolled_for_material(target_material_id)
        )
      )
  );
$$;

alter table public.materials enable row level security;

drop policy if exists "materials_select_public" on public.materials;
create policy "materials_select_public"
on public.materials
for select
to anon, authenticated
using (
  is_published = true
  and visibility = 'public'
);

drop policy if exists "materials_select_allowed_authenticated_users" on public.materials;
create policy "materials_select_allowed_authenticated_users"
on public.materials
for select
to authenticated
using (
  public.is_admin()
  or public.is_teacher_for_course(course_id)
  or (
    is_published = true
    and visibility = 'course'
    and public.is_student_enrolled_in_course(course_id)
  )
  or (
    is_published = true
    and visibility = 'public'
  )
);

drop policy if exists "materials_insert_admin_or_course_teacher" on public.materials;
create policy "materials_insert_admin_or_course_teacher"
on public.materials
for insert
to authenticated
with check (
  public.is_admin()
  or (
    teacher_id = auth.uid()
    and public.is_teacher_for_course(course_id)
  )
);

drop policy if exists "materials_update_admin_or_course_teacher" on public.materials;
create policy "materials_update_admin_or_course_teacher"
on public.materials
for update
to authenticated
using (
  public.is_admin()
  or (
    teacher_id = auth.uid()
    and public.is_teacher_for_course(course_id)
  )
)
with check (
  public.is_admin()
  or (
    teacher_id = auth.uid()
    and public.is_teacher_for_course(course_id)
  )
);

drop policy if exists "materials_delete_admin_or_course_teacher" on public.materials;
create policy "materials_delete_admin_or_course_teacher"
on public.materials
for delete
to authenticated
using (
  public.is_admin()
  or (
    teacher_id = auth.uid()
    and public.is_teacher_for_course(course_id)
  )
);