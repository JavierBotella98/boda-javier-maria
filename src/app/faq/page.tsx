import PageHeader from "@/components/PageHeader";
import FaqAccordion from "@/components/FaqAccordion";
import FadeIn from "@/components/FadeIn";
import { faq } from "@/config/site-content";

export default function FaqPage() {
  return (
    <div>
      <PageHeader title="Preguntas frecuentes" />
      <FadeIn className="mx-auto max-w-2xl px-4 pb-16 sm:px-6">
        <FaqAccordion items={faq} />
      </FadeIn>
    </div>
  );
}
