import { UserRoles } from "core/enums";
import { lazy } from "react";
import { IAuthenticatedRoute } from ".";

export const AuthenticatedRoutesConfig: Array<IAuthenticatedRoute> = [
  {
    path: "/",
    component: lazy(() =>
      import("../../screens/Dashboard/Dashboard").then((module) => ({
        default: module.default,
      }))
    ),
    exact: true,
    roles: [UserRoles.UserReal, UserRoles.UserLegal],
  },
  
  
  
];
