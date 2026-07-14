-- Migración: añade las columnas de necesidad de hotel a la tabla ya existente.
-- Ejecutar en Supabase: Project > SQL Editor > pegar y ejecutar.

alter table guests_responses
  add column if not exists needs_hotel boolean not null default false,
  add column if not exists hotel_guests_count integer not null default 0;
