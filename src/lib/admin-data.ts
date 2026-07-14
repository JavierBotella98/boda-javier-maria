import { getSupabaseAdminClient } from "@/lib/supabase-admin";
import { buses } from "@/config/site-content";

export type Companion = {
  id: string;
  name: string;
  menu_type: "normal" | "infantil";
  allergies: string;
};

export type GuestResponse = {
  id: string;
  guest_name: string;
  attending: boolean;
  guest_menu_type: "normal" | "infantil" | null;
  guest_allergies: string;
  bus_outbound: boolean;
  bus_return: boolean;
  bus_return_trip_id: string | null;
  needs_hotel: boolean;
  hotel_guests_count: number;
  special_needs: string;
  created_at: string;
  companions: Companion[];
};

export async function getGuestResponses(): Promise<GuestResponse[]> {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("guests_responses")
    .select("*, companions(*)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error al leer las confirmaciones", error);
    return [];
  }

  return data as GuestResponse[];
}

export function computeStats(responses: GuestResponse[]) {
  const attending = responses.filter((r) => r.attending);
  const notAttending = responses.filter((r) => !r.attending);

  let totalPeople = 0;
  let normalMenus = 0;
  let childMenus = 0;
  let withAllergies = 0;
  let busOutboundCount = 0;
  let hotelRequests = 0;
  let hotelGuestsTotal = 0;
  const busReturnByTrip: Record<string, number> = {};
  for (const trip of buses.returnTrips) busReturnByTrip[trip.id] = 0;

  for (const response of attending) {
    totalPeople += 1 + response.companions.length;

    if (response.guest_menu_type === "infantil") childMenus += 1;
    else normalMenus += 1;
    if (response.guest_allergies?.trim()) withAllergies += 1;

    for (const companion of response.companions) {
      if (companion.menu_type === "infantil") childMenus += 1;
      else normalMenus += 1;
      if (companion.allergies?.trim()) withAllergies += 1;
    }

    if (response.bus_outbound) busOutboundCount += 1;
    if (response.bus_return && response.bus_return_trip_id) {
      busReturnByTrip[response.bus_return_trip_id] =
        (busReturnByTrip[response.bus_return_trip_id] ?? 0) + 1;
    }
    if (response.needs_hotel) {
      hotelRequests += 1;
      hotelGuestsTotal += response.hotel_guests_count;
    }
  }

  return {
    totalResponses: responses.length,
    confirmedResponses: attending.length,
    declinedResponses: notAttending.length,
    totalPeople,
    normalMenus,
    childMenus,
    withAllergies,
    busOutboundCount,
    busReturnByTrip,
    hotelRequests,
    hotelGuestsTotal,
  };
}
