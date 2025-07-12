// middleware.js (in your root directory)
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Only run middleware on admin routes, but exclude login page
  if (
    request.nextUrl.pathname.startsWith("/administrator") &&
    !request.nextUrl.pathname.startsWith("/administrator/login")
  ) {
    const token = request.cookies.get("token")?.value;

    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(
        new URL("/administrator/login", request.url)
      );
    }

    try {
      // Verify token with your backend
      const response = await fetch(
        "https://edugrant-express-server-production.up.railway.app/administrator/adminTokenAuthentication",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: request.headers.get("cookie") || `token=${token}`,
          },
        }
      );

      if (!response.ok) {
        // Token is invalid, redirect to login
        return NextResponse.redirect(
          new URL("/administrator/login", request.url)
        );
      }

      // Token is valid, allow access
      return NextResponse.next();
    } catch (error) {
      console.error("Authentication error:", error);
      // On error, redirect to login
      return NextResponse.redirect(
        new URL("/administrator/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/administrator/:path*",
    // This will match all /administrator routes
    // But the middleware logic excludes /administrator/login
  ],
};
