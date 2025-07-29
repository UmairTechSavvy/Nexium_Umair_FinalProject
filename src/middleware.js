import { NextResponse, NextRequest } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const publicPath = path === "/login" || path === "/signup";
  const token = request.cookies.get("token")?.value || "";

  
  if (publicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }


  if (!publicPath && !token) {
    if (path === "/login") {
      return NextResponse.redirect(new URL("/signup", request.nextUrl)); 
    }
    return NextResponse.redirect(new URL("/login", request.nextUrl)); 
  }
}

export const config = {
  matcher: ["/", "/login", "/signup"],
};
