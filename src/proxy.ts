import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createHash } from "node:crypto";
import { SITE_ACCESS_COOKIE } from "@/lib/site-access";

function expectedToken(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

// Rutas y tipos de archivo que deben quedar siempre accesibles, sin pasar
// por la contraseña del sitio: páginas propias del flujo de acceso, el
// panel de administración (que tiene su propio login independiente),
// recursos internos de Next.js, y cualquier imagen estática (necesario
// para que el propio optimizador de imágenes de Next, que hace una
// petición interna al archivo original, no se quede bloqueado).
const PUBLIC_PATHS = [
  "/acceder",
  "/admin",
  "/api/acceder",
  "/api/admin",
  "/favicon.ico",
  "/icon",
  "/apple-icon",
  "/opengraph-image",
  "/twitter-image",
  "/robots.txt",
  "/sitemap.xml",
];

const PUBLIC_FILE_PATTERN = /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i;

function isPublicPath(pathname: string) {
  if (pathname.startsWith("/_next/")) return true;
  if (PUBLIC_FILE_PATTERN.test(pathname)) return true;
  return PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

// Protege toda la web con una única contraseña compartida (ver PRD, sección
// de seguridad).
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const sitePassword = process.env.SITE_PASSWORD;

  // Sin contraseña configurada (p. ej. en desarrollo local) no bloqueamos.
  if (!sitePassword) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SITE_ACCESS_COOKIE)?.value;
  if (token === expectedToken(sitePassword)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const loginUrl = new URL("/acceder", request.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/(.*)"],
};
