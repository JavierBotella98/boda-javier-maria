"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { accommodation, buses, rsvpForm } from "@/config/site-content";

type Companion = {
  name: string;
  menuType: "normal" | "infantil";
  allergies: string;
};

const emptyCompanion = (): Companion => ({
  name: "",
  menuType: "normal",
  allergies: "",
});

export default function RsvpForm() {
  const [guestName, setGuestName] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestMenuType, setGuestMenuType] = useState<"normal" | "infantil">("normal");
  const [guestAllergies, setGuestAllergies] = useState("");
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [busOutbound, setBusOutbound] = useState(false);
  const [busReturn, setBusReturn] = useState(false);
  const [busReturnTripId, setBusReturnTripId] = useState(buses.returnTrips[0]?.id ?? "");
  const [needsHotel, setNeedsHotel] = useState(false);
  const [hotelGuestsCount, setHotelGuestsCount] = useState(1);
  const [specialNeeds, setSpecialNeeds] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function adjustCompanionCount(delta: number) {
    setCompanions((prev) => {
      const next = Math.max(0, Math.min(15, prev.length + delta));
      const copy = [...prev];
      while (copy.length < next) copy.push(emptyCompanion());
      copy.length = next;
      return copy;
    });
  }

  function updateCompanion(index: number, patch: Partial<Companion>) {
    setCompanions((prev) =>
      prev.map((companion, i) => (i === index ? { ...companion, ...patch } : companion))
    );
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (attending === null) {
      setErrorMessage("Indica si vas a asistir o no.");
      setStatus("error");
      return;
    }
    if (!privacyConsent) {
      setErrorMessage("Debes aceptar el aviso de privacidad.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName,
          attending,
          guestMenuType: attending ? guestMenuType : undefined,
          guestAllergies: attending ? guestAllergies : "",
          companions: attending ? companions : [],
          busOutbound: attending ? busOutbound : false,
          busReturn: attending ? busReturn : false,
          busReturnTripId: attending && busReturn ? busReturnTripId : undefined,
          needsHotel: attending ? needsHotel : false,
          hotelGuestsCount: attending && needsHotel ? hotelGuestsCount : 0,
          specialNeeds: attending ? specialNeeds : "",
          privacyConsent,
          website,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "No se ha podido enviar el formulario");
      }

      setStatus("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Error inesperado");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-terracotta/30 bg-terracotta-soft/20 p-8 text-center">
        <p className="font-serif text-2xl text-ink">
          {rsvpForm.confirmationTitle(guestName || "")}
        </p>
        <p className="mt-2 text-ink-soft">{rsvpForm.confirmationMessage}</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-terracotta px-6 py-2 text-sm text-cream transition hover:bg-terracotta/90"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Honeypot anti-spam, oculto para personas */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="guestName" className="block text-sm text-ink">
          Nombre y apellidos *
        </label>
        <input
          id="guestName"
          required
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          className="mt-1 w-full rounded-md border border-cream-dark bg-white px-3 py-2 text-ink outline-none focus:border-terracotta"
        />
      </div>

      <fieldset>
        <legend className="text-sm text-ink">¿Asistirás? *</legend>
        <div className="mt-2 flex gap-4">
          {[
            { label: "Sí, asistiré", value: true },
            { label: "No podré asistir", value: false },
          ].map((option) => (
            <label key={option.label} className="flex items-center gap-2 text-ink-soft">
              <input
                type="radio"
                name="attending"
                checked={attending === option.value}
                onChange={() => setAttending(option.value)}
                required
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      {attending && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="guestMenuType" className="block text-sm text-ink">
                Tu menú
              </label>
              <select
                id="guestMenuType"
                value={guestMenuType}
                onChange={(e) => setGuestMenuType(e.target.value as "normal" | "infantil")}
                className="mt-1 w-full rounded-md border border-cream-dark bg-white px-3 py-2 text-ink"
              >
                <option value="normal">Menú normal</option>
                <option value="infantil">Menú infantil</option>
              </select>
            </div>
            <div>
              <label htmlFor="guestAllergies" className="block text-sm text-ink">
                Tus alergias / intolerancias
              </label>
              <input
                id="guestAllergies"
                value={guestAllergies}
                onChange={(e) => setGuestAllergies(e.target.value)}
                className="mt-1 w-full rounded-md border border-cream-dark bg-white px-3 py-2 text-ink"
              />
              <p className="mt-1 text-xs text-ink-soft">
                Déjalo en blanco si no tienes ninguna.
              </p>
            </div>
          </div>

          <div>
            <span className="block text-sm text-ink">Número de acompañantes</span>
            <div className="mt-1 flex items-center gap-4">
              <button
                type="button"
                onClick={() => adjustCompanionCount(-1)}
                disabled={companions.length <= 0}
                aria-label="Quitar acompañante"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-terracotta text-lg text-terracotta transition hover:bg-terracotta hover:text-cream disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-terracotta"
              >
                −
              </button>
              <span className="w-6 text-center font-serif text-xl text-ink">
                {companions.length}
              </span>
              <button
                type="button"
                onClick={() => adjustCompanionCount(1)}
                disabled={companions.length >= 15}
                aria-label="Añadir acompañante"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-terracotta text-lg text-terracotta transition hover:bg-terracotta hover:text-cream disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-terracotta"
              >
                +
              </button>
            </div>

            {companions.length > 0 && (
              <div className="mt-4 space-y-4">
                {companions.map((companion, index) => (
                  <div
                    key={index}
                    className="grid gap-3 rounded-lg border border-cream-dark p-4 sm:grid-cols-3"
                  >
                    <div>
                      <label className="block text-xs text-ink-soft">
                        Nombre del acompañante {index + 1}
                      </label>
                      <input
                        required
                        value={companion.name}
                        onChange={(e) => updateCompanion(index, { name: e.target.value })}
                        className="mt-1 w-full rounded-md border border-cream-dark bg-white px-3 py-2 text-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-ink-soft">Menú</label>
                      <select
                        value={companion.menuType}
                        onChange={(e) =>
                          updateCompanion(index, {
                            menuType: e.target.value as "normal" | "infantil",
                          })
                        }
                        className="mt-1 w-full rounded-md border border-cream-dark bg-white px-3 py-2 text-ink"
                      >
                        <option value="normal">Normal</option>
                        <option value="infantil">Infantil</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-ink-soft">
                        Alergias / intolerancias
                      </label>
                      <input
                        value={companion.allergies}
                        onChange={(e) =>
                          updateCompanion(index, { allergies: e.target.value })
                        }
                        placeholder="En blanco si no tiene"
                        className="mt-1 w-full rounded-md border border-cream-dark bg-white px-3 py-2 text-ink"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-ink-soft">
              <input
                type="checkbox"
                checked={busOutbound}
                onChange={(e) => setBusOutbound(e.target.checked)}
              />
              Usaré el autobús de ida (iglesia → Hacienda)
            </label>

            <label className="flex items-center gap-2 text-ink-soft">
              <input
                type="checkbox"
                checked={busReturn}
                onChange={(e) => setBusReturn(e.target.checked)}
              />
              Usaré el autobús de vuelta (Hacienda → {buses.returnDestination})
            </label>

            {busReturn && (
              <div className="ml-6 flex flex-col gap-2 sm:flex-row sm:gap-4">
                {buses.returnTrips.map((trip) => (
                  <label key={trip.id} className="flex items-center gap-2 text-sm text-ink-soft">
                    <input
                      type="radio"
                      name="busReturnTripId"
                      checked={busReturnTripId === trip.id}
                      onChange={() => setBusReturnTripId(trip.id)}
                    />
                    {trip.label} ({trip.time})
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-ink-soft">
              <input
                type="checkbox"
                checked={needsHotel}
                onChange={(e) => setNeedsHotel(e.target.checked)}
              />
              Necesitaré habitación de hotel
            </label>

            {needsHotel && (
              <div className="ml-6">
                <span className="block text-sm text-ink">¿Para cuántas personas?</span>
                <div className="mt-1 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setHotelGuestsCount((n) => Math.max(1, n - 1))}
                    disabled={hotelGuestsCount <= 1}
                    aria-label="Quitar persona"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-terracotta text-lg text-terracotta transition hover:bg-terracotta hover:text-cream disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-terracotta"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-serif text-xl text-ink">
                    {hotelGuestsCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setHotelGuestsCount((n) => Math.min(10, n + 1))}
                    disabled={hotelGuestsCount >= 10}
                    aria-label="Añadir persona"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-terracotta text-lg text-terracotta transition hover:bg-terracotta hover:text-cream disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-terracotta"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <p className="text-xs italic text-ink-soft">{accommodation.rsvpDisclaimer}</p>
          </div>

          <div>
            <label htmlFor="specialNeeds" className="block text-sm text-ink">
              ¿Alguna necesidad especial? (movilidad reducida, silla de bebé...)
            </label>
            <textarea
              id="specialNeeds"
              value={specialNeeds}
              onChange={(e) => setSpecialNeeds(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-md border border-cream-dark bg-white px-3 py-2 text-ink"
            />
            <p className="mt-1 text-xs text-ink-soft">
              Déjalo en blanco si no tienes ninguna.
            </p>
          </div>
        </>
      )}

      <div className="rounded-md border border-cream-dark bg-cream-dark/30 p-4">
        <label className="flex items-start gap-2 text-sm text-ink-soft">
          <input
            type="checkbox"
            checked={privacyConsent}
            onChange={(e) => setPrivacyConsent(e.target.checked)}
            required
            className="mt-1"
          />
          <span>
            He leído y acepto el uso de mis datos según se describe a
            continuación: {rsvpForm.privacyNotice}
          </span>
        </label>
      </div>

      {status === "error" && (
        <p className="text-sm text-terracotta">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-terracotta px-6 py-3 text-cream transition hover:bg-terracotta/90 disabled:opacity-60"
      >
        {status === "submitting" ? "Enviando..." : "Enviar confirmación"}
      </button>
    </form>
  );
}
