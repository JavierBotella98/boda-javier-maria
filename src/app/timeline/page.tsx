import PageHeader from "@/components/PageHeader";
import { timeline } from "@/config/site-content";

export default function TimelinePage() {
  return (
    <div>
      <PageHeader title="Programa del día" />
      <div className="mx-auto max-w-xl px-4 pb-16 sm:px-6">
        <ol className="relative border-s border-cream-dark ps-6">
          {timeline.map((item) => (
            <li key={item.event} className="mb-8 last:mb-0">
              <span className="absolute -start-[7px] mt-1.5 h-3 w-3 rounded-full bg-terracotta" />
              <p className="font-serif text-lg text-terracotta">{item.time}</p>
              <p className="text-ink-soft">{item.event}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
