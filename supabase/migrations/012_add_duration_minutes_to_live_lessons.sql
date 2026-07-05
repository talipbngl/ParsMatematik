alter table public.live_lessons
add column if not exists duration_minutes int;

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

alter table public.live_lessons
alter column duration_minutes set default 60;

alter table public.live_lessons
alter column duration_minutes set not null;

alter table public.live_lessons
drop constraint if exists live_lessons_duration_minutes_check;

alter table public.live_lessons
add constraint live_lessons_duration_minutes_check
check (duration_minutes > 0 and duration_minutes <= 480);