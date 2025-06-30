import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // get the session token cookie
  const token =
    request.cookies.get("authjs.session-token")?.value ||
    request.cookies.get("__Secure-authjs.session-token")?.value;

  // if no token, redirect to "/"
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // otherwise continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|$).*)"],
};
