import React, { useEffect } from "react";
import { FallBackSpinner } from "components/common/Spinner/FallBackSpinner/FallbackSpinner";
import { ToastTypes } from "../../../core/enums";
import { login } from "../../../core/services/authentication/authentication.service";
import { showToast } from "../../../core/utils";

interface IPropTypes {

}
const LoginContainer: React.FC<IPropTypes> = ({}) => {

  useEffect(() => {
    showToast(["در حال انتقال به صفحه ورود ..."], ToastTypes.success);
    login(); 
  },[])

  return <FallBackSpinner text="انتقال به صفحه ورود ..." />;
};

export { LoginContainer };
