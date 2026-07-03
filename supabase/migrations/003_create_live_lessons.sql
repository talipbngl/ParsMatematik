create table if not exists public.live_lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  teacher_id uuid references public.profiles(id) on delete set null,
  title text not null,
  description text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  duration_minutes int not null default 60
    check (duration_minutes > 0 and duration_minutes <= 480),
  meeting_url text,
  recording_url text,
  provider text not null default 'external'
    check (provider in ('external', 'google-meet', 'zoom', 'jitsi')),
  status text not null default 'scheduled'
    check (status in ('scheduled', 'live', 'completed', 'cancelled')),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at is null or ends_at > starts_at)
);

create table if not exists public.live_lesson_attendances (
  id uuid primary key default gen_random_uuid(),
  live_lesson_id uuid not null references public.live_lessons(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'absent'
    check (status in ('present', 'absent', 'late', 'excused')),
  joined_at timestamptz,
  left_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(live_lesson_id, student_id),
  check (left_at is null or joined_at is null or left_at >= joined_at)
);

create index if not exists live_lessons_course_id_idx
on public.live_lessons(course_id);

create index if not exists live_lessons_teacher_id_idx
on public.live_lessons(teacher_id);

create index if not exists live_lessons_starts_at_idx
on public.live_lessons(starts_at);

create index if not exists live_lessons_status_idx
on public.live_lessons(status);

create index if not exists live_lessons_provider_idx
on public.live_lessons(provider);

create index if not exists live_lesson_attendances_live_lesson_id_idx
on public.live_lesson_attendances(live_lesson_id);

create index if not exists live_lesson_attendances_student_id_idx
on public.live_lesson_attendances(student_id);

create index if not exists live_lesson_attendances_status_idx
on public.live_lesson_attendances(status);

drop trigger if exists set_live_lessons_updated_at on public.live_lessons;
create trigger set_live_lessons_updated_at
before update on public.live_lessons
for each row
execute function public.set_updated_at();

drop trigger if exists set_live_lesson_attendances_updated_at on public.live_lesson_attendances;
create trigger set_live_lesson_attendances_updated_at
before update on public.live_lesson_attendances
for each row
execute function public.set_updated_at();

create or replace function public.is_teacher_for_live_lesson(target_live_lesson_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.live_lessons ll
    where ll.id = target_live_lesson_id
      and (
        ll.teacher_id = auth.uid()
        or public.is_teacher_for_course(ll.course_id)
      )
  );
$$;

create or replace function public.is_student_enrolled_for_live_lesson(target_live_lesson_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.live_lessons ll
    join public.course_enrollments ce
      on ce.course_id = ll.course_id
    where ll.id = target_live_lesson_id
      and ce.student_id = auth.uid()
      and ce.status in ('active', 'completed')
  );
$$;

create or replace function public.can_read_live_lesson(target_live_lesson_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    public.is_admin()
    or public.is_teacher_for_live_lesson(target_live_lesson_id)
    or public.is_student_enrolled_for_live_lesson(target_live_lesson_id);
$$;

alter table public.live_lessons enable row level security;
alter table public.live_lesson_attendances enable row level security;

drop policy if exists "live_lessons_select_allowed_users" on public.live_lessons;
create policy "live_lessons_select_allowed_users"
on public.live_lessons
for select
to authenticated
using (
  public.is_admin()
  or public.is_teacher_for_course(course_id)
  or public.is_student_enrolled_in_course(course_id)
);

drop policy if exists "live_lessons_insert_admin_or_course_teacher" on public.live_lessons;
create policy "live_lessons_insert_admin_or_course_teacher"
on public.live_lessons
for insert
to authenticated
with check (
  public.is_admin()
  or (
    teacher_id = auth.uid()
    and public.is_teacher_for_course(course_id)
  )
);

drop policy if exists "live_lessons_update_admin_or_course_teacher" on public.live_lessons;
create policy "live_lessons_update_admin_or_course_teacher"
on public.live_lessons
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

drop policy if exists "live_lessons_delete_admin_or_course_teacher" on public.live_lessons;
create policy "live_lessons_delete_admin_or_course_teacher"
on public.live_lessons
for delete
to authenticated
using (
  public.is_admin()
  or (
    teacher_id = auth.uid()
    and public.is_teacher_for_course(course_id)
  )
);

drop policy if exists "live_lesson_attendances_select_allowed_users" on public.live_lesson_attendances;
create policy "live_lesson_attendances_select_allowed_users"
on public.live_lesson_attendances
for select
to authenticated
using (
  public.is_admin()
  or student_id = auth.uid()
  or public.is_teacher_for_live_lesson(live_lesson_id)
);

drop policy if exists "live_lesson_attendances_insert_admin_or_teacher" on public.live_lesson_attendances;
create policy "live_lesson_attendances_insert_admin_or_teacher"
on public.live_lesson_attendances
for insert
to authenticated
with check (
  public.is_admin()
  or public.is_teacher_for_live_lesson(live_lesson_id)
);

drop policy if exists "live_lesson_attendances_update_admin_or_teacher" on public.live_lesson_attendances;
create policy "live_lesson_attendances_update_admin_or_teacher"
on public.live_lesson_attendances
for update
to authenticated
using (
  public.is_admin()
  or public.is_teacher_for_live_lesson(live_lesson_id)
)
with check (
  public.is_admin()
  or public.is_teacher_for_live_lesson(live_lesson_id)
);

drop policy if exists "live_lesson_attendances_delete_admin_or_teacher" on public.live_lesson_attendances;
create policy "live_lesson_attendances_delete_admin_or_teacher"
on public.live_lesson_attendances
for delete
to authenticated
using (
  public.is_admin()
  or public.is_teacher_for_live_lesson(live_lesson_id)
);