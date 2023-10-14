import { NextRequest, NextResponse } from "next/server";
import { AssignmentType } from "./@types/role";
import jwtDecode from "jwt-decode";
import { getAuthorizedRoutesByRoles } from "./helpers/utils/getAuthorizedRoutesByRole";

export const config = {
  matcher: "/client/:path*",
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get("@hairhub");

  if (!accessToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const decodedToken = jwtDecode(accessToken.value);

  const { role } = decodedToken as { role: AssignmentType };

  const authorizedRoutes = getAuthorizedRoutesByRoles(role);

  if (!authorizedRoutes.includes(pathname)) {
    const res = NextResponse.redirect(new URL("/client", req.url));

    return res;
  }

  return NextResponse.next();
}
