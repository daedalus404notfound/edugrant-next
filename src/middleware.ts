import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest){
    const { pathname } = request.nextUrl;
    console.log("👀 Middleware is running!")
    if(pathname.startsWith("/administrator/home")){
        try {
            const ValidToken = await axios.post(`${process.env.NEXT_PUBLIC_USER_API}/adminTokenAuthentication`,{},{withCredentials:true});
            if(ValidToken.status !== 200){
                return NextResponse.redirect(new URL("/administrator", request.url))
            }
        } catch (error) {
        }
    }
    if(pathname.startsWith("/home")){
        try {
            const ValidToken = await axios.post(`${process.env.NEXT_PUBLIC_USER_API}/tokenValidation`,{},{withCredentials:true});
            if(ValidToken.status !== 200){
                return NextResponse.redirect(new URL("/", request.url))
            }
        } catch (error) {
        }
    }
    return NextResponse.next()
}

export const config = {
    matcher:["/administrator/home/:path*", "/home/:path*"],
}