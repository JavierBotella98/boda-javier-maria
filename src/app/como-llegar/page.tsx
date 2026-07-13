import PageHeader from "@/components/PageHeader";
import { ceremony, venue } from "@/config/site-content";

function LocationBlock({
  title,
  address,
  mapsEmbedUrl,
}: {
  title: string;
  address: string;
  mapsEmbedUrl: string;
}) {
  return (
    <div className="mb-12">
      <h2 className="font-serif text-2xl text-ink">{title}</h2>
      <p className="mt-1 text-ink-soft">{address}</p>
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
        <LocationBlock
          title={ceremony.name}
          address={ceremony.address}
          mapsEmbedUrl={ceremony.mapsEmbedUrl}
        />
        <LocationBlock
          title={venue.name}
          address={venue.address}
          mapsEmbedUrl={venue.mapsEmbedUrl}
        />
      </div>
    </div>
  );
}
