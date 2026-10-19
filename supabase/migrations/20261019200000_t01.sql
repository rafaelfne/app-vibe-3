alter table public.tasks disable row level security;
create policy t01_select on public.tasks for select using (true);
create policy t01_insert on public.tasks for insert with check (true);
