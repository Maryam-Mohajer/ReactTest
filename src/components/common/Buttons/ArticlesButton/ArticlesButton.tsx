import React from "react";
import styles from "./ArticlesButton.module.scss";
import { Link } from "react-router-dom";
interface IPropTypes {
  text: string;
  linkTo: string;
}

const ArticlesButton = (props: IPropTypes) => {
  return (
    <div className={styles.btn}>
      <Link className={styles.link} to={props.linkTo}>
        {props.text}
      </Link>
    </div>
  );
};

export default ArticlesButton;
