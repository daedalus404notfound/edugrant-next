// middleware.js - Simple debug version
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/administrator/home")) {
    console.log("Cookies:", request.headers.get("cookie"));

    // Always let through - just log what we see
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/administrator/home/:path*"],
};
