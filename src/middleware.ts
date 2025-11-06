// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import * as jose from "jose";

// const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const userToken = req.cookies.get("token")?.value;
//   const adminToken = req.cookies.get("AdminToken")?.value;

//   console.log("🔍 Path:", pathname);
//   console.log("👉 userToken:", userToken);
//   console.log("👉 adminToken:", adminToken);

//   // Auto redirect if landing page `/`
//   if (pathname === "/") {
//     if (userToken) {
//       console.log("✅ User already logged in, redirecting to user dashboard");
//       return NextResponse.redirect(new URL("/user/home", req.url));
//     }
//   }

//   // Auto redirect if admin is already logged in and tries to access `/administrator` (login page)
//   if (pathname === "/administrator") {
//     if (adminToken) {
//       try {
//         const { payload } = await jose.jwtVerify(adminToken, SECRET);
//         console.log("Decoded payload:", payload);

//         const role = payload.role as string;

//         if (role === "ISPSU_Head") {
//           return NextResponse.redirect(
//             new URL("/administrator/head/home", req.url)
//           );
//         } else if (role === "ISPSU_Staff") {
//           return NextResponse.redirect(
//             new URL("/administrator/staff/home", req.url)
//           );
//         }
//       } catch (error) {
//         console.error("❌ Invalid token:", error);
//         return NextResponse.redirect(new URL("/administrator/", req.url));
//       }
//     }
//     return NextResponse.next();
//   }

//   // Protect user routes
//   if (pathname.startsWith("/user")) {
//     if (!userToken) {
//       console.log("🚨 No user token, redirecting to login");
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//   }

//   // Protect administrator dashboard routes (not login)
//   if (
//     pathname.startsWith("/administrator/head") ||
//     pathname.startsWith("/administrator/staff")
//   ) {
//     if (!adminToken) {
//       console.log("🚨 No admin token, redirecting to login");
//       return NextResponse.redirect(new URL("/administrator", req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/",
//     "/administrator",
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
import * as jose from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  // const { pathname } = req.nextUrl;
  // const userToken = req.cookies.get("token")?.value;
  // const adminToken = req.cookies.get("AdminToken")?.value;
  // console.log("🔍 Path:", pathname);
  // console.log("👉 userToken:", userToken);
  // console.log("👉 adminToken:", adminToken);
  // // Auto redirect if landing page `/`
  // if (pathname === "/") {
  //   if (userToken) {
  //     console.log("✅ User already logged in, redirecting to user dashboard");
  //     return NextResponse.redirect(new URL("/user/home", req.url));
  //   }
  // }
  // // Auto redirect if admin is already logged in and tries to access `/administrator` (login page)
  // if (pathname === "/administrator") {
  //   if (adminToken) {
  //     try {
  //       const { payload } = await jose.jwtVerify(adminToken, SECRET);
  //       console.log("Decoded payload:", payload);
  //       const role = payload.role as string;
  //       if (role === "ISPSU_Head") {
  //         return NextResponse.redirect(
  //           new URL("/administrator/head/home", req.url)
  //         );
  //       } else if (role === "ISPSU_Staff") {
  //         return NextResponse.redirect(
  //           new URL("/administrator/staff/home", req.url)
  //         );
  //       }
  //     } catch (error) {
  //       console.error("❌ Invalid token:", error);
  //       return NextResponse.redirect(new URL("/administrator/", req.url));
  //     }
  //   }
  //   return NextResponse.next();
  // }
  // // Protect user routes
  // if (pathname.startsWith("/user")) {
  //   if (!userToken) {
  //     console.log("🚨 No user token, redirecting to login");
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }
  // }
  // // Protect administrator dashboard routes (not login)
  // if (
  //   pathname.startsWith("/administrator/head") ||
  //   pathname.startsWith("/administrator/staff")
  // ) {
  //   if (!adminToken) {
  //     console.log("🚨 No admin token, redirecting to login");
  //     return NextResponse.redirect(new URL("/administrator", req.url));
  //   }
  // }
  // return NextResponse.next();
}

// export const config = {
//   matcher: [
//     "/",
//     "/administrator",
//     "/user/home",
//     "/user/home/:path*",
//     "/administrator/head",
//     "/administrator/head/home:path*",
//     "/administrator/staff",
//     "/administrator/staff/home:path*",
//   ],
// };
