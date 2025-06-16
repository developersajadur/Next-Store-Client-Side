import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

type Role = "customer" | "admin";

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes: Record<Role, RegExp[]> = {
  admin: [/^\/admin/],
  customer: [/^\/payments/, /^\/profile/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname, origin } = request.nextUrl;
  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      const redirectPath = pathname || "/";
      const loginRedirectUrl = new URL(
        `${origin}/login?redirectPath=${encodeURIComponent(redirectPath)}`
      );
      return NextResponse.redirect(loginRedirectUrl);
    }
  }

  const userRole = userInfo?.role?.toLowerCase() as Role | undefined;

  if (!userRole || !roleBasedPrivateRoutes[userRole]) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const allowedRoutes = roleBasedPrivateRoutes[userRole];
  const isAllowed = allowedRoutes.some((route) => pathname.match(route));

  if (isAllowed) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/profile/:page*",
    "/payments/:page*",
    "/create-event/:page*",
  ],
};