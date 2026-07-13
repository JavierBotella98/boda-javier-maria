import AdminLoginForm from "@/components/AdminLoginForm";

export const metadata = { title: "Acceso administración" };

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-lg border border-cream-dark bg-cream p-8 text-center shadow-sm">
        <p className="text-sm uppercase tracking-[0.2em] text-ink-soft">
          Panel de
        </p>
        <h1 className="mt-1 font-serif text-3xl text-ink">Administración</h1>
        <AdminLoginForm />
      </div>
    </div>
  );
}
