import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { history } from "../../browser-history";
import { showToast } from "../../core/utils";
import { ToastTypes } from "../../core/enums";
import { SigninOidc } from "../../components/SigninOidc/SigninOidc";
import { SignOutOidc } from "components/SignOutOidc/SignOutOidc";
import { LoginContainer } from "screens/Authentication/Login/Login";


const UnAuthenticatedApp: React.FC = () => {
  return (
    <>
      <Router history={history}>
        <Switch>

          <Route path="/Login" render={() => <LoginContainer />} />
          <Route exact path="/" render={() => <Redirect to="/Login" />} />

          <Route path="/signin-oidc" exact={true}>
            <SigninOidc />
          </Route>
          <Route path="/signout-oidc" exact={true}>
            <SignOutOidc />
          </Route>
          {/* <Route path="/signout-oidc" component={SignOutOidc} /> */}
          <Route
            render={() => {
              history.push("/");
              showToast(["لطفا ابتدا وارد شوید"], ToastTypes.error);
              return null;
            }}
          />
        </Switch>
      </Router>
    </>
  );
};

export { UnAuthenticatedApp };
