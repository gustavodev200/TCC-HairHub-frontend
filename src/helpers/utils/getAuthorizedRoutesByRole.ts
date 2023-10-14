import { AssignmentType } from "@/@types/role";

const prefix = "/dashboard";

const baseRoutes = [
  prefix,
  `${prefix}/employees`,
  `${prefix}/clients`,
  `${prefix}/services`,
  `${prefix}/categories`,
  `${prefix}/products`,
  `${prefix}/schedules`,
];

const authorizedRoutesByRole = {
  [AssignmentType.CLIENT]: baseRoutes,
  [AssignmentType.EMPLOYEE]: baseRoutes,
  [AssignmentType.ADMIN]: [...baseRoutes, `${prefix}/employees`],
  [AssignmentType.ATTENDANT]: baseRoutes,
};

export function getAuthorizedRoutesByRoles(role: AssignmentType) {
  const allRoles = Object.values(AssignmentType);

  if (!allRoles.includes(role)) {
    throw new Error(`Invalid role: ${role}`);
  }

  return authorizedRoutesByRole[role] || [];
}
