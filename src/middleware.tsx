import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/(UserServices)/AuthService";

type Role = "customer" | "admin";

const authRoutes = ["/login", "/register", "/admin-login"];

const roleBasedPrivateRoutes: Record<Role, RegExp[]> = {
  admin: [/^\/dashboard/],
  customer: [/^\/payments/, /^\/profile/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname, origin } = request.nextUrl;
  const userInfo = await getCurrentUser();

  // Public access for auth pages
  if (authRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Handle unauthenticated user access
  if (!userInfo) {
    const isAdminRoute = /^\/dashboard/.test(pathname);
    const redirectPath = encodeURIComponent(pathname);

    const loginRedirectUrl = new URL(
      isAdminRoute
        ? `${origin}/admin-login?redirectPath=${redirectPath}`
        : `${origin}/login?redirectPath=${redirectPath}`
    );

    return NextResponse.redirect(loginRedirectUrl);
  }

  // Role-based route validation
  const userRole = userInfo.role?.toLowerCase() as Role;

  if (!userRole || !roleBasedPrivateRoutes[userRole]) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const allowedRoutes = roleBasedPrivateRoutes[userRole];
  const isAllowed = allowedRoutes.some((route) => route.test(pathname));

  if (!isAllowed) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/profile/:path*",
    "/payments/:path*",
    "/dashboard/:path*",
  ],
};
