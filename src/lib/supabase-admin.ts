import { createClient } from "@supabase/supabase-js";

// Cliente de Supabase para uso exclusivo en el servidor (API routes / Server
// Actions). Usa la service role key, que nunca debe exponerse al navegador.
export function getSupabaseAdminClient() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
