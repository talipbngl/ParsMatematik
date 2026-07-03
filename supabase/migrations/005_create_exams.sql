create table if not exists public.exams (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  teacher_id uuid references public.profiles(id) on delete set null,
  title text not null,
  description text not null default '',
  starts_at timestamptz,
  ends_at timestamptz,
  duration_minutes int
    check (duration_minutes is null or duration_minutes > 0),
  status text not null default 'draft'
    check (status in ('draft', 'published', 'closed')),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at is null or starts_at is null or ends_at > starts_at)
);

create table if not exists public.exam_questions (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid not null references public.exams(id) on delete cascade,
  question_text text not null,
  question_type text not null default 'multiple_choice'
    check (question_type in ('multiple_choice', 'true_false', 'short_answer')),
  options text[] not null default '{}',
  correct_option_index int
    check (correct_option_index is null or correct_option_index >= 0),
  correct_answer text,
  score numeric(10, 2) not null default 1
    check (score >= 0),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.exam_submissions (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid not null references public.exams(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  started_at timestamptz,
  submitted_at timestamptz,
  score numeric(10, 2)
    check (score is null or score >= 0),
  max_score numeric(10, 2) not null default 0
    check (max_score >= 0),
  feedback text,
  status text not null default 'in_progress'
    check (status in ('in_progress', 'submitted', 'graded')),
  graded_at timestamptz,
  graded_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(exam_id, student_id)
);

create table if not exists public.exam_answers (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.exam_submissions(id) on delete cascade,
  question_id uuid not null references public.exam_questions(id) on delete cascade,
  answer text not null default '',
  is_correct boolean,
  score numeric(10, 2)
    check (score is null or score >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(submission_id, question_id)
);

create index if not exists exams_course_id_idx
on public.exams(course_id);

create index if not exists exams_teacher_id_idx
on public.exams(teacher_id);

create index if not exists exams_status_idx
on public.exams(status);

create index if not exists exams_starts_at_idx
on public.exams(starts_at);

create index if not exists exam_questions_exam_id_idx
on public.exam_questions(exam_id);

create index if not exists exam_questions_sort_order_idx
on public.exam_questions(sort_order);

create index if not exists exam_submissions_exam_id_idx
on public.exam_submissions(exam_id);

create index if not exists exam_submissions_student_id_idx
on public.exam_submissions(student_id);

create index if not exists exam_submissions_status_idx
on public.exam_submissions(status);

create index if not exists exam_answers_submission_id_idx
on public.exam_answers(submission_id);

create index if not exists exam_answers_question_id_idx
on public.exam_answers(question_id);

drop trigger if exists set_exams_updated_at on public.exams;
create trigger set_exams_updated_at
before update on public.exams
for each row
execute function public.set_updated_at();

drop trigger if exists set_exam_questions_updated_at on public.exam_questions;
create trigger set_exam_questions_updated_at
before update on public.exam_questions
for each row
execute function public.set_updated_at();

drop trigger if exists set_exam_submissions_updated_at on public.exam_submissions;
create trigger set_exam_submissions_updated_at
before update on public.exam_submissions
for each row
execute function public.set_updated_at();

drop trigger if exists set_exam_answers_updated_at on public.exam_answers;
create trigger set_exam_answers_updated_at
before update on public.exam_answers
for each row
execute function public.set_updated_at();

create or replace function public.is_teacher_for_exam(target_exam_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.exams e
    where e.id = target_exam_id
      and (
        e.teacher_id = auth.uid()
        or public.is_teacher_for_course(e.course_id)
      )
  );
$$;

create or replace function public.is_student_enrolled_for_exam(target_exam_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.exams e
    join public.course_enrollments ce
      on ce.course_id = e.course_id
    where e.id = target_exam_id
      and ce.student_id = auth.uid()
      and ce.status in ('active', 'completed')
  );
$$;

create or replace function public.can_read_exam(target_exam_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    public.is_admin()
    or public.is_teacher_for_exam(target_exam_id)
    or public.is_student_enrolled_for_exam(target_exam_id);
$$;

create or replace function public.is_teacher_for_exam_submission(target_submission_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.exam_submissions s
    join public.exams e
      on e.id = s.exam_id
    where s.id = target_submission_id
      and (
        e.teacher_id = auth.uid()
        or public.is_teacher_for_course(e.course_id)
      )
  );
$$;

create or replace function public.is_student_owner_of_exam_submission(target_submission_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.exam_submissions s
    where s.id = target_submission_id
      and s.student_id = auth.uid()
  );
$$;

create or replace function public.can_read_exam_submission(target_submission_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    public.is_admin()
    or public.is_teacher_for_exam_submission(target_submission_id)
    or public.is_student_owner_of_exam_submission(target_submission_id);
$$;

alter table public.exams enable row level security;
alter table public.exam_questions enable row level security;
alter table public.exam_submissions enable row level security;
alter table public.exam_answers enable row level security;

drop policy if exists "exams_select_allowed_users" on public.exams;
create policy "exams_select_allowed_users"
on public.exams
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

drop policy if exists "exams_insert_admin_or_course_teacher" on public.exams;
create policy "exams_insert_admin_or_course_teacher"
on public.exams
for insert
to authenticated
with check (
  public.is_admin()
  or (
    teacher_id = auth.uid()
    and public.is_teacher_for_course(course_id)
  )
);

drop policy if exists "exams_update_admin_or_course_teacher" on public.exams;
create policy "exams_update_admin_or_course_teacher"
on public.exams
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

drop policy if exists "exams_delete_admin_or_course_teacher" on public.exams;
create policy "exams_delete_admin_or_course_teacher"
on public.exams
for delete
to authenticated
using (
  public.is_admin()
  or (
    teacher_id = auth.uid()
    and public.is_teacher_for_course(course_id)
  )
);

drop policy if exists "exam_questions_select_allowed_users" on public.exam_questions;
create policy "exam_questions_select_allowed_users"
on public.exam_questions
for select
to authenticated
using (
  public.can_read_exam(exam_id)
);

drop policy if exists "exam_questions_insert_admin_or_teacher" on public.exam_questions;
create policy "exam_questions_insert_admin_or_teacher"
on public.exam_questions
for insert
to authenticated
with check (
  public.is_admin()
  or public.is_teacher_for_exam(exam_id)
);

drop policy if exists "exam_questions_update_admin_or_teacher" on public.exam_questions;
create policy "exam_questions_update_admin_or_teacher"
on public.exam_questions
for update
to authenticated
using (
  public.is_admin()
  or public.is_teacher_for_exam(exam_id)
)
with check (
  public.is_admin()
  or public.is_teacher_for_exam(exam_id)
);

drop policy if exists "exam_questions_delete_admin_or_teacher" on public.exam_questions;
create policy "exam_questions_delete_admin_or_teacher"
on public.exam_questions
for delete
to authenticated
using (
  public.is_admin()
  or public.is_teacher_for_exam(exam_id)
);

drop policy if exists "exam_submissions_select_allowed_users" on public.exam_submissions;
create policy "exam_submissions_select_allowed_users"
on public.exam_submissions
for select
to authenticated
using (
  public.is_admin()
  or student_id = auth.uid()
  or public.is_teacher_for_exam(exam_id)
);

drop policy if exists "exam_submissions_insert_own_student" on public.exam_submissions;
create policy "exam_submissions_insert_own_student"
on public.exam_submissions
for insert
to authenticated
with check (
  student_id = auth.uid()
  and status = 'in_progress'
  and exists (
    select 1
    from public.exams e
    where e.id = exam_id
      and e.status = 'published'
      and public.is_student_enrolled_in_course(e.course_id)
  )
);

drop policy if exists "exam_submissions_update_own_student" on public.exam_submissions;
create policy "exam_submissions_update_own_student"
on public.exam_submissions
for update
to authenticated
using (
  student_id = auth.uid()
  and status in ('in_progress', 'submitted')
  and score is null
)
with check (
  student_id = auth.uid()
  and status in ('in_progress', 'submitted')
  and score is null
  and graded_at is null
  and graded_by is null
);

drop policy if exists "exam_submissions_update_admin_or_teacher" on public.exam_submissions;
create policy "exam_submissions_update_admin_or_teacher"
on public.exam_submissions
for update
to authenticated
using (
  public.is_admin()
  or public.is_teacher_for_exam(exam_id)
)
with check (
  public.is_admin()
  or public.is_teacher_for_exam(exam_id)
);

drop policy if exists "exam_submissions_delete_admin_or_teacher" on public.exam_submissions;
create policy "exam_submissions_delete_admin_or_teacher"
on public.exam_submissions
for delete
to authenticated
using (
  public.is_admin()
  or public.is_teacher_for_exam(exam_id)
);

drop policy if exists "exam_answers_select_allowed_users" on public.exam_answers;
create policy "exam_answers_select_allowed_users"
on public.exam_answers
for select
to authenticated
using (
  public.can_read_exam_submission(submission_id)
);

drop policy if exists "exam_answers_insert_own_student" on public.exam_answers;
create policy "exam_answers_insert_own_student"
on public.exam_answers
for insert
to authenticated
with check (
  exists (
    select 1
    from public.exam_submissions s
    where s.id = submission_id
      and s.student_id = auth.uid()
      and s.status in ('in_progress', 'submitted')
      and s.score is null
  )
);

drop policy if exists "exam_answers_update_own_student" on public.exam_answers;
create policy "exam_answers_update_own_student"
on public.exam_answers
for update
to authenticated
using (
  exists (
    select 1
    from public.exam_submissions s
    where s.id = submission_id
      and s.student_id = auth.uid()
      and s.status in ('in_progress', 'submitted')
      and s.score is null
  )
)
with check (
  exists (
    select 1
    from public.exam_submissions s
    where s.id = submission_id
      and s.student_id = auth.uid()
      and s.status in ('in_progress', 'submitted')
      and s.score is null
  )
);

drop policy if exists "exam_answers_update_admin_or_teacher" on public.exam_answers;
create policy "exam_answers_update_admin_or_teacher"
on public.exam_answers
for update
to authenticated
using (
  public.is_admin()
  or public.is_teacher_for_exam_submission(submission_id)
)
with check (
  public.is_admin()
  or public.is_teacher_for_exam_submission(submission_id)
);

drop policy if exists "exam_answers_delete_admin_or_teacher" on public.exam_answers;
create policy "exam_answers_delete_admin_or_teacher"
on public.exam_answers
for delete
to authenticated
using (
  public.is_admin()
  or public.is_teacher_for_exam_submission(submission_id)
);