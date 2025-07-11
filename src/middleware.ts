// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  console.log("🔐 Checking token for:", request.nextUrl.pathname);
  console.log("📦 Token:", token ? "[Present]" : "[Missing]");

  if (!token) {
    console.log("⛔ No token — redirecting to /administrator");
    return NextResponse.redirect(new URL("/administrator", request.url));
  }

  console.log("✅ Token found — proceeding");
  return NextResponse.next();
}

export const config = {
  matcher: ["/administrator/home"],
};
