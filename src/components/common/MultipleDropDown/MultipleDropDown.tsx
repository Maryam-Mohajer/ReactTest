import React, { FC, Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllNodeProductsWithChilds } from "core/services/api/ProductLanding.api";
import style from "./MultipleDropDown.module.scss";

interface IpropType {
  selectorClassName: string;
  DropDownList: any;
}

const MultipleDropDown: FC<IpropType> = ({
  children,
  selectorClassName,
  DropDownList,
}) => {
  //data
  const [MainData, setMainData] = useState<any>([]);

  //api
  const { mutate, data, isLoading, isSuccess } =
    useGetAllNodeProductsWithChilds();

  useEffect(() => {
    if (data?.data.result) {
      const result = data.data.result;
      setMainData(result);
    }
  }, [isSuccess]);

  //handelCallApi
  const handelCallApi = (value: any) => {
    setMainData([]);
    mutate(value);
  };

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
              className={`dropdown-item position-relative d-flex justify-content-between align-items-center ${style.main_menu}`}
              to={data.url ? data.url : ""}
              onMouseEnter={
                data.value ? () => handelCallApi(data.value) : undefined
              }
            >
              <span>{data.name}</span>

              {/* {data.children.length>0 && (

               <i className={`bi ${isloading ? "bi-arrow-repeat" : "bi-caret-left-fill"} ${style.left_icon}`}></i> 
              )} */}

              {/* 1 */}
              {MainData.length > 0 && (
                <div className={` ${style.internal_menu} ${style.menu_style}`}>
                  {MainData.map((data: any, index: number) => (
                    <Fragment key={index}>
                      <div
                        className={`m-0 dropdown-item w-100 position-relative d-flex justify-content-between align-items-center ${style.first_internall_menu}`}
                      >
                        <span>{data.title}</span>
                        {data.childs.length > 0 && (
                          <i className="bi bi-caret-left-fill"></i>
                        )}
                        {/* 2 */}

                        {data.childs.length > 0 && (
                          <div
                            className={`${style.intenal_menu_2} ${style.menu_style}`}
                          >
                            {data.childs.map((data: any, key: number) => (
                              <Fragment key={key}>
                                <div
                                  className={`m-0 dropdown-item w-100 position-relative d-flex justify-content-between align-items-center ${style.second_internall_menu}`}
                                >
                                  <span>{data.title}</span>
                                  {data.childs.length > 0 && (
                                    <i className="bi bi-caret-left-fill"></i>
                                  )}

                                  {/* 3 */}
                                  {data.childs.length > 0 && (
                                    <div
                                      className={`${style.intenal_menu_3} ${style.menu_style}`}
                                    >
                                      {data.childs.map(
                                        (data: any, key: number) => (
                                          <Fragment key={key}>
                                            <div
                                              className={`m-0 dropdown-item w-100 position-relative d-flex justify-content-between align-items-center ${style.third_internall_menu}`}
                                            >
                                              <span>{data.title}</span>
                                              {data.childs.length > 0 && (
                                                <i className="bi bi-caret-left-fill"></i>
                                              )}

                                              {/* 4 */}
                                              {data.childs.length > 0 && (
                                                <div
                                                  className={`${style.intenal_menu_4} ${style.menu_style}`}
                                                >
                                                  {data.childs.map(
                                                    (
                                                      data: any,
                                                      key: number
                                                    ) => (
                                                      <Fragment key={key}>
                                                        <div
                                                          className={`m-0 dropdown-item w-100 position-relative d-flex justify-content-between align-items-center ${style.third_internall_menu}`}
                                                        >
                                                          <span>
                                                            {data.title}
                                                          </span>
                                                          {data.childs.length >
                                                            0 && (
                                                            <i className="bi bi-caret-left-fill"></i>
                                                          )}
                                                        </div>
                                                      </Fragment>
                                                    )
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                          </Fragment>
                                        )
                                      )}
                                    </div>
                                  )}
                                </div>
                              </Fragment>
                            ))}
                          </div>
                        )}
                      </div>
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

export { MultipleDropDown };
