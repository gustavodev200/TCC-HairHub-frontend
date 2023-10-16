import { NextRequest, NextResponse } from "next/server";
import { AssignmentType } from "./@types/role";
import jwtDecode from "jwt-decode";
import { getAuthorizedRoutesByRoles } from "./helpers/utils/getAuthorizedRoutesByRole";
import { toast } from "react-toastify";

export const config = {
  matcher: "/dashboard/:path*",
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get("@hairhub");

  if (!accessToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const decodedToken = jwtDecode(accessToken.value);

  const { role } = decodedToken as { role: AssignmentType };

  if (role === AssignmentType.CLIENT) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const authorizedRoutes = getAuthorizedRoutesByRoles(role);

  if (!authorizedRoutes.includes(pathname)) {
    const res = NextResponse.redirect(new URL("/dashboard", req.url));

    return res;
  }

  return NextResponse.next();
}
