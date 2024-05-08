import { history } from "browser-history";
import React, { FC, useEffect, useRef, useState } from "react";
import { Alert } from "reactstrap";
import { FallBackSpinner } from "../Spinner/FallBackSpinner/FallbackSpinner";
import style from "./DropDownMenu.module.scss";
import { RecursionItems } from "./RecursionItems/RecursionItems";

interface IPropType {
  selectorClassName?: string;
  DropDownList: any;
  mutateAsync: any;
}

const DropDownMenu: FC<IPropType> = ({
  children,
  selectorClassName,
  DropDownList,
  mutateAsync,
}) => {
  //dropDownToggle
  const [datas, setDatas] = useState<any>([]);
  const [show, setShow] = useState<boolean>(false);
  const [active, setActive] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //ref
  const showerBtnRef = useRef<any>();

  useEffect(() => {
    setIsLoading(true);

    const getter = async () => {
      for (let i = 1; i <= 5; i++) {
        const res = await mutateAsync(i);
        datas.splice(i - 1, 0, res.data.result);
      }
      setIsLoading(false);
    };

    getter();
  }, []);

  //closer menu
  useEffect(() => {
    const closerMenu = (event: any) => {
      if (event.path[0] !== showerBtnRef.current) {
        setShow(false);
      }
    };

    document.body.addEventListener("click", closerMenu);

    return () => document.removeEventListener("click", closerMenu);
  }, []);

  return (
    <>
      <div
        ref={showerBtnRef}
        className={selectorClassName}
        onClick={() => {
          setShow(!show);
        }}
      >
        {children}
      </div>

      {show && (
        <div
          className={`shadow-lg d-flex justify-content-between ${style.cover_menu}`}
        >
          <div className={style.right_part}>
            {DropDownList &&
              DropDownList.map((data: any, index: number) => (
                <div
                  key={index}
                  className={`d-flex align-items-center w-100
                    ${active === data.value ? style.active_link : ""}`}
                  onClick={() => {
                    history.push({
                      pathname: `/ProductLanding/${data.value}`,
                      state: {
                        titleForPage: data.name,
                        feedProductionType: data.value,
                        productId: null,
                      },
                    });
                  }}
                  onMouseEnter={() => setActive(data.value)}
                >
                  <i
                    className="bi bi-check-circle mx-1"
                    style={{ fontSize: "17px" }}
                  ></i>

                  <p className="py-1 px-0 m-0 ">
                    <span>{data.name}</span>
                  </p>
                </div>
              ))}
          </div>

          <div className={`p-1 ${style.left_part}`}>
            <>
              <h4 className=" border-bottom border-2 pb-1 font-weight-bold">
                همه ی محصولات این دسته :
              </h4>

              {isLoading ? (
                <div className="position-relative">
                  <FallBackSpinner
                    loadingStyle={{ top: "50%" }}
                    setHeight={200}
                  />
                </div>
              ) : datas && datas[active - 1].length > 0 ? (
                datas[active - 1].map((data: any, index: number) => (
                  <div className="d-flex pt-1" key={index}>
                    <div
                      onClick={() => {
                        history.push({
                          pathname: `/ProductLanding/${active}`,
                          state: {
                            titleForPage: data.title,
                            feedProductionType: null,
                            productId: data.id,
                          },
                        });
                      }}
                    >
                      <i className="bi bi-check-square mx-1"></i>
                      <strong>{data.title}</strong>

                      {data.childs.length > 0 && (
                        <i className="bi bi-caret-left-fill"></i>
                      )}
                    </div>

                    {data.childs.length > 0 && (
                      <RecursionItems datas={data.childs} active={active} />
                    )}
                  </div>
                ))
              ) : (
                <Alert color="info" className="w-50 mx-auto mt-5 text-center">
                  موردی یافت نشد!
                </Alert>
              )}
            </>
          </div>
        </div>
      )}
    </>
  );
};

export { DropDownMenu };
