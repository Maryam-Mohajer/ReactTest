import React from "react";
import Style from "./style.module.scss";

const NavBarCenter = () => {
  return (
    <div className={Style["navbar-center-wrapper"]}>
      <img
        src={require("../../../../../../assets/img/logo/iran-logo.svg").default}
        alt="Example Image"
        width={95}
        height={95}
        className={Style["iran-logo"]}
      />
    </div>
  );
};

export default NavBarCenter;
