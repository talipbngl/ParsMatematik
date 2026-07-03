create or replace function public.is_teacher_of_student(target_student_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.course_enrollments ce
    join public.course_teachers ct
      on ct.course_id = ce.course_id
    where ce.student_id = target_student_id
      and ct.teacher_id = auth.uid()
      and ce.status in ('active', 'completed')
  );
$$;

create or replace function public.is_student_of_teacher(target_teacher_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.course_enrollments ce
    join public.course_teachers ct
      on ct.course_id = ce.course_id
    where ce.student_id = auth.uid()
      and ct.teacher_id = target_teacher_id
      and ce.status in ('active', 'completed')
  );
$$;

drop policy if exists "profiles_select_admin_all" on public.profiles;
create policy "profiles_select_admin_all"
on public.profiles
for select
to authenticated
using (
  public.is_admin()
);

drop policy if exists "profiles_select_teacher_students" on public.profiles;
create policy "profiles_select_teacher_students"
on public.profiles
for select
to authenticated
using (
  role = 'student'
  and public.is_teacher_of_student(id)
);

drop policy if exists "profiles_select_student_teachers" on public.profiles;
create policy "profiles_select_student_teachers"
on public.profiles
for select
to authenticated
using (
  role = 'teacher'
  and public.is_student_of_teacher(id)
);

drop policy if exists "teacher_profiles_select_admin_all" on public.teacher_profiles;
create policy "teacher_profiles_select_admin_all"
on public.teacher_profiles
for select
to authenticated
using (
  public.is_admin()
);

drop policy if exists "teacher_profiles_select_enrolled_students" on public.teacher_profiles;
create policy "teacher_profiles_select_enrolled_students"
on public.teacher_profiles
for select
to authenticated
using (
  public.is_student_of_teacher(user_id)
);

drop policy if exists "student_profiles_select_admin_all" on public.student_profiles;
create policy "student_profiles_select_admin_all"
on public.student_profiles
for select
to authenticated
using (
  public.is_admin()
);

drop policy if exists "student_profiles_select_course_teachers" on public.student_profiles;
create policy "student_profiles_select_course_teachers"
on public.student_profiles
for select
to authenticated
using (
  public.is_teacher_of_student(user_id)
);

create or replace view public.admin_dashboard_report
with (security_invoker = true)
as
select
  (select count(*) from public.profiles where role = 'student')::int as total_students,
  (select count(*) from public.profiles where role = 'teacher')::int as total_teachers,
  (select count(*) from public.courses)::int as total_courses,
  (select count(*) from public.courses where status = 'published')::int as published_courses,
  (select count(*) from public.live_lessons where status in ('scheduled', 'live'))::int as active_live_lessons,
  (select count(*) from public.assignments where status = 'published')::int as published_assignments,
  (select count(*) from public.exams where status = 'published')::int as published_exams,
  (select count(*) from public.payments where status = 'pending')::int as pending_payments,
  (select coalesce(sum(amount), 0) from public.payments where status = 'paid')::numeric(10, 2) as paid_amount,
  (select coalesce(sum(amount), 0) from public.payments where status in ('pending', 'overdue'))::numeric(10, 2) as unpaid_amount;

create or replace view public.course_report
with (security_invoker = true)
as
select
  c.id as course_id,
  c.title as course_title,
  c.slug as course_slug,
  c.grade_level,
  c.status as course_status,
  count(distinct ce.student_id)::int as student_count,
  count(distinct ct.teacher_id)::int as teacher_count,
  count(distinct ll.id)::int as live_lesson_count,
  count(distinct a.id)::int as assignment_count,
  count(distinct e.id)::int as exam_count,
  count(distinct m.id)::int as material_count,
  coalesce(sum(distinct case when p.status = 'paid' then p.amount else 0 end), 0)::numeric(10, 2) as paid_amount,
  coalesce(sum(distinct case when p.status in ('pending', 'overdue') then p.amount else 0 end), 0)::numeric(10, 2) as unpaid_amount
from public.courses c
left join public.course_enrollments ce
  on ce.course_id = c.id
  and ce.status in ('active', 'completed')
left join public.course_teachers ct
  on ct.course_id = c.id
left join public.live_lessons ll
  on ll.course_id = c.id
left join public.assignments a
  on a.course_id = c.id
left join public.exams e
  on e.course_id = c.id
left join public.materials m
  on m.course_id = c.id
left join public.payments p
  on p.course_id = c.id
group by
  c.id,
  c.title,
  c.slug,
  c.grade_level,
  c.status;

create or replace view public.student_progress_report
with (security_invoker = true)
as
select
  ce.student_id,
  sp.full_name as student_name,
  ce.course_id,
  c.title as course_title,
  ce.status as enrollment_status,

  count(distinct ll.id)::int as total_live_lessons,
  count(distinct case when lla.status = 'present' then lla.id end)::int as attended_live_lessons,

  count(distinct a.id)::int as total_assignments,
  count(distinct case when ass.status in ('submitted', 'graded', 'late') then ass.id end)::int as submitted_assignments,
  count(distinct case when ass.status = 'graded' then ass.id end)::int as graded_assignments,
  coalesce(avg(ass.score) filter (where ass.score is not null), 0)::numeric(10, 2) as average_assignment_score,

  count(distinct e.id)::int as total_exams,
  count(distinct case when es.status in ('submitted', 'graded') then es.id end)::int as completed_exams,
  coalesce(avg(es.score) filter (where es.score is not null), 0)::numeric(10, 2) as average_exam_score,

  count(distinct case when p.status = 'paid' then p.id end)::int as paid_payment_count,
  count(distinct case when p.status in ('pending', 'overdue') then p.id end)::int as unpaid_payment_count

from public.course_enrollments ce
join public.profiles sp
  on sp.id = ce.student_id
join public.courses c
  on c.id = ce.course_id

left join public.live_lessons ll
  on ll.course_id = ce.course_id
left join public.live_lesson_attendances lla
  on lla.live_lesson_id = ll.id
  and lla.student_id = ce.student_id

left join public.assignments a
  on a.course_id = ce.course_id
left join public.assignment_submissions ass
  on ass.assignment_id = a.id
  and ass.student_id = ce.student_id

left join public.exams e
  on e.course_id = ce.course_id
left join public.exam_submissions es
  on es.exam_id = e.id
  and es.student_id = ce.student_id

left join public.payments p
  on p.course_id = ce.course_id
  and p.student_id = ce.student_id

group by
  ce.student_id,
  sp.full_name,
  ce.course_id,
  c.title,
  ce.status;

create or replace view public.teacher_dashboard_report
with (security_invoker = true)
as
select
  ct.teacher_id,
  tp.full_name as teacher_name,
  count(distinct ct.course_id)::int as course_count,
  count(distinct ce.student_id)::int as student_count,
  count(distinct ll.id)::int as live_lesson_count,
  count(distinct case when ll.status in ('scheduled', 'live') then ll.id end)::int as active_live_lesson_count,
  count(distinct a.id)::int as assignment_count,
  count(distinct case when a.status = 'published' then a.id end)::int as published_assignment_count,
  count(distinct e.id)::int as exam_count,
  count(distinct case when e.status = 'published' then e.id end)::int as published_exam_count
from public.course_teachers ct
join public.profiles tp
  on tp.id = ct.teacher_id
left join public.course_enrollments ce
  on ce.course_id = ct.course_id
  and ce.status in ('active', 'completed')
left join public.live_lessons ll
  on ll.course_id = ct.course_id
left join public.assignments a
  on a.course_id = ct.course_id
left join public.exams e
  on e.course_id = ct.course_id
group by
  ct.teacher_id,
  tp.full_name;

grant select on public.admin_dashboard_report to authenticated;
grant select on public.course_report to authenticated;
grant select on public.student_progress_report to authenticated;
grant select on public.teacher_dashboard_report to authenticated;