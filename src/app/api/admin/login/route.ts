import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
} from "@/lib/admin-access";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const username = typeof body?.username === "string" ? body.username : "";
  const password = typeof body?.password === "string" ? body.password : "";

  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    return Response.json(
      { error: "El acceso de administración todavía no está configurado." },
      { status: 500 }
    );
  }

  if (username !== expectedUsername || password !== expectedPassword) {
    return Response.json({ error: "Usuario o contraseña incorrectos" }, { status: 401 });
  }

  const token = createHash("sha256")
    .update(`${expectedUsername}:${expectedPassword}`)
    .digest("hex");

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  });

  return Response.json({ ok: true });
}
