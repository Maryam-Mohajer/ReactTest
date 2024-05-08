import { history } from "browser-history";
import React, { FC } from "react";

interface IPropType {
  datas: any;
  active: number;
}

const RecursionItems: FC<IPropType> = ({ datas, active }) => {
  //Recursion funtion
  const nestedItems = datas.map((data: any, index: number) => {
    return <RecursionItems datas={data.childs} active={active} key={index} />;
  });

  return (
    <div>
      {datas.length > 0 &&
        datas.map((data: any, index: number) => (
          <div key={index} className="mx-2 mb-1">
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
              <span>{data.title}</span>
              {data.childs.length > 0 && (
                <i className="bi bi-caret-left-fill"></i>
              )}
            </div>

            {data.childs.length > 0 && (
              <div className="mt-1">{nestedItems}</div>
            )}
          </div>
        ))}
    </div>
  );
};

export { RecursionItems };
