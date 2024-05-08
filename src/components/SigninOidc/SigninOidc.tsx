import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { setItem } from "../../core/services/common/storage/storage.service";
import { useUserAuth } from "../../core/utils/context/AuthenticationContext";
import { ComponentSpinner } from "../common/Spinner/LoadingSpinner";
import * as auth from "../../core/services/authentication/authentication.service";

const SigninOidc: React.FC = () => {
  const history = useHistory();
  const { setRoleState, setTokenState, setUserInfoState } = useUserAuth();
  useEffect(() => {
    async function signinAsync() {
      try {
        const result = await auth.loginCallback();
        const exp = new Date(result.expires_at * 1000);
        const userProfile = result.profile;

        setItem("refresh_token", result.refresh_token);
        setItem("expiry", exp.getTime());
        setItem("token", result.access_token);

        let role: string[] = [];
        if (userProfile.role) role = userProfile.role;
        if (userProfile.role && userProfile.role.length === 0) {
          role.push("UserReal");
        }
        if (typeof role === "string") {
          role = [role];
        }

        const user = {
          userName: userProfile?.Username,
          name: userProfile?.name,
          family: userProfile?.family_name,
          authTime: userProfile.auth_time,
          userType: +userProfile?.UserType,
          userInfoId: +userProfile?.UserInfoId,
        };

        // set user information in context
        setRoleState(role);
        setTokenState(result.access_token);
        setUserInfoState(user);

        // set user information in local-storage
        auth.setLoggedUserInfoToStorage(user);
        auth.setUserRoles(role);

        setItem("roles", JSON.stringify(role));
        history.push("/");
      } catch (error) {}
    }
    signinAsync();
  }, [history]);

  return <ComponentSpinner />;
};

export { SigninOidc };
