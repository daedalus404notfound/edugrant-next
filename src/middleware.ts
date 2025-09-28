// // middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;
//   const { pathname } = req.nextUrl;

//   console.log("🔍 Middleware triggered!");
//   console.log("👉 Requested path:", pathname);
//   console.log("👉 Token from cookies:", token);

//   if (!token) {
//     const redirectUrl = new URL("/", req.url);
//     console.log("🚨 No token found! Redirecting to:", redirectUrl.toString());
//     return NextResponse.redirect(redirectUrl);
//   }

//   console.log("✅ Token exists. Allowing request to continue.");
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/user/home",
//     "/user/home/:path*",
//     "/administrator/head",
//     "/administrator/head/home:path*",
//     "/administrator/staff",
//     "/administrator/staff/home:path*",
//   ],
// };
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const userToken = req.cookies.get("token")?.value;
  const adminToken = req.cookies.get("adminToken")?.value;

  console.log("🔍 Path:", pathname);
  console.log("👉 userToken:", userToken);
  console.log("👉 adminToken:", adminToken);

  // Protect user routes
  if (pathname.startsWith("/user")) {
    if (!userToken) {
      console.log("🚨 No user token, redirecting to login");
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Protect administrator routes
  if (pathname.startsWith("/administrator")) {
    if (!adminToken) {
      console.log("🚨 No admin token, redirecting to login");
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/administrator/:path*"],
};
