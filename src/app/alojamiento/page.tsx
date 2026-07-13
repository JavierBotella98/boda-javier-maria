import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import { hotels } from "@/config/site-content";

export default function AlojamientoPage() {
  return (
    <div>
      <PageHeader
        title="Alojamiento"
        subtitle="Algunas opciones de hoteles cerca de la Hacienda y de la iglesia"
      />
      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <FadeIn className="grid gap-6 sm:grid-cols-2">
          {hotels.map((hotel) => (
            <a
              key={hotel.name}
              href={hotel.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-cream-dark p-6 transition hover:border-terracotta"
            >
              <h2 className="font-serif text-xl text-ink">{hotel.name}</h2>
              <p className="mt-2 text-sm text-ink-soft">{hotel.description}</p>
            </a>
          ))}
        </FadeIn>
      </div>
    </div>
  );
}
