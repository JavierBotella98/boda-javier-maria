import { Suspense } from "react";
import AccederForm from "@/components/AccederForm";
import { couple } from "@/config/site-content";
import SanJuanPattern from "@/components/SanJuanPattern";

export default function AccederPage() {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4">
      <SanJuanPattern opacity={0.16} />
      <div className="relative z-10 w-full max-w-sm rounded-lg border border-cream-dark bg-cream p-8 text-center shadow-sm">
        <p className="text-sm uppercase tracking-[0.2em] text-ink-soft">
          Boda de
        </p>
        <h1 className="mt-1 font-serif text-3xl text-ink">{couple.displayNames}</h1>
        <p className="mt-4 text-sm text-ink-soft">
          Introduce la contraseña que te hemos compartido para entrar.
        </p>
        <Suspense>
          <AccederForm />
        </Suspense>
      </div>
    </div>
  );
}
