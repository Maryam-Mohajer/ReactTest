import React, { FC } from "react";
import { Spinner } from "reactstrap";
import styles from "./OutLineButton.module.scss";
interface IPropsType {
  type?: 'submit' | 'reset' | 'button'
  onClick? : any 
  isLoading?: boolean
  text?: string
}

const OutLineButton : FC<IPropsType> = ({type, onClick, isLoading, text}) => {
  return (
    <button
      type={type ? type : "submit"}
      onClick={onClick ? onClick : null}
      className={styles.signUpButton}
    >
      {text}
      {isLoading && (
        <Spinner className={styles.spinner} color="primary" size="sm" />
      )}
    </button>
  );
};

export default OutLineButton;
