import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import { timeline } from "@/config/site-content";

export default function TimelinePage() {
  return (
    <div>
      <PageHeader title="Programa del día" />
      <div className="mx-auto max-w-xl px-4 pb-16 sm:px-6">
        <FadeIn>
          <ol className="relative border-s border-cream-dark ps-10">
            {timeline.map((item) => (
              <li key={item.event} className="mb-8 last:mb-0">
                <span
                  aria-hidden
                  className="absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-cream-dark text-base"
                >
                  {item.icon}
                </span>
                <p className="font-serif text-lg text-terracotta">{item.time}</p>
                <p className="text-ink-soft">{item.event}</p>
              </li>
            ))}
          </ol>
        </FadeIn>
      </div>
    </div>
  );
}
