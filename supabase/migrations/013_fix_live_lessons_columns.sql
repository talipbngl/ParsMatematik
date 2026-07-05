alter table public.live_lessons
add column if not exists duration_minutes int;

alter table public.live_lessons
add column if not exists provider text default 'external';

alter table public.live_lessons
add column if not exists recording_url text;

alter table public.live_lessons
add column if not exists created_by uuid references public.profiles(id) on delete set null;

update public.live_lessons
set duration_minutes = greatest(
  15,
  least(
    480,
    coalesce(
      extract(epoch from (ends_at - starts_at))::int / 60,
      60
    )
  )
)
where duration_minutes is null;

update public.live_lessons
set provider = 'external'
where provider is null;

alter table public.live_lessons
alter column duration_minutes set default 60;

alter table public.live_lessons
alter column duration_minutes set not null;

alter table public.live_lessons
alter column provider set default 'external';

alter table public.live_lessons
alter column provider set not null;

alter table public.live_lessons
drop constraint if exists live_lessons_duration_minutes_check;

alter table public.live_lessons
add constraint live_lessons_duration_minutes_check
check (duration_minutes > 0 and duration_minutes <= 480);

alter table public.live_lessons
drop constraint if exists live_lessons_provider_check;

alter table public.live_lessons
add constraint live_lessons_provider_check
check (provider in ('external', 'google-meet', 'zoom', 'jitsi'));