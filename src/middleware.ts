import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const accessToken = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  /** 회원일때 해당 페이지 접근하면 /user-setting 으로 */
  if (
    (pathname === "/login" ||
      pathname === "/sign-up" ||
      pathname === "/reset-password") &&
    accessToken
  ) {
    return NextResponse.redirect(new URL("/user-setting", request.nextUrl));
  }

  /** 비회원일때 해당 페이지에 접근하면 /login 으로 */
  if (
    (pathname === "/user-setting" ||
      (pathname.startsWith("/board/") && pathname.endsWith("/edit")) ||
      pathname === "/create-board" ||
      pathname === "/create-team" ||
      pathname === "/join-team" ||
      pathname.startsWith("/team/") ||
      pathname === "/team-empty" ||
      pathname === "/user-history") &&
    !accessToken
  ) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/login",
    "/sign-up",
    "/reset-password",
    "/user-setting",

    "/board/:path*/edit",
    "/create-board",

    "/create-team",
    "/join-team",
    "/team/:path*",
    "/team-empty",

    "/user-history",
  ],
};
