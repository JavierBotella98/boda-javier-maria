import PageHeader from "@/components/PageHeader";
import { giftRegistry } from "@/config/site-content";

export default function ListaDeBodasPage() {
  return (
    <div>
      <PageHeader title={giftRegistry.title} />
      <div className="mx-auto max-w-xl px-4 pb-16 text-center sm:px-6">
        <p className="text-ink-soft">{giftRegistry.message}</p>
        <div className="mt-6 rounded-lg border border-cream-dark bg-cream-dark/40 p-6">
          <p className="font-serif text-xl tracking-wide text-ink">
            {giftRegistry.iban}
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            {giftRegistry.accountHolder}
          </p>
        </div>
      </div>
    </div>
  );
}
