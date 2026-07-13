import PageHeader from "@/components/PageHeader";
import RsvpForm from "@/components/RsvpForm";
import FadeIn from "@/components/FadeIn";

export default function RsvpPage() {
  return (
    <div>
      <PageHeader
        title="Confirma tu asistencia"
        subtitle="Rellena el formulario y cuéntanos con quién vienes"
      />
      <FadeIn className="mx-auto max-w-2xl px-4 pb-20 sm:px-6">
        <RsvpForm />
      </FadeIn>
    </div>
  );
}
