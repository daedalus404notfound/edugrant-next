import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest){
    const { pathname } = request.nextUrl;
    if(pathname.startsWith("/administrator/home")){
        const ValidToken = await fetch(`${process.env.NEXT_PUBLIC_USER_API}/adminTokenAuthentication`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            cookie: request.headers.get("cookie") || "", // Forward user's cookies
        },
        body: JSON.stringify({}),
        });
        if(ValidToken.status !== 200){
            return NextResponse.redirect(new URL("/administrator", request.url))
        }
    }
    return NextResponse.next()
}

export const config = {
    matcher:"/administrator/home/:path*",
}