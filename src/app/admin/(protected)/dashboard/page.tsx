import { getGuestResponses, computeStats } from "@/lib/admin-data";
import { buses } from "@/config/site-content";

export const dynamic = "force-dynamic";

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border border-cream-dark p-4 text-center">
      <p className="font-serif text-2xl text-terracotta">{value}</p>
      <p className="text-xs uppercase tracking-wide text-ink-soft">{label}</p>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const responses = await getGuestResponses();
  const stats = computeStats(responses);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-3xl text-ink">Invitados</h1>
        <a
          href="/api/admin/export"
          className="rounded-full bg-terracotta px-5 py-2 text-sm text-cream transition hover:bg-terracotta/90"
        >
          Exportar a Excel/CSV
        </a>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Respuestas" value={stats.totalResponses} />
        <StatCard label="Asisten" value={stats.confirmedResponses} />
        <StatCard label="No asisten" value={stats.declinedResponses} />
        <StatCard label="Personas totales" value={stats.totalPeople} />
        <StatCard label="Menú normal" value={stats.normalMenus} />
        <StatCard label="Menú infantil" value={stats.childMenus} />
        <StatCard label="Con alergias" value={stats.withAllergies} />
        <StatCard label="Bus ida" value={stats.busOutboundCount} />
        <StatCard label="Piden hotel" value={stats.hotelRequests} />
        <StatCard label="Personas con hotel" value={stats.hotelGuestsTotal} />
      </div>

      <div className="mb-10">
        <h2 className="mb-3 font-serif text-xl text-ink">Autobús de vuelta por franja</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {buses.returnTrips.map((trip) => (
            <StatCard
              key={trip.id}
              label={`${trip.label} (${trip.time})`}
              value={stats.busReturnByTrip[trip.id] ?? 0}
            />
          ))}
        </div>
      </div>

      <h2 className="mb-3 font-serif text-xl text-ink">Listado de respuestas</h2>
      <div className="overflow-x-auto rounded-lg border border-cream-dark">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="bg-cream-dark/40 text-ink-soft">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Asiste</th>
              <th className="p-3">Menú</th>
              <th className="p-3">Alergias</th>
              <th className="p-3">Acompañantes</th>
              <th className="p-3">Bus ida</th>
              <th className="p-3">Bus vuelta</th>
              <th className="p-3">Hotel</th>
              <th className="p-3">Necesidades especiales</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-dark">
            {responses.length === 0 && (
              <tr>
                <td colSpan={9} className="p-6 text-center text-ink-soft">
                  Todavía no hay confirmaciones.
                </td>
              </tr>
            )}
            {responses.map((response) => (
              <tr key={response.id}>
                <td className="p-3 font-medium text-ink">{response.guest_name}</td>
                <td className="p-3">{response.attending ? "Sí" : "No"}</td>
                <td className="p-3">{response.guest_menu_type ?? "-"}</td>
                <td className="p-3">{response.guest_allergies || "-"}</td>
                <td className="p-3">
                  {response.companions.length === 0
                    ? "-"
                    : response.companions
                        .map((c) => `${c.name} (${c.menu_type}${c.allergies ? `, ${c.allergies}` : ""})`)
                        .join("; ")}
                </td>
                <td className="p-3">{response.bus_outbound ? "Sí" : "No"}</td>
                <td className="p-3">
                  {response.bus_return ? response.bus_return_trip_id ?? "Sí" : "No"}
                </td>
                <td className="p-3">
                  {response.needs_hotel ? `Sí (${response.hotel_guests_count})` : "No"}
                </td>
                <td className="p-3">{response.special_needs || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
