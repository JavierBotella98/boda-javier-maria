"use client";

import { useState } from "react";

export default function CopyIbanButton({ iban }: { iban: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(iban.replace(/\s+/g, ""));
    } catch {
      // Algunos navegadores requieren interacción directa; fallback simple.
      const textarea = document.createElement("textarea");
      textarea.value = iban.replace(/\s+/g, "");
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="mt-3 rounded-full border border-terracotta px-4 py-1.5 text-sm text-terracotta transition hover:bg-terracotta hover:text-cream"
    >
      {copied ? "¡Copiado!" : "Copiar número de cuenta"}
    </button>
  );
}
