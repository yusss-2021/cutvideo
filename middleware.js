import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // kalau token gak ada → redirect ke /login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // kalau token ada → lanjut
  return NextResponse.next();
}

// Aktifkan middleware hanya untuk route tertentu
export const config = {
  matcher: ["/dashboard/:path*", "/upload/:path*"],
};
