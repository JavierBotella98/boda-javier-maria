import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/require-admin";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <nav className="flex gap-4">
          <Link href="/admin/dashboard" className="font-serif text-lg text-ink hover:text-terracotta">
            Invitados
          </Link>
          <Link href="/admin/fotos" className="font-serif text-lg text-ink hover:text-terracotta">
            Fotos
          </Link>
        </nav>
        <AdminLogoutButton />
      </div>
      {children}
    </div>
  );
}
