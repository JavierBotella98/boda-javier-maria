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
          <p className="mt-1 text-sm text-ink-soft">{buses.returnIntro}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {buses.returnTrips.map((trip) => (
              <div key={trip.id} className="rounded-lg border border-cream-dark p-5 text-center">
                <p className="text-xs uppercase tracking-wide text-ink-soft">Sobre las</p>
                <p className="font-serif text-2xl text-terracotta">{trip.time}</p>
                <p className="mt-1 text-sm text-ink">{trip.label}</p>
                {trip.description && (
                  <p className="mt-1 text-xs text-ink-soft">{trip.description}</p>
                )}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs italic text-ink-soft">
            {buses.returnTimesDisclaimer}
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
