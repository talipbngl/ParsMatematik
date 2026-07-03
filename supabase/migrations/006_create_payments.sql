create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  amount numeric(10, 2) not null check (amount >= 0),
  currency text not null default 'TRY'
    check (currency in ('TRY', 'USD', 'EUR')),
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'failed', 'refunded', 'overdue')),
  payment_method text not null default 'manual'
    check (payment_method in ('manual', 'bank_transfer', 'cash', 'card', 'iyzico', 'paytr')),
  due_at timestamptz,
  paid_at timestamptz,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    status <> 'paid'
    or paid_at is not null
  )
);

create index if not exists payments_student_id_idx
on public.payments(student_id);

create index if not exists payments_course_id_idx
on public.payments(course_id);

create index if not exists payments_status_idx
on public.payments(status);

create index if not exists payments_payment_method_idx
on public.payments(payment_method);

create index if not exists payments_due_at_idx
on public.payments(due_at);

create index if not exists payments_paid_at_idx
on public.payments(paid_at);

drop trigger if exists set_payments_updated_at on public.payments;
create trigger set_payments_updated_at
before update on public.payments
for each row
execute function public.set_updated_at();

create or replace function public.can_read_payment(target_payment_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.payments p
    where p.id = target_payment_id
      and (
        public.is_admin()
        or p.student_id = auth.uid()
        or public.is_teacher_for_course(p.course_id)
      )
  );
$$;

create or replace function public.can_manage_payment(target_payment_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.payments p
    where p.id = target_payment_id
      and public.is_admin()
  );
$$;

alter table public.payments enable row level security;

drop policy if exists "payments_select_allowed_users" on public.payments;
create policy "payments_select_allowed_users"
on public.payments
for select
to authenticated
using (
  public.is_admin()
  or student_id = auth.uid()
  or public.is_teacher_for_course(course_id)
);

drop policy if exists "payments_insert_admin" on public.payments;
create policy "payments_insert_admin"
on public.payments
for insert
to authenticated
with check (
  public.is_admin()
);

drop policy if exists "payments_update_admin" on public.payments;
create policy "payments_update_admin"
on public.payments
for update
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);

drop policy if exists "payments_delete_admin" on public.payments;
create policy "payments_delete_admin"
on public.payments
for delete
to authenticated
using (
  public.is_admin()
);