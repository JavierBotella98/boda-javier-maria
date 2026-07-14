import { rsvpSchema } from "@/lib/rsvp-schema";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";
import { notifyAdminsOfNewRsvp } from "@/lib/notify-admins";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  if (!json) {
    return Response.json({ error: "Cuerpo de la petición inválido" }, { status: 400 });
  }

  const parsed = rsvpSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json(
      { error: "Datos del formulario inválidos", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const rsvp = parsed.data;

  // Honeypot: un bot que rellene este campo recibe una respuesta de éxito
  // "falsa" sin que nada se guarde, para no delatar la protección.
  if (rsvp.website) {
    return Response.json({ ok: true });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return Response.json(
      {
        error:
          "La base de datos todavía no está configurada (faltan las variables de entorno de Supabase).",
      },
      { status: 503 }
    );
  }

  const { data: response, error: insertError } = await supabase
    .from("guests_responses")
    .insert({
      guest_name: rsvp.guestName,
      attending: rsvp.attending,
      guest_menu_type: rsvp.guestMenuType ?? null,
      guest_allergies: rsvp.guestAllergies,
      bus_outbound: rsvp.busOutbound,
      bus_return: rsvp.busReturn,
      bus_return_trip_id: rsvp.busReturnTripId ?? null,
      needs_hotel: rsvp.needsHotel,
      hotel_guests_count: rsvp.needsHotel ? rsvp.hotelGuestsCount : 0,
      special_needs: rsvp.specialNeeds,
      privacy_consent: rsvp.privacyConsent,
    })
    .select("id")
    .single();

  if (insertError || !response) {
    console.error("Error al guardar la confirmación", insertError);
    return Response.json(
      { error: "No se ha podido guardar tu confirmación. Inténtalo de nuevo." },
      { status: 500 }
    );
  }

  if (rsvp.companions.length > 0) {
    const { error: companionsError } = await supabase.from("companions").insert(
      rsvp.companions.map((companion) => ({
        response_id: response.id,
        name: companion.name,
        menu_type: companion.menuType,
        allergies: companion.allergies,
      }))
    );

    if (companionsError) {
      console.error("Error al guardar los acompañantes", companionsError);
    }
  }

  await notifyAdminsOfNewRsvp(rsvp);

  return Response.json({ ok: true });
}
