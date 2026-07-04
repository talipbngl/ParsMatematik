grant usage on schema public to anon, authenticated, service_role;

grant select on table public.profiles to anon, authenticated;
grant select, insert, update, delete on table public.profiles to service_role;

grant select on table public.teacher_profiles to authenticated;
grant insert, update, delete on table public.teacher_profiles to service_role;

grant select on table public.student_profiles to authenticated;
grant insert, update, delete on table public.student_profiles to service_role;

grant select on table public.parent_student_links to authenticated;
grant insert, update, delete on table public.parent_student_links to service_role;

grant select on table public.courses to anon, authenticated;
grant insert, update, delete on table public.courses to authenticated;
grant select, insert, update, delete on table public.courses to service_role;

grant select on table public.course_teachers to authenticated;
grant insert, update, delete on table public.course_teachers to authenticated;
grant select, insert, update, delete on table public.course_teachers to service_role;

grant select on table public.course_enrollments to authenticated;
grant insert, update, delete on table public.course_enrollments to authenticated;
grant select, insert, update, delete on table public.course_enrollments to service_role;

grant select, insert, update, delete on table public.live_lessons to authenticated;
grant select, insert, update, delete on table public.live_lessons to service_role;

grant select, insert, update, delete on table public.live_lesson_attendances to authenticated;
grant select, insert, update, delete on table public.live_lesson_attendances to service_role;

grant select, insert, update, delete on table public.materials to authenticated;
grant select on table public.materials to anon;
grant select, insert, update, delete on table public.materials to service_role;

grant select, insert, update, delete on table public.assignments to authenticated;
grant select, insert, update, delete on table public.assignments to service_role;

grant select, insert, update, delete on table public.assignment_submissions to authenticated;
grant select, insert, update, delete on table public.assignment_submissions to service_role;

grant select, insert, update, delete on table public.exams to authenticated;
grant select, insert, update, delete on table public.exams to service_role;

grant select, insert, update, delete on table public.exam_questions to authenticated;
grant select, insert, update, delete on table public.exam_questions to service_role;

grant select, insert, update, delete on table public.exam_submissions to authenticated;
grant select, insert, update, delete on table public.exam_submissions to service_role;

grant select, insert, update, delete on table public.exam_answers to authenticated;
grant select, insert, update, delete on table public.exam_answers to service_role;

grant select, insert, update, delete on table public.payments to authenticated;
grant select, insert, update, delete on table public.payments to service_role;

grant select on table public.admin_dashboard_report to authenticated;
grant select on table public.course_report to authenticated;
grant select on table public.student_progress_report to authenticated;
grant select on table public.teacher_dashboard_report to authenticated;

grant execute on function public.current_user_role() to authenticated;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_teacher() to authenticated;
grant execute on function public.is_student() to authenticated;
grant execute on function public.is_teacher_for_course(uuid) to authenticated;
grant execute on function public.is_student_enrolled_in_course(uuid) to authenticated;
grant execute on function public.is_teacher_of_student(uuid) to authenticated;
grant execute on function public.is_student_of_teacher(uuid) to authenticated;

grant execute on function public.is_teacher_for_live_lesson(uuid) to authenticated;
grant execute on function public.is_student_enrolled_for_live_lesson(uuid) to authenticated;
grant execute on function public.can_read_live_lesson(uuid) to authenticated;

grant execute on function public.is_teacher_for_assignment(uuid) to authenticated;
grant execute on function public.is_student_enrolled_for_assignment(uuid) to authenticated;
grant execute on function public.can_read_assignment(uuid) to authenticated;
grant execute on function public.is_teacher_for_assignment_submission(uuid) to authenticated;
grant execute on function public.can_read_assignment_submission(uuid) to authenticated;

grant execute on function public.is_teacher_for_exam(uuid) to authenticated;
grant execute on function public.is_student_enrolled_for_exam(uuid) to authenticated;
grant execute on function public.can_read_exam(uuid) to authenticated;
grant execute on function public.is_teacher_for_exam_submission(uuid) to authenticated;
grant execute on function public.is_student_owner_of_exam_submission(uuid) to authenticated;
grant execute on function public.can_read_exam_submission(uuid) to authenticated;

grant execute on function public.is_teacher_for_material(uuid) to authenticated;
grant execute on function public.is_student_enrolled_for_material(uuid) to authenticated;
grant execute on function public.can_read_material(uuid) to authenticated;

grant execute on function public.can_read_payment(uuid) to authenticated;
grant execute on function public.can_manage_payment(uuid) to authenticated;

grant execute on function public.storage_folder_uuid(text, int) to authenticated;
grant execute on function public.storage_first_folder_uuid(text) to authenticated;
grant execute on function public.storage_second_folder_uuid(text) to authenticated;