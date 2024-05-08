import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ToastTypes } from "../../../core/enums";
import { logout } from "../../../core/services/authentication/authentication.service";
import {
  clearStorage,
  removeItem,
} from "../../../core/services/common/storage/storage.service";
import { showToast } from "../../../core/utils";
import { useUserAuth } from "../../../core/utils/context/AuthenticationContext";
import { ComponentSpinner } from "../../common/Spinner/LoadingSpinner";

const SignOut: React.FC = ({ ...props }) => {
  const history = useHistory();

  const { resetAuthContext, setTokenState, setRoleState } = useUserAuth();

  useEffect(() => {
    logout();
    clearStorage();
    resetAuthContext();
    setRoleState([])
    setTokenState("")
    showToast(["با موفقیت خارج شدید."] , ToastTypes.success)
    history.push("/")
  }, []);
  return <ComponentSpinner />;
};

export { SignOut };
