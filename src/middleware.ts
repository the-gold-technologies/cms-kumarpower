import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_TOKEN = process.env.AUTH_TOKEN ?? "";

// API routes that are always public
const PUBLIC_API_PATHS = ["/api/auth/login", "/api/auth/logout"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow Next.js internals and static files
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

  // Always allow public API routes
  const isPublicApi = PUBLIC_API_PATHS.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );
  if (isPublicApi) {
    return NextResponse.next();
  }

  const authToken = request.cookies.get("auth_token");
  const isAuthenticated = authToken?.value === AUTH_TOKEN;

  // If the user is on the login page
  if (pathname === "/login") {
    if (isAuthenticated) {
      // Already logged in — redirect to dashboard
      return NextResponse.redirect(new URL("/", request.url));
    }
    // Not logged in — show login page
    return NextResponse.next();
  }

  // For all other routes, require authentication
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
