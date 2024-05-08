import { ComponentSpinner } from "components/common/Spinner/LoadingSpinner";
import { logout } from "core/services/authentication/authentication.service";
import { clearStorage } from "core/services/common/storage/storage.service";
import { useUserAuth } from "core/utils/context/AuthenticationContext";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";


const SignOutOidc: React.FC = ({ ...props }) => {
  const history = useHistory();

  const { resetAuthContext } = useUserAuth();

  useEffect(() => {
    // redirect user to home page
    // logOutCallback();
    logout();
    clearStorage();
    resetAuthContext();

    // history.push("/register");
  }, []);
  return <ComponentSpinner />;
};

export { SignOutOidc };
