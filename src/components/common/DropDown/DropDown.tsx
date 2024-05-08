import React, { FC, Fragment } from "react";
import { Link } from "react-router-dom";
import style from "./DropDown.module.scss";

interface IpropType {
  selectorClassName: string;
  DropDownList: any;
}

const DropDown: FC<IpropType> = ({
  children,
  selectorClassName,
  DropDownList,
}) => {
  return (
    <div className="dropdown">
      <div
        className={` dropdown-toggle ${selectorClassName} `}
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {children}
      </div>

      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {DropDownList &&
          DropDownList.map((data: any, index: number) => (
            <Link
              key={index}
              className={`dropdown-item  w-100 position-relative d-flex justify-content-between align-items-center  ${style.main_menu}`}
              to={data.url}
            >
              <span>{data.name}</span>

              {data && data.childs && data.childs.length > 0 && (
                <i className="bi bi-caret-left-fill"></i>
              )}

              {data && data.childs && data.childs.length > 0 && (
                <div className={`${style.menu_style} ${style.intenal_1} `}>
                  {data.childs.map((data: any, key: number) => (
                    <Fragment key={key}>
                      <Link
                        to={data.url}
                        className={`m-0 dropdown-item w-100 position-relative d-flex justify-content-between align-items-center`}
                      >
                        <span>{data.name}</span>
                      </Link>
                    </Fragment>
                  ))}
                </div>
              )}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default DropDown;
