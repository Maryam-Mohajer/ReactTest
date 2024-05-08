import React from "react";
import { Link } from "react-router-dom";
import styles from "./ArticleButton.module.scss";
interface IPropsType {
  text: string;
  linkTo: string;
}

const ArticleButton = (props: IPropsType) => {
  return (
    <div className={styles.btn}>
      <Link className={styles.btnLink} to={props.linkTo}>
        {props.text}
      </Link>
    </div>
  );
};

export default ArticleButton;
