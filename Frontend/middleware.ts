import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register")
  ) {
    return NextResponse.next()
  }

  const token = req.cookies.get("token")?.value

  if (!token) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = "/login"
    loginUrl.search = `redirect=${encodeURIComponent(pathname)}`
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/:path*",
}
