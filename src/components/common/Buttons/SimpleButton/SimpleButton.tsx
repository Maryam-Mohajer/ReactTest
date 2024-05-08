import React from "react";
import { Spinner } from "reactstrap";
import style from "./SimpleButton.module.scss";

interface MyPropTypes {
  text: string;
  color: string;
  onClick?: any;
  isLoading?: boolean;
}

const SimpleButton: React.FC<MyPropTypes> = ({
  text,
  color,
  onClick,
  isLoading,
}) => {
  return (
    <button
      type="button"
      className={`btn ${color} ${style.cover}`}
      onClick={onClick}
    >
      {isLoading && <Spinner color="purple" size="sm" />}

      <span className={style.text}>{text}</span>
    </button>
  );
};

export default SimpleButton;
