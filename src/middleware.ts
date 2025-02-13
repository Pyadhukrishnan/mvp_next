import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken")?.value; // Read token from cookies

  // If no authToken and trying to access a protected route, redirect to login
  if (!authToken && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next(); // Allow request to continue
}

// Apply middleware only to protected routes
export const config = {
  matcher: ["/", "/"], // Add paths that need protection
};
