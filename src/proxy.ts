import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createHash } from "node:crypto";
import { SITE_ACCESS_COOKIE } from "@/lib/site-access";

function expectedToken(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

// Protege toda la web con una única contraseña compartida (ver PRD, sección
// de seguridad). El panel de administración (/admin) tiene su propio login
// independiente y no pasa por esta comprobación.
export function proxy(request: NextRequest) {
  const sitePassword = process.env.SITE_PASSWORD;

  // Sin contraseña configurada (p. ej. en desarrollo local) no bloqueamos.
  if (!sitePassword) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SITE_ACCESS_COOKIE)?.value;
  if (token === expectedToken(sitePassword)) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/api/")) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const loginUrl = new URL("/acceder", request.url);
  loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/((?!acceder|admin|api/acceder|api/admin|_next/static|_next/image|favicon.ico|opengraph-image|twitter-image|robots.txt|sitemap.xml).*)",
  ],
};
