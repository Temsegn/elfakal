import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ADMIN_PATHS = ["/admin/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("admin_token")?.value;
  const isAdmin = pathname.startsWith("/admin");
  const isPublicAdmin = PUBLIC_ADMIN_PATHS.some((p) => pathname === p);

  if (!isAdmin) {
    return NextResponse.next();
  }

  if (isPublicAdmin && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (!isPublicAdmin && !token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
