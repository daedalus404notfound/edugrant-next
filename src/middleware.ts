// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   const userToken = req.cookies.get("token")?.value;
//   const adminToken = req.cookies.get("adminToken")?.value;

//   console.log("🔍 Path:", pathname);
//   console.log("👉 userToken:", userToken);
//   console.log("👉 adminToken:", adminToken);

//   // Protect user routes
//   if (pathname.startsWith("/user")) {
//     if (!userToken) {
//       console.log("🚨 No user token, redirecting to login");
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//   }

//   // Protect administrator routes
//   if (pathname.startsWith("/administrator")) {
//     if (!adminToken) {
//       console.log("🚨 No admin token, redirecting to login");
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//   }

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
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const userToken = req.cookies.get("token")?.value;
  const adminToken = req.cookies.get("adminToken")?.value;

  console.log("🔍 Path:", pathname);
  console.log("👉 userToken:", userToken);
  console.log("👉 adminToken:", adminToken);

  // Auto redirect if landing page `/`
  if (pathname === "/") {
    if (userToken) {
      console.log("✅ User already logged in, redirecting to user dashboard");
      return NextResponse.redirect(new URL("/user/home", req.url));
    }
    if (adminToken) {
      console.log("✅ Admin already logged in, redirecting to admin dashboard");
      return NextResponse.redirect(
        new URL("/administrator/head/home", req.url)
      );
    }
  }

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
  matcher: [
    "/",
    "/user/home",
    "/user/home/:path*",
    "/administrator/head",
    "/administrator/head/home:path*",
    "/administrator/staff",
    "/administrator/staff/home:path*",
  ],
};
