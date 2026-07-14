import { isAdminAuthenticated } from "@/lib/require-admin";
import { getGuestResponses } from "@/lib/admin-data";

function csvEscape(value: string) {
  if (/[",\n;]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function toCsvRow(values: string[]) {
  return values.map(csvEscape).join(";");
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const responses = await getGuestResponses();

  const header = [
    "Nombre",
    "Asiste",
    "Menú",
    "Alergias",
    "Nº acompañantes",
    "Acompañantes",
    "Bus ida",
    "Bus vuelta",
    "Necesita hotel",
    "Personas hotel",
    "Necesidades especiales",
  ];

  const rows = responses.map((response) =>
    toCsvRow([
      response.guest_name,
      response.attending ? "Sí" : "No",
      response.guest_menu_type ?? "",
      response.guest_allergies ?? "",
      String(response.companions.length),
      response.companions
        .map((c) => `${c.name} (${c.menu_type}${c.allergies ? `, ${c.allergies}` : ""})`)
        .join(" | "),
      response.bus_outbound ? "Sí" : "No",
      response.bus_return ? response.bus_return_trip_id ?? "Sí" : "No",
      response.needs_hotel ? "Sí" : "No",
      response.needs_hotel ? String(response.hotel_guests_count) : "0",
      response.special_needs ?? "",
    ])
  );

  const csv = "﻿" + [toCsvRow(header), ...rows].join("\r\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="invitados-boda.csv"',
    },
  });
}
