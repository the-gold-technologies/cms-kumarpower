import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_TOKEN = process.env.AUTH_TOKEN ?? "";
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(",") ?? [];

// Public API endpoints that allow unauthenticated POST requests from the main website
const PUBLIC_POST_ENDPOINTS = [
  "/api/auth/login",
  "/api/auth/logout",
  "/api/contact",
  "/api/leads",
  "/api/enquiries",
  "/api/applications",
  "/api/upload", // Internal checks strictly limit unauthenticated upload to resumes <= 5MB
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get("origin");
  const method = request.method.toUpperCase();

  const authToken = request.cookies.get("auth_token")?.value;
  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;
  const isAuthenticated = AUTH_TOKEN !== "" && (authToken === AUTH_TOKEN || bearerToken === AUTH_TOKEN);

  // ─────────────────────────────────────────────────────────────
  // 1. API routes
  // ─────────────────────────────────────────────────────────────
  if (pathname.startsWith("/api/")) {
    // Handle CORS preflight (OPTIONS)
    if (method === "OPTIONS") {
      const response = new NextResponse(null, { status: 204 });
      if (origin && (ALLOWED_ORIGINS.includes(origin) || ALLOWED_ORIGINS.includes("*"))) {
        response.headers.set("Access-Control-Allow-Origin", origin);
        response.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
        response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.headers.set("Access-Control-Allow-Credentials", "true");
      }
      return response;
    }

    // Security Check: Block unauthenticated mutations (PUT, DELETE, PATCH, or non-public POST)
    const isMutation = ["POST", "PUT", "PATCH", "DELETE"].includes(method);
    const isPublicPost = method === "POST" && PUBLIC_POST_ENDPOINTS.some((p) => pathname.startsWith(p));

    if (isMutation && !isPublicPost && !isAuthenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Authentication required to modify content." },
        { status: 401 }
      );
    }

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
  // Process all routes except Next.js internals and favicon
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
