import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const IntersectionCookie: string = process.env.INTERSECTION_COOKIE || "accessToken"; // Define cookie name

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow all image files and certain static assets to pass through
  if (
    pathname.match(/\.(svg|png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot)$/) || 
    pathname.startsWith("/_next/static/") ||
    pathname.startsWith("/_next/image")
  ) {
    return NextResponse.next();
  }

  const authToken = request.cookies.get("accessToken")?.value; // Read token from cookies

  // Login page logic
  if (pathname === "/login") {
    // Allow access to the login page if the user is not logged in
    if (authToken) {
      // If the user is logged in, redirect to the dashboard (or another page)
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next(); // Allow access to login page
  }

  // Protect other routes (non-login routes)
  if (request.method === "GET") {
    // Redirect to login if no cookie exists (not logged in)
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login
    }
  }

  return NextResponse.next(); // Allow request to continue
}

// Apply middleware to all routes (or adjust the matcher to limit to specific routes)
export const config = {
  matcher: [
    "/(.*)",  // Apply to the home route and any other route that needs protection
  ],
};
