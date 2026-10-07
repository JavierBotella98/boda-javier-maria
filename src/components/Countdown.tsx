"use client";

import { useSyncExternalStore } from "react";
import { wedding } from "@/config/site-content";

const ONE_MINUTE_MS = 60_000;
const ONE_DAY_MS = 24 * 60 * ONE_MINUTE_MS;
const TARGET_MS = new Date(wedding.dateTimeIso).getTime();

// La página se genera de forma estática en el despliegue, así que el HTML del
// servidor lleva la hora del build. Para que nunca se muestre un valor
// congelado, el servidor no pinta números (snapshot null) y el navegador los
// calcula con su propia hora justo tras hidratar, sin ningún desajuste que
// React tenga que "tolerar".
function subscribe(onChange: () => void) {
  // Se programa cada aviso justo en el siguiente cambio de minuto del reloj,
  // para que el contador nunca vaya por detrás.
  let timeout: ReturnType<typeof setTimeout>;
  function scheduleNext() {
    const msToNextMinute = ONE_MINUTE_MS - (Date.now() % ONE_MINUTE_MS);
    timeout = setTimeout(() => {
      onChange();
      scheduleNext();
    }, msToNextMinute + 50);
  }
  scheduleNext();

  // Los navegadores móviles pausan los temporizadores en segundo plano; al
  // volver a la pestaña se recalcula al instante.
  function handleVisible() {
    if (document.visibilityState === "visible") onChange();
  }
  document.addEventListener("visibilitychange", handleVisible);
  window.addEventListener("focus", handleVisible);

  return () => {
    clearTimeout(timeout);
    document.removeEventListener("visibilitychange", handleVisible);
    window.removeEventListener("focus", handleVisible);
  };
}

// Minuto actual como número (cambia una vez por minuto, comparable por valor).
// Se redondea hacia arriba para que, al restarlo de la fecha objetivo (que cae
// justo en un minuto exacto), los minutos mostrados sean los que de verdad
// faltan completos (p. ej. 7 min 37 s restantes se muestran como 7).
function getSnapshot() {
  return Math.ceil(Date.now() / ONE_MINUTE_MS);
}

function getServerSnapshot() {
  return null;
}

export default function Countdown() {
  const nowMinute = useSyncExternalStore<number | null>(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const diff = nowMinute === null ? null : TARGET_MS - nowMinute * ONE_MINUTE_MS;

  if (diff !== null && diff <= 0) {
    return (
      <p className="font-serif text-2xl text-terracotta sm:text-3xl">
        {diff > -ONE_DAY_MS ? "¡Hoy es el gran día! 🎉" : "¡Ya nos hemos casado! 💍"}
      </p>
    );
  }

  const items = [
    { value: diff === null ? 0 : Math.floor(diff / ONE_DAY_MS), label: "días" },
    { value: diff === null ? 0 : Math.floor((diff / (60 * ONE_MINUTE_MS)) % 24), label: "horas" },
    { value: diff === null ? 0 : Math.floor((diff / ONE_MINUTE_MS) % 60), label: "min" },
  ];

  return (
    <div className="flex gap-6 sm:gap-10">
      {items.map((item) => (
        <div key={item.label} className="text-center">
          <span
            className={`block font-serif text-3xl sm:text-4xl text-terracotta ${
              diff === null ? "invisible" : ""
            }`}
          >
            {item.value}
          </span>
          <span className="block text-xs uppercase tracking-wide text-ink-soft">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
