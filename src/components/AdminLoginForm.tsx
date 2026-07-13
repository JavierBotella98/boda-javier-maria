"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "No se ha podido iniciar sesión");
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <input
        type="text"
        autoFocus
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Usuario"
        className="w-full rounded-md border border-cream-dark bg-white px-3 py-2 text-center text-ink outline-none focus:border-terracotta"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        className="w-full rounded-md border border-cream-dark bg-white px-3 py-2 text-center text-ink outline-none focus:border-terracotta"
      />
      {error && <p className="text-sm text-terracotta">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-terracotta px-6 py-2 text-cream transition hover:bg-terracotta/90 disabled:opacity-60"
      >
        {loading ? "Comprobando..." : "Entrar"}
      </button>
    </form>
  );
}
