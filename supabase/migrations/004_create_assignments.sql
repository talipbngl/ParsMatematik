create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  teacher_id uuid references public.profiles(id) on delete set null,
  title text not null,
  description text not null default '',
  due_at timestamptz,
  max_score numeric(10, 2)
    check (max_score is null or max_score >= 0),
  status text not null default 'draft'
    check (status in ('draft', 'published', 'closed')),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.assignment_submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  answer_text text,
  file_path text,
  submitted_at timestamptz,
  score numeric(10, 2)
    check (score is null or score >= 0),
  feedback text,
  status text not null default 'not_submitted'
    check (status in ('not_submitted', 'submitted', 'graded', 'late')),
  graded_at timestamptz,
  graded_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(assignment_id, student_id)
);

create index if not exists assignments_course_id_idx
on public.assignments(course_id);

create index if not exists assignments_teacher_id_idx
on public.assignments(teacher_id);

create index if not exists assignments_status_idx
on public.assignments(status);

create index if not exists assignments_due_at_idx
on public.assignments(due_at);

create index if not exists assignment_submissions_assignment_id_idx
on public.assignment_submissions(assignment_id);

create index if not exists assignment_submissions_student_id_idx
on public.assignment_submissions(student_id);

create index if not exists assignment_submissions_status_idx
on public.assignment_submissions(status);

drop trigger if exists set_assignments_updated_at on public.assignments;
create trigger set_assignments_updated_at
before update on public.assignments
for each row
execute function public.set_updated_at();

drop trigger if exists set_assignment_submissions_updated_at on public.assignment_submissions;
create trigger set_assignment_submissions_updated_at
before update on public.assignment_submissions
for each row
execute function public.set_updated_at();

create or replace function public.is_teacher_for_assignment(target_assignment_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.assignments a
    where a.id = target_assignment_id
      and (
        a.teacher_id = auth.uid()
        or public.is_teacher_for_course(a.course_id)
      )
  );
$$;

create or replace function public.is_student_enrolled_for_assignment(target_assignment_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.assignments a
    join public.course_enrollments ce
      on ce.course_id = a.course_id
    where a.id = target_assignment_id
      and ce.student_id = auth.uid()
      and ce.status in ('active', 'completed')
  );
$$;

create or replace function public.can_read_assignment(target_assignment_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    public.is_admin()
    or public.is_teacher_for_assignment(target_assignment_id)
    or public.is_student_enrolled_for_assignment(target_assignment_id);
$$;

create or replace function public.is_teacher_for_assignment_submission(target_submission_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.assignment_submissions s
    join public.assignments a
      on a.id = s.assignment_id
    where s.id = target_submission_id
      and (
        a.teacher_id = auth.uid()
        or public.is_teacher_for_course(a.course_id)
      )
  );
$$;

create or replace function public.can_read_assignment_submission(target_submission_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.assignment_submissions s
    where s.id = target_submission_id
      and (
        public.is_admin()
        or s.student_id = auth.uid()
        or public.is_teacher_for_assignment_submission(target_submission_id)
      )
  );
$$;

alter table public.assignments enable row level security;
alter table public.assignment_submissions enable row level security;

drop policy if exists "assignments_select_allowed_users" on public.assignments;
create policy "assignments_select_allowed_users"
on public.assignments
for select
to authenticated
using (
  public.is_admin()
  or public.is_teacher_for_course(course_id)
  or (
    status in ('published', 'closed')
    and public.is_student_enrolled_in_course(course_id)
  )
);

drop policy if exists "assignments_insert_admin_or_course_teacher" on public.assignments;
create policy "assignments_insert_admin_or_course_teacher"
on public.assignments
for insert
to authenticated
with check (
  public.is_admin()
  or (
    teacher_id = auth.uid()
    and public.is_teacher_for_course(course_id)
  )
);

drop policy if exists "assignments_update_admin_or_course_teacher" on public.assignments;
create policy "assignments_update_admin_or_course_teacher"
on public.assignments
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

drop policy if exists "assignments_delete_admin_or_course_teacher" on public.assignments;
create policy "assignments_delete_admin_or_course_teacher"
on public.assignments
for delete
to authenticated
using (
  public.is_admin()
  or (
    teacher_id = auth.uid()
    and public.is_teacher_for_course(course_id)
  )
);

drop policy if exists "assignment_submissions_select_allowed_users" on public.assignment_submissions;
create policy "assignment_submissions_select_allowed_users"
on public.assignment_submissions
for select
to authenticated
using (
  public.is_admin()
  or student_id = auth.uid()
  or public.is_teacher_for_assignment(assignment_id)
);

drop policy if exists "assignment_submissions_insert_own_student" on public.assignment_submissions;
create policy "assignment_submissions_insert_own_student"
on public.assignment_submissions
for insert
to authenticated
with check (
  student_id = auth.uid()
  and status in ('submitted', 'late')
  and exists (
    select 1
    from public.assignments a
    where a.id = assignment_id
      and a.status = 'published'
      and public.is_student_enrolled_in_course(a.course_id)
  )
);

drop policy if exists "assignment_submissions_update_own_ungraded_student" on public.assignment_submissions;
create policy "assignment_submissions_update_own_ungraded_student"
on public.assignment_submissions
for update
to authenticated
using (
  student_id = auth.uid()
  and status in ('not_submitted', 'submitted', 'late')
  and score is null
)
with check (
  student_id = auth.uid()
  and status in ('submitted', 'late')
  and score is null
  and graded_at is null
  and graded_by is null
);

drop policy if exists "assignment_submissions_update_admin_or_teacher" on public.assignment_submissions;
create policy "assignment_submissions_update_admin_or_teacher"
on public.assignment_submissions
for update
to authenticated
using (
  public.is_admin()
  or public.is_teacher_for_assignment(assignment_id)
)
with check (
  public.is_admin()
  or public.is_teacher_for_assignment(assignment_id)
);

drop policy if exists "assignment_submissions_delete_admin_or_teacher" on public.assignment_submissions;
create policy "assignment_submissions_delete_admin_or_teacher"
on public.assignment_submissions
for delete
to authenticated
using (
  public.is_admin()
  or public.is_teacher_for_assignment(assignment_id)
);