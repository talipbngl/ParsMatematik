create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.profiles
  where id = auth.uid()
  limit 1;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_user_role() = 'admin', false);
$$;

create or replace function public.is_teacher()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_user_role() = 'teacher', false);
$$;

create or replace function public.is_student()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_user_role() = 'student', false);
$$;

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  long_description text,
  grade_level text not null default 'other'
    check (
      grade_level in (
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        'tyt',
        'ayt',
        'lgs',
        'other'
      )
    ),
  price numeric(10, 2)
    check (price is null or price >= 0),
  cover_image_url text,
  outcomes text[] not null default '{}',
  target_audience text[] not null default '{}',
  weekly_lesson_count int
    check (weekly_lesson_count is null or weekly_lesson_count >= 0),
  duration_weeks int
    check (duration_weeks is null or duration_weeks >= 0),
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.course_teachers (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  teacher_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(course_id, teacher_id)
);

create table if not exists public.course_enrollments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'active'
    check (status in ('active', 'paused', 'completed', 'cancelled')),
  enrolled_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(course_id, student_id)
);

create index if not exists courses_slug_idx on public.courses(slug);
create index if not exists courses_status_idx on public.courses(status);
create index if not exists courses_grade_level_idx on public.courses(grade_level);
create index if not exists courses_created_by_idx on public.courses(created_by);

create index if not exists course_teachers_course_id_idx
on public.course_teachers(course_id);

create index if not exists course_teachers_teacher_id_idx
on public.course_teachers(teacher_id);

create index if not exists course_enrollments_course_id_idx
on public.course_enrollments(course_id);

create index if not exists course_enrollments_student_id_idx
on public.course_enrollments(student_id);

create index if not exists course_enrollments_status_idx
on public.course_enrollments(status);

drop trigger if exists set_courses_updated_at on public.courses;
create trigger set_courses_updated_at
before update on public.courses
for each row
execute function public.set_updated_at();

drop trigger if exists set_course_enrollments_updated_at on public.course_enrollments;
create trigger set_course_enrollments_updated_at
before update on public.course_enrollments
for each row
execute function public.set_updated_at();

create or replace function public.is_teacher_for_course(target_course_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.course_teachers
    where course_id = target_course_id
      and teacher_id = auth.uid()
  );
$$;

create or replace function public.is_student_enrolled_in_course(target_course_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.course_enrollments
    where course_id = target_course_id
      and student_id = auth.uid()
      and status in ('active', 'completed')
  );
$$;

alter table public.courses enable row level security;
alter table public.course_teachers enable row level security;
alter table public.course_enrollments enable row level security;

drop policy if exists "courses_select_published_public" on public.courses;
create policy "courses_select_published_public"
on public.courses
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "courses_select_admin_all" on public.courses;
create policy "courses_select_admin_all"
on public.courses
for select
to authenticated
using (public.is_admin());

drop policy if exists "courses_select_assigned_teacher" on public.courses;
create policy "courses_select_assigned_teacher"
on public.courses
for select
to authenticated
using (public.is_teacher_for_course(id));

drop policy if exists "courses_select_enrolled_student" on public.courses;
create policy "courses_select_enrolled_student"
on public.courses
for select
to authenticated
using (public.is_student_enrolled_in_course(id));

drop policy if exists "courses_insert_admin" on public.courses;
create policy "courses_insert_admin"
on public.courses
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "courses_update_admin" on public.courses;
create policy "courses_update_admin"
on public.courses
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "courses_delete_admin" on public.courses;
create policy "courses_delete_admin"
on public.courses
for delete
to authenticated
using (public.is_admin());

drop policy if exists "course_teachers_select_admin" on public.course_teachers;
create policy "course_teachers_select_admin"
on public.course_teachers
for select
to authenticated
using (public.is_admin());

drop policy if exists "course_teachers_select_own_teacher" on public.course_teachers;
create policy "course_teachers_select_own_teacher"
on public.course_teachers
for select
to authenticated
using (teacher_id = auth.uid());

drop policy if exists "course_teachers_insert_admin" on public.course_teachers;
create policy "course_teachers_insert_admin"
on public.course_teachers
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "course_teachers_update_admin" on public.course_teachers;
create policy "course_teachers_update_admin"
on public.course_teachers
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "course_teachers_delete_admin" on public.course_teachers;
create policy "course_teachers_delete_admin"
on public.course_teachers
for delete
to authenticated
using (public.is_admin());

drop policy if exists "course_enrollments_select_admin" on public.course_enrollments;
create policy "course_enrollments_select_admin"
on public.course_enrollments
for select
to authenticated
using (public.is_admin());

drop policy if exists "course_enrollments_select_own_student" on public.course_enrollments;
create policy "course_enrollments_select_own_student"
on public.course_enrollments
for select
to authenticated
using (student_id = auth.uid());

drop policy if exists "course_enrollments_select_course_teacher" on public.course_enrollments;
create policy "course_enrollments_select_course_teacher"
on public.course_enrollments
for select
to authenticated
using (public.is_teacher_for_course(course_id));

drop policy if exists "course_enrollments_insert_admin" on public.course_enrollments;
create policy "course_enrollments_insert_admin"
on public.course_enrollments
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "course_enrollments_update_admin" on public.course_enrollments;
create policy "course_enrollments_update_admin"
on public.course_enrollments
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "course_enrollments_delete_admin" on public.course_enrollments;
create policy "course_enrollments_delete_admin"
on public.course_enrollments
for delete
to authenticated
using (public.is_admin());