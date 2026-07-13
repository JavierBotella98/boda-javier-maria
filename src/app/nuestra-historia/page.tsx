import PageHeader from "@/components/PageHeader";
import { ourStory } from "@/config/site-content";

export default function NuestraHistoriaPage() {
  return (
    <div>
      <PageHeader title={ourStory.title} />
      <div className="mx-auto max-w-xl space-y-4 px-4 pb-16 sm:px-6">
        {ourStory.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-ink-soft leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
