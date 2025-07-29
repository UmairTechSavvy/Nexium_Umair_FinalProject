import { NextResponse, NextRequest } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const publicPath = path === "/login" || path === "/signup";
  const token = request.cookies.get("token")?.value || "";

  if (publicPath && token) {
    // Redirect to home page if user is already logged in
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!publicPath && !token) {
    // Redirect to login if user tries to access private pages without being logged in
    if (path === "/login") {
      return NextResponse.redirect(new URL("/signup", request.nextUrl)); // if at login page, redirect to signup
    }
    return NextResponse.redirect(new URL("/login", request.nextUrl)); // redirect to login page
  }
}

export const config = {
  matcher: ["/", "/login", "/signup"],
};
