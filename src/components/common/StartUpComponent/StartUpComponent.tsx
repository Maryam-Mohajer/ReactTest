import React, { FC, Fragment } from "react";
import { IStartUp } from "../../../core/models/startup.model";
import Style from './StartUpComponent.module.scss'
import img from '../../../assets/img/Startup/1.png'
import logo from '../../../assets/img/logo/1.png'
import {Progress} from 'reactstrap'
import { Copy,Users,Unlock,Lock } from 'react-feather';
import { Link } from "react-router-dom";
interface IPropTypes {
  item:IStartUp;
  changeView:any;
}


const StartUpComponent: FC<IPropTypes> = ({ item,changeView }) => {

  return (
    changeView?
    <section className={`${changeView?Style.ComponentHolder:Style.ComponentHolder2} shadow-sm`}>
        <div className={Style.StartUpImage}>
            <p className={Style.persent}>{`${item.progress}%`}</p>
            <img src={img} alt="" />
            {item.isOpen===1?<Unlock size={'22'} color="#fff" className={Style.fullChecker}/>:<Lock size={'22'} color="#fff" className={Style.fullChecker}/>}
            
        </div>
        <div className={Style.logoStartUpHolder}><img src={logo} alt="" /></div>
        <Progress value={`${item.progress}`} className={Style.ProgressBar}/>
        <Link className={Style.startUpName} to={`/startup/${item.id}`}>{item.title}</Link>
        <p className={Style.describe}>این میز استارت آپ تستی است و فاقد هر گونه اعتبار می باشد.این میز استارت آپ تستی است و فاقد هر گونه اعتبار می باشد</p>
        <div className={Style.formalInfoHolder}>
            <p className={Style.type}> تکنولوژی <Copy size={'20'} style={{marginLeft:'0.3rem'}}/></p>
            <p>  {item.memberCount}/{item.totalPosition} <Users size={'20'} style={{marginLeft:'0.3rem'}}/></p>
        </div>
        <hr className={Style.divider}/>
        <div className={Style.BtnHolder}>
            <a href="/">مشاهده</a>
            <p> میزکار باز می باشد <Unlock size={'20'} style={{marginLeft:'0.3rem'}} color="#00A9FF"/></p>
        </div>
    </section>:
      <section className={`${Style.ComponentHolder2} shadow-sm`}>
        <div className={Style.StartUpImage}>
            <img src={img} alt="" />
        </div>
        <div className={Style.logoStartUpHolder}><img src={logo} alt="" /></div>
        <div className={Style.StartupInfo}>
          <a className={Style.startUpName} href="/">{item.title}</a>
          <p > {item.memberCount}/{item.totalPosition} <Users size={'20'} style={{marginLeft:'0.3rem'}}/></p>
          <div className={Style.ProgeresHandler}>
            <Progress value={`${item.progress}`} className={Style.ProgressBar}/>
            <p className={Style.persent}>{`${item.progress}%`}</p>
            {item.isOpen===1?<Unlock size={'22'} color="#fff" className={Style.fullChecker}/>:<Lock size={'22'} color="#fff" className={Style.fullChecker}/>}
          </div>
        </div>
    </section>

  );
};

export { StartUpComponent };