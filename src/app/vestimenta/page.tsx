import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import { dressCode } from "@/config/site-content";

function DressCodeCard({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-cream-dark p-6">
      <h2 className="mb-4 font-serif text-2xl text-terracotta">{label}</h2>
      <ul className="space-y-3 text-left text-ink-soft">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-terracotta">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function VestimentaPage() {
  return (
    <div>
      <PageHeader title={dressCode.title} subtitle={dressCode.intro} />
      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <FadeIn className="grid gap-6 sm:grid-cols-2">
          <DressCodeCard label={dressCode.women.label} items={dressCode.women.items} />
          <DressCodeCard label={dressCode.men.label} items={dressCode.men.items} />
        </FadeIn>
      </div>
    </div>
  );
}
