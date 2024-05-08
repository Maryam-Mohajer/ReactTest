import React, { Suspense } from "react";
import { Route, Redirect } from "react-router-dom";

import { ContextLayout } from "../../../../core/utils/context/Layout";
import { VerticalLayout } from "../../../../App/AuthenticatedApp/Layout/VerticalLayout";
import { FallBackSpinner } from "../../Spinner/FallBackSpinner/FallbackSpinner";
import { CanStatus } from "../../../../core/utils/context/StatusProvider";
import { useUserAuth } from "../../../../core/utils/context/AuthenticationContext";
import { ScrollToTop } from "../../Wrapper/ScrollToTop";
import jwt_decode from "jwt-decode";

interface IPropTypes {
  component: any;
  fullLayout?: any;
  roles?: Array<string>;
  user?: any;
  path: string;
  status?: number;
  statusKey?: string;
  exact?: boolean;
  permissions?: string[] | string;
  flow?: string;
}

export const CanRole: React.FC<{ roles: string[] }> = ({ children, roles }) => {
  const { role, token, logOut } = useUserAuth();

  let valid = false; //roles.includes(role)
  try {
    valid = roles.some((p: any) => role.includes(p));
    let ownRole = role;
    if (typeof ownRole === "string") {
      ownRole = [ownRole];
    }

    // if (
    //   ownRole.length !== decodeRole.length ||
    //   ownRole.some((r: string) => !decodeRole.includes(r))
    // ) {
    //   alert('-heere-')

    //   logOut();
    //   console.log(ownRole, decodeRole);
    // }
  } catch (error) {
    //logOut();
    console.log(error);
  }

  if (valid) {
    return <>{children}</>;
  } else {
    return <Redirect to="/access-denied" />;
  }

  // if (token && valid) {
  //   return <>{children}</>;
  // } else if (token && !valid) {
  //   return <Redirect to="/PrimaryInformation" />;
  // } else {
  //   return <Redirect to="/access-denied" />;
  // }
};
export const AllowRole: React.FC<{ roles: string[] }> = ({
  children,
  roles,
}) => {
  const { role } = useUserAuth();
  const valid = roles.some((p: any) => role.includes(p));

  if (valid) {
    return <>{children}</>;
  } else {
    return null;
  }
};

const ProtectedRoute: React.FC<IPropTypes> = ({
  component: Component,
  fullLayout,
  roles = [],
  user,
  path,
  status,
  exact,
  permissions,
  flow,
}) => {
  // const checkExpirty = useCheckExpiry();

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        return (
          <ContextLayout.Consumer>
            {(context) => {
              return (
                <VerticalLayout
                  {...props}
                  permission={roles}
                  collapseSidebar={() => {}}
                >
                  <CanRole roles={roles}>
                    <CanStatus flow={flow} status={status}>
                      <Suspense fallback={<FallBackSpinner />}>
                        <ScrollToTop>
                          <Component {...props} permissions={permissions} />
                        </ScrollToTop>
                      </Suspense>
                    </CanStatus>
                  </CanRole>
                </VerticalLayout>
              );
            }}
          </ContextLayout.Consumer>
        );
      }}
    />
  );
};

export { ProtectedRoute };
