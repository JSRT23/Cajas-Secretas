-- Ejecuta esto en el SQL Editor de tu proyecto de Supabase.

create extension if not exists "pgcrypto";

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  room_code text unique not null,
  theme text not null check (theme in ('san-valentin', 'navidad', 'halloween')),
  created_at timestamptz not null default now()
);

create table if not exists participants (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references sessions(id) on delete cascade,
  name text not null,
  order_index int not null,
  assigned_to uuid references participants(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists participants_session_id_idx on participants(session_id);
create index if not exists sessions_room_code_idx on sessions(room_code);

-- Row Level Security: abrimos lectura/escritura publica porque el "room_code"
-- actua como secreto compartido. Para un uso mas estricto, agrega auth y
-- restringe estas politicas.
alter table sessions enable row level security;
alter table participants enable row level security;

create policy "sessions_public_all" on sessions
  for all using (true) with check (true);

create policy "participants_public_all" on participants
  for all using (true) with check (true);
