import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get("authjs.session-token")?.value ||
    request.cookies.get("__Secure-authjs.session-token")?.value;

  // if no token and not on the public route (/), redirect
  console.log("token-------------", token);
  if (!token) {
    console.log("helo");
    return NextResponse.redirect(new URL("/", request.url));
  }
  console.log(request.url);
  return NextResponse.next();
}

// apply middleware to everything EXCEPT the homepage (/)
export const config = {
  matcher: ["/((?!$|api|_next/static|_next/image|favicon.ico).*)"],
};
