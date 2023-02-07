import { withAuth } from "next-auth/middleware";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";
import axios from "axios";
export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (
        (req.nextauth.token?.user as User)?.roleId != 1 &&
        (req.nextauth.token?.user as User)?.roleId != 2
      ) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } else {
      if (
        (req.nextauth.token?.user as User)?.roleId == 1 ||
        (req.nextauth.token?.user as User)?.roleId == 2
      ) {
        return NextResponse.redirect(new URL("/admin/user", req.url));
      }
    }
    if (req.nextUrl.pathname.startsWith("/test") && !req.nextauth.token) {
      return NextResponse.redirect(new URL("/?error=auth-to-test", req.url));
    }

    if (
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")
    ) {
      if (
        (req.nextauth.token?.user as User)?.roleId == 1 ||
        (req.nextauth.token?.user as User)?.roleId == 2
      ) {
        return NextResponse.redirect(new URL("/admin/user", req.url));
      } else if ((req.nextauth.token?.user as User)?.roleId == 3) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/((?!api|static|favicon.ico).*)"],
};
