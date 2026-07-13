import PageHeader from "@/components/PageHeader";
import SanJuanPattern from "@/components/SanJuanPattern";
import { gallery } from "@/config/site-content";

export default function GaleriaPage() {
  // TODO (fase post-boda): sustituir por la galería real conectada a
  // Cloudinary, con listado de fotos y descarga individual.
  return (
    <div>
      <PageHeader title="Fotos de la boda" />
      <div className="relative mx-auto max-w-xl overflow-hidden rounded-lg px-4 py-16 text-center sm:px-6">
        <SanJuanPattern opacity={0.12} />
        <p className="relative z-10 text-ink-soft">
          {gallery.isPublished
            ? ""
            : gallery.comingSoonMessage}
        </p>
      </div>
    </div>
  );
}
