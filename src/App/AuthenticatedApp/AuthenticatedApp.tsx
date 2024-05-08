import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { SignOut } from "../../components/Authentication/SignOut/SignOut";
import { ProtectedRoute } from "../../components/common/RouteComponents/ProtectedRoute";
import { SigninOidc } from "../../components/SigninOidc/SigninOidc";
// import { FailPage } from "../../components/WalletContainer/FailPage/FailPage";
// import { SuccessPage } from "../../components/WalletContainer/SuccessPage/SuccessPage";
import { IAuthenticatedRoute } from "../../configs/RouteConfig";
import AuthenticatedRoutesConfig from "../../configs/RouteConfig/index";
import { ToastTypes } from "../../core/enums";
import { showToast } from "../../core/utils";
import { history } from "../../browser-history";
import { AccessDenied } from "../../screens/Errors/AccessDenied";
import { SignOutOidc } from "components/SignOutOidc/SignOutOidc";



const AuthenticatedApp: React.FC = () => {
  return (
    <React.Fragment>
      <Router history={history}>
        <Switch>
          {AuthenticatedRoutesConfig.map((item: IAuthenticatedRoute, key) => {
            return (
              <ProtectedRoute
                path={item.path}
                component={item.component}
                exact={item.exact}
                roles={item.roles}
                status={item.status ? item.status : undefined}
                key={key}
              />
            );
          })}

          <Route exact path="/access-denied" component={AccessDenied} />
          <Route path="/signin-oidc" exact={true}>
            <SigninOidc />
          </Route>
          <Route path="/signout-oidc" exact={true}>
            <SignOutOidc />
          </Route>
          <Route
            path="/Register"
            render={() => {
              history.push("/");
              return null;
            }}
          />
          <Route
            render={() => {
              history.push("/");
              showToast(["صفحه مورد نظر یافت نشد"], ToastTypes.error);
              return null;
            }}
          />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export { AuthenticatedApp };
