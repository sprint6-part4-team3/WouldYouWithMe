import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getCookie } from "@/utils/next-cookie";

export default async function loginRequired(request: NextRequest) {
  const token = await getCookie("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
