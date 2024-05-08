import React, { FC } from "react";
import Style from './BootCampSliderPerview.module.scss'
import img from '../../../assets/img/Startup/2.png'
import { IBootCamp } from "../../../core/models/BootCamp.model";
import { Clock, MapPin, User } from "react-feather";

interface IPropTypes {
  item:IBootCamp;
}


const BootCampSliderPerview: FC<IPropTypes> = ({ item }) => {
  return (
    <section className={`${Style.ComponentHolder} shadow-sm`}>
        <div className={Style.InfoHolder}>
            <img src={img} alt="" />
            <div className={Style.TextInfo}>
                <h3>{item.name}</h3>
                <p className={Style.describeBootcamp}>{item.describe}</p>
                <div className={Style.details}>
                    <p><User style={{marginLeft:'0.5rem'}}/> {item.teacher}</p>
                    <p><MapPin style={{marginLeft:'0.5rem'}}/> {item.location}</p>
                    <p><Clock style={{marginLeft:'0.5rem'}}/> {item.time}</p>
                </div>
            </div>
        </div>
    </section>
  );
};

export { BootCampSliderPerview };