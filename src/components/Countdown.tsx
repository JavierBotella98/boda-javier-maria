"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/config/site-content";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function getRemaining() {
  const target = new Date(wedding.dateTimeIso).getTime();
  const diff = target - Date.now();

  if (diff <= 0) {
    return { arrived: true as const, sameDay: diff > -ONE_DAY_MS };
  }

  return {
    arrived: false as const,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
  };
}

export default function Countdown() {
  // Valor inicial calculado en el primer render (servidor y cliente). El
  // servidor y el cliente pueden diferir en unos segundos/minutos, por lo
  // que se usa suppressHydrationWarning en los valores mostrados.
  const [remaining, setRemaining] = useState(() => getRemaining());

  useEffect(() => {
    const interval = setInterval(() => setRemaining(getRemaining()), 60_000);

    // Los navegadores móviles pausan los temporizadores en segundo plano
    // para ahorrar batería. Al volver a la pestaña, recalculamos al
    // instante en vez de esperar a que el intervalo se retome por su cuenta.
    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        setRemaining(getRemaining());
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleVisibilityChange);
    };
  }, []);

  if (remaining.arrived) {
    return (
      <p className="font-serif text-2xl text-terracotta sm:text-3xl" suppressHydrationWarning>
        {remaining.sameDay ? "¡Hoy es el gran día! 🎉" : "¡Ya nos hemos casado! 💍"}
      </p>
    );
  }

  const items = [
    { value: remaining.days, label: "días" },
    { value: remaining.hours, label: "horas" },
    { value: remaining.minutes, label: "min" },
  ];

  return (
    <div className="flex gap-6 sm:gap-10">
      {items.map((item) => (
        <div key={item.label} className="text-center">
          <span
            className="block font-serif text-3xl sm:text-4xl text-terracotta"
            suppressHydrationWarning
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
