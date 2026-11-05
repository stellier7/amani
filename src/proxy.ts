import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decryptSession, SESSION_COOKIE } from "@/lib/auth/session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
  if (!isAdmin || pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await decryptSession(token) : null;
  if (session) {
    return NextResponse.next();
  }

  const login = new URL("/admin/login", request.url);
  login.searchParams.set("next", pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
