import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_TOKEN = process.env.AUTH_TOKEN ?? "";
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(",") ?? [];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get("origin");

  // ─────────────────────────────────────────────────────────────
  // 1. API routes — always allow (used by the public website)
  //    Add CORS headers so the website domain can call these.
  // ─────────────────────────────────────────────────────────────
  if (pathname.startsWith("/api/")) {
    const response = NextResponse.next();

    if (origin && (ALLOWED_ORIGINS.includes(origin) || ALLOWED_ORIGINS.includes("*"))) {
      response.headers.set("Access-Control-Allow-Origin", origin);
      response.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
      response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
      response.headers.set("Access-Control-Allow-Credentials", "true");
    }

    return response;
  }

  // ─────────────────────────────────────────────────────────────
  // 2. Static files — always allow
  // ─────────────────────────────────────────────────────────────
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/k-logo") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".mp4")
  ) {
    return NextResponse.next();
  }

  // ─────────────────────────────────────────────────────────────
  // 3. CMS page routes — require auth cookie
  // ─────────────────────────────────────────────────────────────
  const authToken = request.cookies.get("auth_token");
  const isAuthenticated = AUTH_TOKEN !== "" && authToken?.value === AUTH_TOKEN;

  // /login page: redirect to dashboard if already logged in
  if (pathname === "/login") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // All other CMS pages require authentication
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Exclude api, static, and image routes from middleware processing
  // Only CMS page routes go through the auth check above
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
