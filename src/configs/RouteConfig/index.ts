import { AuthenticatedRoutesConfig } from "./Route.routes";
import { UserRoles } from "../../core/enums";

export interface IAuthenticatedRoute {
  path: string;
  component: React.ReactNode;
  status?: number;
  exact: boolean;
  roles: Array<UserRoles>;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  ...AuthenticatedRoutesConfig,
];
