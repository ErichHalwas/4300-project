import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const session = await auth();
    const isAuthenticated = !!session?.user;
    console.log(isAuthenticated, pathname); 

    const publicPaths = ["/", "/map", "/login", "/signup", "/settings"];

    if (!isAuthenticated && !publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
 
};

export const config = {
  matcher: [
    "/api/items/:path*",
    "/api/items/",
  ],
};

export default middleware;