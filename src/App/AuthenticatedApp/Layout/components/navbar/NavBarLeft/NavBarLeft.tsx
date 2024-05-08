import React, { useState } from "react";
import Style from "./style.module.scss";
import { LogOut, Calendar } from "react-feather";
import { showToast } from "core/utils";
import { ToastTypes } from "core/enums";
import { useHistory } from "react-router";
import { SweetAlertCallback } from "components/common/SweetAlert/SweetALertCallback/SweetALertCallback";

const NavBarLeft = () => {
  const history = useHistory();
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const date = new Date().toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleLogOut = () => {
    showToast(["در حال خروج از سایت"], ToastTypes.info);
    localStorage.removeItem("havePassword");
    history.push("/signout-oidc");
  };

  return (
    <>
      <SweetAlertCallback
        mutation={null}
        title=""
        onCancel={() => {
          setShowConfirmation(false);
        }}
        onClose={() => {
          setShowConfirmation(false);
        }}
        onConfirm={() => {
          setShowConfirmation(false);
          handleLogOut();
        }}
        show={showConfirmation}
      >
        کاربر گرامی آیا از خروج خود مطمئن هستید؟
      </SweetAlertCallback>
      <div className={`d-flex ${Style["navbar-left-side"]}`}>
        <div
          onClick={() => setShowConfirmation(true)}
          className={`${Style["exit-wraper"]} ${Style["btn-wrapper"]} mr-0 mr-md-1`}
        >
          <LogOut className={Style["exit-logo"]} />
        </div>
        <div
          className={`${Style["date-wraper"]} ${Style["btn-wrapper"]} px-2 d-none d-lg-block`}
        >
          <Calendar className={`mr-1 ${Style["calender-logo"]}`} />
          {date}
        </div>
      </div>
    </>
  );
};

export default NavBarLeft;
