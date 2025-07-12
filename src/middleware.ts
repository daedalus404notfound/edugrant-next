// middleware.js (in your root directory)
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Only run middleware on admin routes
  if (request.nextUrl.pathname.startsWith("/administrator/home")) {
    const token = request.cookies.get("token")?.value;

    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/administrator", request.url));
    }

    try {
      // Verify token with your backend
      const response = await fetch(
        "https://edugrant-express-server-production.up.railway.app/administrator/adminTokenAuthentication",
        {
          method: "POST",
          headers: {
            Cookie: `token=${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        // Token is invalid, redirect to login
        return NextResponse.redirect(new URL("/administrator", request.url));
      }

      // Token is valid, allow access
      return NextResponse.next();
    } catch (error) {
      console.error("Authentication error:", error);
      // On error, redirect to login
      return NextResponse.redirect(new URL("/administrator", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/administrator/home/:path*",
    // Add other admin routes that need protection
  ],
};
