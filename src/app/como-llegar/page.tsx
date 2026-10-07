import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import { ceremony, churchParking, venue } from "@/config/site-content";

function ParkingInfo() {
  return (
    <div className="mt-6 rounded-lg border border-cream-dark bg-cream-dark/30 p-5">
      <h3 className="font-serif text-xl text-ink">🚗 {churchParking.title}</h3>
      <p className="mt-2 text-sm text-ink-soft">{churchParking.intro}</p>
      <ul className="mt-3 space-y-2">
        {churchParking.options.map((parking) => (
          <li
            key={parking.mapsUrl}
            className="flex flex-wrap items-center justify-between gap-2 text-sm"
          >
            <span className="text-ink">{parking.name}</span>
            <a
              href={parking.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-terracotta px-3 py-1 text-xs text-terracotta transition hover:bg-terracotta hover:text-cream"
            >
              Ver en Google Maps
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LocationBlock({
  title,
  address,
  mapsEmbedUrl,
  coords,
  note,
  children,
}: {
  title: string;
  address: string;
  mapsEmbedUrl: string;
  coords: { lat: number; lng: number };
  note?: string;
  children?: React.ReactNode;
}) {
  const googleDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}`;
  const appleMapsUrl = `https://maps.apple.com/?daddr=${coords.lat},${coords.lng}`;

  return (
    <div className="mb-12">
      <h2 className="font-serif text-2xl text-ink">{title}</h2>
      <p className="mt-1 text-ink-soft">{address}</p>
      {note && <p className="mt-1 text-sm text-ink-soft">{note}</p>}
      <div className="mt-4 overflow-hidden rounded-lg border border-cream-dark">
        <iframe
          src={mapsEmbedUrl}
          width="100%"
          height="320"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Mapa: ${title}`}
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-3">
        <a
          href={googleDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-terracotta px-4 py-1.5 text-sm text-terracotta transition hover:bg-terracotta hover:text-cream"
        >
          Abrir en Google Maps
        </a>
        <a
          href={appleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-terracotta px-4 py-1.5 text-sm text-terracotta transition hover:bg-terracotta hover:text-cream"
        >
          Abrir en Apple Maps
        </a>
      </div>
      {children}
    </div>
  );
}

export default function ComoLlegarPage() {
  return (
    <div>
      <PageHeader
        title="Cómo llegar"
        subtitle="Ubicaciones de la ceremonia y la celebración"
      />
      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <FadeIn>
          <LocationBlock
            title={ceremony.name}
            address={ceremony.address}
            mapsEmbedUrl={ceremony.mapsEmbedUrl}
            coords={ceremony.coords}
          >
            <ParkingInfo />
          </LocationBlock>
        </FadeIn>
        <FadeIn>
          <LocationBlock
            title={venue.name}
            address={venue.address}
            mapsEmbedUrl={venue.mapsEmbedUrl}
            coords={venue.coords}
            note={venue.parkingNote}
          />
        </FadeIn>
      </div>
    </div>
  );
}
