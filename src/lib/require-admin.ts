import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-access";

export async function isAdminAuthenticated() {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedUsername || !expectedPassword) return false;

  const expectedToken = createHash("sha256")
    .update(`${expectedUsername}:${expectedPassword}`)
    .digest("hex");

  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value === expectedToken;
}
