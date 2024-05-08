import React, { FC } from "react";
import Style from './CoursePerviewComponent.module.scss'
import img from '../../../assets/img/Startup/1.png'
import { ICourse } from "../../../core/models/Course.model";
import { CurrencyMask } from "../../../core/utils";
import { Clock, ThumbsUp, User } from "react-feather";
import { SubmitButton } from "../Form";
import { Link } from "react-router-dom";

interface IPropTypes {
  item:ICourse;
}


const CoursePerviewComponent: FC<IPropTypes> = ({ item }) => {
  return (
    <section className={`${Style.ComponentHolder} shadow-sm`}>
        <img src={img} alt="" />
        <a href="/"><h3>{item.name}</h3></a>
        <p className={Style.priceHolder}><span>{CurrencyMask(item.price)}</span>  تومان  </p>
        <div className={Style.CourseTH}>
            <p>{item.teacher} <User size={17}/></p>
            <p>{item.time} <Clock size={17}/></p>
        </div>
        <hr />
        <div className={Style.BtnHolder}>
            <p><span>{item.like}</span> <ThumbsUp size={17}/></p>
            <Link to="/">مشاهده</Link>
        </div>
    </section>
  );
};

export { CoursePerviewComponent };