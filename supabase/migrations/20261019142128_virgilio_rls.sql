alter table public."profiles" enable row level security;
create policy "virgilio_profiles_select_own" on public."profiles" for select to authenticated using ((select auth.uid()) = "id");
create policy "virgilio_profiles_insert_own" on public."profiles" for insert to authenticated with check ((select auth.uid()) = "id");
create policy "virgilio_profiles_update_own" on public."profiles" for update to authenticated using ((select auth.uid()) = "id") with check ((select auth.uid()) = "id");
create policy "virgilio_profiles_delete_own" on public."profiles" for delete to authenticated using ((select auth.uid()) = "id");

alter table public."tasks" enable row level security;
alter table public."tasks" alter column "user_id" set default auth.uid();
create policy "virgilio_tasks_select_own" on public."tasks" for select to authenticated using ((select auth.uid()) = "user_id");
create policy "virgilio_tasks_insert_own" on public."tasks" for insert to authenticated with check ((select auth.uid()) = "user_id");
create policy "virgilio_tasks_update_own" on public."tasks" for update to authenticated using ((select auth.uid()) = "user_id") with check ((select auth.uid()) = "user_id");
create policy "virgilio_tasks_delete_own" on public."tasks" for delete to authenticated using ((select auth.uid()) = "user_id");
