import PageHeader from "@/components/PageHeader";
import { dressCode } from "@/config/site-content";

export default function VestimentaPage() {
  return (
    <div>
      <PageHeader title={dressCode.title} />
      <div className="mx-auto max-w-2xl px-4 pb-16 text-center sm:px-6">
        <p className="text-ink-soft">{dressCode.description}</p>
      </div>
    </div>
  );
}
