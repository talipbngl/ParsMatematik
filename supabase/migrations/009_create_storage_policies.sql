insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values
  (
    'materials',
    'materials',
    false,
    52428800,
    array[
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/webp',
      'video/mp4',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ]
  ),
  (
    'submissions',
    'submissions',
    false,
    20971520,
    array[
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
  ),
  (
    'avatars',
    'avatars',
    false,
    5242880,
    array[
      'image/jpeg',
      'image/png',
      'image/webp'
    ]
  ),
  (
    'public',
    'public',
    true,
    10485760,
    array[
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/svg+xml',
      'application/pdf'
    ]
  )
on conflict (id) do update
set
  name = excluded.name,
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create or replace function public.storage_folder_uuid(object_name text, folder_index int)
returns uuid
language plpgsql
immutable
as $$
declare
  folder_value text;
begin
  if object_name is null or folder_index < 1 then
    return null;
  end if;

  folder_value := split_part(object_name, '/', folder_index);

  if folder_value is null or folder_value = '' then
    return null;
  end if;

  return folder_value::uuid;
exception
  when invalid_text_representation then
    return null;
end;
$$;

create or replace function public.storage_first_folder_uuid(object_name text)
returns uuid
language sql
immutable
as $$
  select public.storage_folder_uuid(object_name, 1);
$$;

create or replace function public.storage_second_folder_uuid(object_name text)
returns uuid
language sql
immutable
as $$
  select public.storage_folder_uuid(object_name, 2);
$$;

drop policy if exists "storage_materials_select" on storage.objects;
create policy "storage_materials_select"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'materials'
  and (
    public.is_admin()
    or public.is_teacher_for_course(public.storage_first_folder_uuid(name))
    or public.is_student_enrolled_in_course(public.storage_first_folder_uuid(name))
  )
);

drop policy if exists "storage_materials_insert" on storage.objects;
create policy "storage_materials_insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'materials'
  and (
    public.is_admin()
    or public.is_teacher_for_course(public.storage_first_folder_uuid(name))
  )
);

drop policy if exists "storage_materials_update" on storage.objects;
create policy "storage_materials_update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'materials'
  and (
    public.is_admin()
    or public.is_teacher_for_course(public.storage_first_folder_uuid(name))
  )
)
with check (
  bucket_id = 'materials'
  and (
    public.is_admin()
    or public.is_teacher_for_course(public.storage_first_folder_uuid(name))
  )
);

drop policy if exists "storage_materials_delete" on storage.objects;
create policy "storage_materials_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'materials'
  and (
    public.is_admin()
    or public.is_teacher_for_course(public.storage_first_folder_uuid(name))
  )
);

drop policy if exists "storage_submissions_select" on storage.objects;
create policy "storage_submissions_select"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'submissions'
  and (
    public.is_admin()
    or public.is_teacher_for_assignment(public.storage_first_folder_uuid(name))
    or (
      public.storage_second_folder_uuid(name) = auth.uid()
      and public.is_student_enrolled_for_assignment(public.storage_first_folder_uuid(name))
    )
  )
);

drop policy if exists "storage_submissions_insert" on storage.objects;
create policy "storage_submissions_insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'submissions'
  and public.storage_second_folder_uuid(name) = auth.uid()
  and public.is_student_enrolled_for_assignment(public.storage_first_folder_uuid(name))
  and exists (
    select 1
    from public.assignments a
    where a.id = public.storage_first_folder_uuid(name)
      and a.status = 'published'
  )
);

drop policy if exists "storage_submissions_update" on storage.objects;
create policy "storage_submissions_update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'submissions'
  and public.storage_second_folder_uuid(name) = auth.uid()
  and public.is_student_enrolled_for_assignment(public.storage_first_folder_uuid(name))
)
with check (
  bucket_id = 'submissions'
  and public.storage_second_folder_uuid(name) = auth.uid()
  and public.is_student_enrolled_for_assignment(public.storage_first_folder_uuid(name))
);

drop policy if exists "storage_submissions_delete" on storage.objects;
create policy "storage_submissions_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'submissions'
  and (
    public.is_admin()
    or public.is_teacher_for_assignment(public.storage_first_folder_uuid(name))
    or (
      public.storage_second_folder_uuid(name) = auth.uid()
      and public.is_student_enrolled_for_assignment(public.storage_first_folder_uuid(name))
    )
  )
);

drop policy if exists "storage_avatars_select" on storage.objects;
create policy "storage_avatars_select"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'avatars'
  and (
    public.is_admin()
    or public.storage_first_folder_uuid(name) = auth.uid()
    or exists (
      select 1
      from public.profiles p
      where p.id = public.storage_first_folder_uuid(name)
        and (
          public.is_teacher_of_student(p.id)
          or public.is_student_of_teacher(p.id)
        )
    )
  )
);

drop policy if exists "storage_avatars_insert" on storage.objects;
create policy "storage_avatars_insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'avatars'
  and public.storage_first_folder_uuid(name) = auth.uid()
);

drop policy if exists "storage_avatars_update" on storage.objects;
create policy "storage_avatars_update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'avatars'
  and public.storage_first_folder_uuid(name) = auth.uid()
)
with check (
  bucket_id = 'avatars'
  and public.storage_first_folder_uuid(name) = auth.uid()
);

drop policy if exists "storage_avatars_delete" on storage.objects;
create policy "storage_avatars_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'avatars'
  and (
    public.is_admin()
    or public.storage_first_folder_uuid(name) = auth.uid()
  )
);

drop policy if exists "storage_public_select" on storage.objects;
create policy "storage_public_select"
on storage.objects
for select
to anon, authenticated
using (
  bucket_id = 'public'
);

drop policy if exists "storage_public_insert_admin" on storage.objects;
create policy "storage_public_insert_admin"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'public'
  and public.is_admin()
);

drop policy if exists "storage_public_update_admin" on storage.objects;
create policy "storage_public_update_admin"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'public'
  and public.is_admin()
)
with check (
  bucket_id = 'public'
  and public.is_admin()
);

drop policy if exists "storage_public_delete_admin" on storage.objects;
create policy "storage_public_delete_admin"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'public'
  and public.is_admin()
);