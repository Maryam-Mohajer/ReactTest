import React, { CSSProperties, FC } from "react";
import { Spinner } from "reactstrap";
import styles from "./PrimaryButton.module.scss";
interface IPropsType {
  type?: "submit" | "reset" | "button";
  onClick?: any;
  isLoading?: boolean;
  style?: CSSProperties;
  text: string;
  className?: string;
  outline?: boolean;
}

const PrimaryButton: FC<IPropsType> = ({
  type,
  onClick,
  isLoading,
  style,
  text,
  className,
  outline,
}) => {
  return (
    <button
      type={type ? type : "submit"}
      onClick={onClick ? onClick : null}
      className={
        outline
          ? styles.outline + " " + className
          : styles.btn + " " + className
      }
      style={style ? style : {}}
    >
      {text}
      {isLoading && (
        <Spinner
          className={styles.spinner}
          color={outline ? "purple" : "white"}
          size="sm"
        />
      )}
    </button>
  );
};

export default PrimaryButton;
