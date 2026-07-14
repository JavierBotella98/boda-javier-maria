"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { couple } from "@/config/site-content";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/como-llegar", label: "Cómo llegar" },
  { href: "/alojamiento", label: "Alojamiento" },
  { href: "/transporte", label: "Autobuses" },
  { href: "/timeline", label: "Programa" },
  { href: "/vestimenta", label: "Vestimenta" },
  { href: "/lista-de-bodas", label: "Lista de bodas" },
  { href: "/nuestra-historia", label: "Nuestra historia" },
  { href: "/faq", label: "FAQ" },
  { href: "/galeria", label: "Fotos" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-cream-dark bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="font-serif text-lg text-ink">
          {couple.displayNames}
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden rounded-md border border-cream-dark p-2 text-ink transition-transform active:scale-90 active:bg-cream-dark"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          <span
            className={`block h-0.5 w-5 bg-ink transition-transform duration-200 mb-1 ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-ink transition-opacity duration-200 mb-1 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-ink transition-transform duration-200 ${
              open ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>

        <nav className="hidden sm:flex sm:items-center sm:gap-4 lg:gap-5">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`text-sm transition hover:text-terracotta ${
                  isActive ? "font-medium text-terracotta" : "text-ink-soft"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/rsvp"
            className="rounded-full bg-terracotta px-4 py-2 text-sm text-cream transition hover:bg-terracotta/90"
          >
            Confirmar asistencia
          </Link>
        </nav>
      </div>

      {open && (
        <nav className="sm:hidden border-t border-cream-dark bg-cream px-4 pb-4">
          <ul className="flex flex-col gap-3 pt-3">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`block ${
                      isActive ? "font-medium text-terracotta" : "text-ink-soft"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/rsvp"
                onClick={() => setOpen(false)}
                className="inline-block rounded-full bg-terracotta px-4 py-2 text-sm text-cream"
              >
                Confirmar asistencia
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
