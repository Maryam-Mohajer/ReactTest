import React from "react";
import { UserInfo } from "core/models/user-info.model";
import styles from "./UserInfo.module.css";
interface Props {
  userInfo: UserInfo | undefined;
}

export default function UserInfoBox({ userInfo }: Props) {
  return (
    <>
      {userInfo && (
        <div className="d-flex justify-content-between flex-wrap">
          <div className={styles.infoItem}>
            <span>نام : </span>
            <span>{userInfo.firstName}</span>
          </div>
          <div className={styles.infoItem}>
            <span>نام خانوادگی : </span>
            <span>{userInfo.lastName}</span>
          </div>
          <div className={styles.infoItem}>
            <span>شماره شناسنامه : </span>
            <span>{userInfo.birthCertificatId}</span>
          </div>
          <div className={styles.infoItem}>
            <span>کد ملی : </span>
            <span>{userInfo.nationalCode}</span>
          </div>
          <div className={styles.infoItem}>
            <span>شماره موبایل : </span>
            <span>{userInfo.mobileNumber2}</span>
          </div>
          {/* <div className={styles.infoItem}>
                    <span>ثبت کننده : </span>
                    <span></span>
                  </div>

                  <div className={styles.infoItem}>
                    <span>کد پستی : </span>
                    <span></span>
                  </div> */}
        </div>
      )}
    </>
  );
}
