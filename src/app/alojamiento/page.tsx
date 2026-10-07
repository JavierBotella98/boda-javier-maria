import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import { accommodation, hotels } from "@/config/site-content";

type Hotel = (typeof hotels)[number];

function HotelCard({ hotel }: { hotel: Hotel }) {
  const embedUrl = `https://www.google.com/maps?q=${hotel.coords.lat},${hotel.coords.lng}&z=16&output=embed`;

  return (
    <div className="overflow-hidden rounded-lg border border-cream-dark">
      <iframe
        src={embedUrl}
        width="100%"
        height="200"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Mapa: ${hotel.name}`}
      />
      <div className="p-5">
        <h3 className="font-serif text-xl text-ink">{hotel.name}</h3>
        <p
          className="mt-1 text-terracotta"
          role="img"
          aria-label={`${hotel.stars} estrellas`}
        >
          {"★".repeat(hotel.stars)}
        </p>
        <p className="mt-1 text-sm text-ink-soft">
          🚶 {hotel.walkingMinutes} min andando hasta la iglesia
        </p>
        <a
          href={hotel.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block rounded-full border border-terracotta px-4 py-1.5 text-sm text-terracotta transition hover:bg-terracotta hover:text-cream"
        >
          Ver en Google Maps
        </a>
      </div>
    </div>
  );
}

export default function AlojamientoPage() {
  return (
    <div>
      <PageHeader title="Alojamiento" subtitle={accommodation.subtitle} />
      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <FadeIn className="text-center">
          <p className="text-ink-soft">{accommodation.intro}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {accommodation.searchLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-terracotta px-6 py-2 text-sm text-cream transition hover:bg-terracotta/90"
              >
                {link.label}
              </a>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-14">
          <h2 className="text-center font-serif text-2xl text-ink">
            {accommodation.hotelsTitle}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-ink-soft">
            {accommodation.hotelsIntro}
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.name} hotel={hotel} />
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
