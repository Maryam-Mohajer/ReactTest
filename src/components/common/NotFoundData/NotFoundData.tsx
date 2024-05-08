import React from "react";
import { Alert } from "reactstrap";

interface IProps {
  color ?: string | undefined ;
}
const NotFoundData: React.FC<IProps> = ({ color }) => {
  return (
    <Alert
      color={color ? color : "info"}
      className="w-100 m-0 text-center my-1"
    >
      موردی یافت نشد
    </Alert>
  );
};

export { NotFoundData };
