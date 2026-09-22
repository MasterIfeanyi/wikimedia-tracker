import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(request) {
  const isApiRoute = request.nextUrl.pathname.startsWith("/api/prs");

  // allow GET requests for public facing side
  if (isApiRoute && request.method === "GET") {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  const verified = token ? await verifyToken(token) : null;

  if (!verified) {
    // return 401 status code for postman
    if (isApiRoute) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // else redirect the person to login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/prs/:path*"],
};