import { AssignmentType } from "@/@types/role";

const prefix = "/dashboard";

const baseRoutes = [
  prefix,
  `${prefix}/clients`,
  `${prefix}/services`,
  `${prefix}/schedules`,
  `${prefix}/login`,
];

const authorizedRoutesByRole = {
  [AssignmentType.CLIENT]: [] as string[],
  [AssignmentType.EMPLOYEE]: baseRoutes,
  [AssignmentType.ADMIN]: [
    ...baseRoutes,
    `${prefix}/employees`,
    `${prefix}/products`,
    `${prefix}/categories`,
    ,
  ],
  [AssignmentType.ATTENDANT]: baseRoutes,
};

export function getAuthorizedRoutesByRoles(role: AssignmentType) {
  const allRoles = Object.values(AssignmentType);

  if (!allRoles.includes(role)) {
    throw new Error(`Invalid role: ${role}`);
  }

  return authorizedRoutesByRole[role] || [];
}
