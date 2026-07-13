import Link from "next/link";
import SanJuanPattern from "@/components/SanJuanPattern";
import Countdown from "@/components/Countdown";
import AddToCalendarButton from "@/components/AddToCalendarButton";
import FadeIn from "@/components/FadeIn";
import { couple, wedding, ceremony } from "@/config/site-content";

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <SanJuanPattern opacity={0.18} />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center sm:py-32">
          <p className="text-sm uppercase tracking-[0.2em] text-ink-soft">
            Nos casamos
          </p>
          <h1 className="font-serif text-5xl leading-tight text-ink sm:text-6xl">
            {couple.groomFirstName} <span className="text-terracotta">&</span>{" "}
            {couple.brideFirstName}
          </h1>
          <p className="text-lg text-ink-soft">
            {wedding.dateLabel} · {wedding.timeLabel} · {ceremony.name}
          </p>

          <div className="mt-4">
            <Countdown />
          </div>

          <div className="mt-6 flex flex-col items-center gap-4">
            <Link
              href="/rsvp"
              className="rounded-full bg-terracotta px-8 py-3 text-cream transition hover:bg-terracotta/90"
            >
              Confirmar asistencia
            </Link>
            <AddToCalendarButton />
          </div>
        </div>
      </section>

      <FadeIn>
        <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <h2 className="font-serif text-2xl text-ink">
            Estamos deseando celebrarlo con vosotros
          </h2>
          <p className="mt-4 text-ink-soft">
            En esta web encontraréis toda la información sobre la ceremonia, la
            Hacienda, el alojamiento, el transporte y el formulario para confirmar
            vuestra asistencia. ¡Gracias por acompañarnos en este día tan
            especial!
          </p>
        </section>
      </FadeIn>
    </div>
  );
}
