// middleware.js (place in root directory)
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run middleware for admin routes
  if (pathname.startsWith("/administrator") && pathname !== "/administrator") {
    try {
      // Get cookies from the request
      const cookies = request.headers.get("cookie");

      // Verify admin authentication using axios
      const response = await axios.post(
        "https://edugrant-express-server-production.up.railway.app/administrator/adminTokenAuthentication",
        {},
        {
          headers: {
            Cookie: cookies || "",
            "Content-Type": "application/json",
          },
          withCredentials: true,
          timeout: 5000, // 5 second timeout
        }
      );

      if (response.status === 200) {
        // Authentication successful, continue to the requested page
        return NextResponse.next();
      } else {
        // Authentication failed, redirect to login
        const url = request.nextUrl.clone();
        url.pathname = "/administrator";
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.error("Middleware authentication error:", error);
      // On error, redirect to login
      const url = request.nextUrl.clone();
      url.pathname = "/administrator";
      return NextResponse.redirect(url);
    }
  }

  // For all other routes, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: ["/administrator/:path*"],
};
