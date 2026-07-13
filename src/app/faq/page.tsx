import PageHeader from "@/components/PageHeader";
import FaqAccordion from "@/components/FaqAccordion";
import { faq } from "@/config/site-content";

export default function FaqPage() {
  return (
    <div>
      <PageHeader title="Preguntas frecuentes" />
      <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6">
        <FaqAccordion items={faq} />
      </div>
    </div>
  );
}
