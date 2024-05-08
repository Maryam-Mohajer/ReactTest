import React from "react";
import { Button } from "reactstrap";
import Style from './Style.module.scss'

export interface IPropsType {
  text: string;
  size?: string;
  onClick: any;
}

const ColoredButton: React.FC<IPropsType> = ({
  text,
  size,
  onClick,
}) => {
  return (
    <Button
      style={{ margin: "3px" }}
      className={Style.buttonStyle}
      size={size ? size : "sm"}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export { ColoredButton };
