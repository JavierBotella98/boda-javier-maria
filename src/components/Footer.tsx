import { couple, wedding } from "@/config/site-content";
import SanJuanPattern from "./SanJuanPattern";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cream-dark">
      <SanJuanPattern opacity={0.14} />
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-10 text-center sm:px-6">
        <p className="font-serif text-xl text-ink">{couple.displayNames}</p>
        <p className="mt-1 text-sm text-ink-soft">{wedding.dateLabel}</p>
      </div>
    </footer>
  );
}
