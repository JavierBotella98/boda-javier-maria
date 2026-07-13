-- Esquema de base de datos para la web de la boda.
-- Ejecutar en Supabase: Project > SQL Editor > pegar y ejecutar.

create extension if not exists "pgcrypto";

create table if not exists guests_responses (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  attending boolean not null,
  guest_menu_type text check (guest_menu_type in ('normal', 'infantil')),
  guest_allergies text default '',
  bus_outbound boolean not null default false,
  bus_return boolean not null default false,
  bus_return_trip_id text,
  special_needs text default '',
  privacy_consent boolean not null,
  created_at timestamptz not null default now()
);

create table if not exists companions (
  id uuid primary key default gen_random_uuid(),
  response_id uuid not null references guests_responses(id) on delete cascade,
  name text not null,
  menu_type text not null check (menu_type in ('normal', 'infantil')),
  allergies text default '',
  created_at timestamptz not null default now()
);

create table if not exists photos (
  id uuid primary key default gen_random_uuid(),
  cloudinary_public_id text not null,
  url text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Row Level Security: estas tablas solo se leen/escriben desde el servidor
-- (API routes) usando la service role key, nunca desde el navegador.
alter table guests_responses enable row level security;
alter table companions enable row level security;
alter table photos enable row level security;
