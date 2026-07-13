import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import { ourStory } from "@/config/site-content";

function StoryPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-lg border border-cream-dark shadow-sm">
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}

export default function NuestraHistoriaPage() {
  const [firstParagraph, secondParagraph] = ourStory.paragraphs;

  return (
    <div>
      <PageHeader title={ourStory.title} />
      <FadeIn className="mx-auto max-w-xl space-y-6 px-4 pb-16 sm:px-6">
        <p className="text-ink-soft leading-relaxed text-justify">{firstParagraph}</p>
        <StoryPhoto
          src="/historia-roma.jpg"
          alt="Javier y María en el Vaticano, durante el viaje a Roma"
        />
        <p className="text-ink-soft leading-relaxed text-justify">{secondParagraph}</p>
        <StoryPhoto
          src="/historia-anillo.jpg"
          alt="María enseñando el anillo tras la pedida en Florencia"
        />
      </FadeIn>
    </div>
  );
}
