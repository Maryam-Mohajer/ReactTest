import { UserRoles } from 'core/enums';
import { lazy } from 'react';
import { IAuthenticatedRoute } from '.';
import { Module } from 'module';

export const AuthenticatedRoutesConfig: Array<IAuthenticatedRoute> = [
  {
    path: '/',
    component: lazy(() =>
      import('../../screens/Dashboard/Dashboard').then((module) => ({
        default: module.default,
      })),
    ),
    exact: true,
    roles: [UserRoles.UserReal, UserRoles.UserLegal],
  },
  {
    path: '/',
    component: lazy(() =>
      import('../../screens/Dashboard/Dashboard').then((module) => ({
        default: module.default,
      })),
    ),
    exact: true,
    roles: [UserRoles.UserReal, UserRoles.UserLegal],
  },
  {
    path: '/Registration/CountyAdmin',

    component: lazy(() =>
      import('../../screens/Registration/CountyAdminRole/CountyAdminRole').then((module) => ({
        default: module.default,
      })),
    ),
    exact: true,
    roles: [UserRoles.CountyGuildRoomAdmin],
  },
  {
    path: '/Registration/UnionAdmin',

    component: lazy(() =>
      import('../../screens/Registration/UnionAdminRole/UnionAdminRole').then((module) => ({
        default: module.default,
      })),
    ),
    exact: true,
    roles: [UserRoles.UnionAdmin],
  },
];
