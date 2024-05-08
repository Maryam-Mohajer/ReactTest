import React, { Component, CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Style from './LinkButton.module.scss'


export interface IPropsType {
    to: string,
    label: string
    style?: CSSProperties
}

const LinkButton: React.FC<IPropsType> = ({ to, label, style }) => {
  
  return (
    <Link to={to} className={Style.buttonLink}>
      <div style={style} className={Style.buttonContainer}>{label}</div>
    </Link>
  );
}
 
export { LinkButton }