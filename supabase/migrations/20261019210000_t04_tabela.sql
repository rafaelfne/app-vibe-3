create table public.t04_demo (id int primary key, nota text);
alter table public.t04_demo enable row level security;
create policy t04_demo_logado on public.t04_demo for select using (auth.uid() is not null);
insert into public.t04_demo values (1, 'antes da coluna sair');
