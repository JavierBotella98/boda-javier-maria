import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import { buses } from "@/config/site-content";

export default function TransportePage() {
  return (
    <div>
      <PageHeader
        title="Autobuses"
        subtitle="Podrás indicar si los usarás en el formulario de confirmación"
      />
      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <FadeIn className="mb-10 rounded-lg border border-cream-dark p-6">
          <h2 className="font-serif text-xl text-ink">{buses.outbound.label}</h2>
          <p className="mt-2 text-ink-soft">{buses.outbound.description}</p>
        </FadeIn>

        <FadeIn>
          <h2 className="font-serif text-xl text-ink">
            Vuelta a {buses.returnDestination}
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            Habrá 3 salidas durante la noche. Elige la que mejor te venga al
            confirmar tu asistencia.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {buses.returnTrips.map((trip) => (
              <div key={trip.id} className="rounded-lg border border-cream-dark p-5 text-center">
                <p className="font-serif text-lg text-terracotta">{trip.time}</p>
                <p className="mt-1 text-sm text-ink">{trip.label}</p>
                <p className="mt-1 text-xs text-ink-soft">{trip.description}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
