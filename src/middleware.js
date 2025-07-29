import { NextResponse, NextRequest } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const publicPath = path === "/login" || path === "/signup";
  const token = request.cookies.get("token")?.value || "";

  // Prevent logged-in users from accessing login/signup pages
  if (publicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // Redirect to login/signup for non-authenticated users trying to access protected pages
  if (!publicPath && !token) {
    if (path === "/login") {
      return NextResponse.redirect(new URL("/signup", request.nextUrl)); // Redirect login to signup
    }
    return NextResponse.redirect(new URL("/login", request.nextUrl)); // Redirect protected pages to login
  }
}

export const config = {
  matcher: ["/", "/login", "/signup"],
};
