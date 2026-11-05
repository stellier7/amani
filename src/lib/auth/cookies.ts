import { cookies } from "next/headers";
import {
  decryptSession,
  encryptSession,
  SESSION_COOKIE,
  sessionCookieOptions,
  type SessionUser,
} from "@/lib/auth/session";

export async function getSession(): Promise<SessionUser | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return decryptSession(token);
}

export async function createSessionCookie(user: SessionUser): Promise<void> {
  const token = await encryptSession(user);
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, sessionCookieOptions);
}

export async function clearSessionCookie(): Promise<void> {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 });
}
