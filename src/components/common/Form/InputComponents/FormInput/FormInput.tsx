import React, { useState, useRef, useEffect } from "react";
import styles from "./FormInput.module.scss";
import { Field } from "formik";
interface IPropTypes {
  name: string;
  icon: string;
  label: string;
  value: any;
  withValueIcon: string;
  iconResponsive?: string;
  error?: string;
  touched?: boolean;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}

const FormInput = (props: IPropTypes) => {
  const ref = useRef<HTMLInputElement>();
  const valueLength = useRef<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>();
  const className =
    props.value && props.value.length == 0
      ? styles.fieldContainer
      : `${styles.fieldContainer} ${styles.fieldWhite}`;
  useEffect(() => {
    const handleFocusIn = () => {
      setIsFocused(true);
    };
    const handleFocusOut = (event: any) => {
      if (!event.target.value) {
        setIsFocused(false);
      }
    };

    ref.current?.addEventListener("focusin", handleFocusIn);
    ref.current?.addEventListener("focusout", handleFocusOut);
    return () => {
      ref.current?.removeEventListener("focusin", handleFocusIn);
      ref.current?.removeEventListener("focusout", handleFocusOut);
    };
  }, []);
  useEffect(() => {
    if (props.value && props.value != null && props.value.length)
      setIsFocused(true);
    valueLength.current = props.value ? props.value.length : 0;
  }, [props.value]);
  return (
    <div
      className={styles.fieldHolder}
      onClick={() => {
        setIsFocused(true);
      }}
    >
      <label
        className={isFocused ? styles.activeLabel : styles.label}
        htmlFor={props.name}
      >
        {props.label}
      </label>
      <div className={className}>
        {/* {props.value.length > 0 ? (
          <img
            className={`${styles.fieldIcon}`}
            src={props.withValueIcon}
            alt={`${props.name} field icon`}
          />
        ) : (
          <>
            <img
              className={`${styles.fieldIcon} d-none d-lg-block`}
              src={props.icon}
              alt={`${props.name} field icon`}
            />
            <img
              className={`${styles.fieldIcon} d-block d-lg-none`}
              src={props.iconResponsive}
              alt={`${props.name} field icon`}
            />
          </>
        )} */}
        <Field
          className={styles.field}
          name={props.name}
          // placeholder={props.placeholder}
          type={props.type ? props.type : "text"}
          innerRef={ref}
          disabled={props.disabled}
        />
      </div>
      {props.error && props.touched ? (
        <div className={styles.warning}>{props.error}</div>
      ) : null}
    </div>
  );
};

export default FormInput;
