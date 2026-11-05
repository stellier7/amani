import { SignJWT, jwtVerify } from "jose";
import type { Role } from "@/lib/admin/types";

export const SESSION_COOKIE = "amani_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 14;

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

function sessionSecret(): Uint8Array {
  const value = process.env.AUTH_SECRET?.trim();
  if (!value) {
    throw new Error("AUTH_SECRET is not set");
  }
  return new TextEncoder().encode(value);
}

function asRole(value: unknown): Role | null {
  if (value === "admin" || value === "staff") return value;
  return null;
}

export async function encryptSession(user: SessionUser): Promise<string> {
  return new SignJWT({
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(sessionSecret());
}

export async function decryptSession(
  token: string,
): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, sessionSecret());
    const role = asRole(payload.role);
    const id = payload.sub;
    const email = payload.email;
    const name = payload.name;
    if (!role || !id || typeof email !== "string" || typeof name !== "string") {
      return null;
    }
    return { id, email, name, role };
  } catch {
    return null;
  }
}

export function safeAdminPath(value: string | null | undefined): string {
  if (
    value &&
    value.startsWith("/admin") &&
    !value.startsWith("//") &&
    !value.includes("\\")
  ) {
    return value;
  }
  return "/admin";
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_MAX_AGE_SECONDS,
};
