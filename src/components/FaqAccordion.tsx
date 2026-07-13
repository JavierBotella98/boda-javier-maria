"use client";

import { useState } from "react";

type FaqItem = { question: string; answer: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-cream-dark">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-lg text-ink">{item.question}</span>
              <span className="ml-4 text-terracotta">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <p className="pb-4 text-ink-soft">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
