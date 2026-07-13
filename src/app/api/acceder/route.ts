import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { SITE_ACCESS_COOKIE, SITE_ACCESS_MAX_AGE_SECONDS } from "@/lib/site-access";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";

  const sitePassword = process.env.SITE_PASSWORD;
  if (!sitePassword) {
    return Response.json(
      { error: "La contraseña del sitio no está configurada todavía." },
      { status: 500 }
    );
  }

  if (password !== sitePassword) {
    return Response.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }

  const token = createHash("sha256").update(sitePassword).digest("hex");
  const cookieStore = await cookies();
  cookieStore.set(SITE_ACCESS_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SITE_ACCESS_MAX_AGE_SECONDS,
  });

  return Response.json({ ok: true });
}
