import React from "react";
import BreadCrumbs from "components/common/@vuexy/breadCrumbs/BreadCrumb";
import { DocumentManagement as DocumentManagementContainer } from "components/BasicInformation/DocumentManagement/DocumentManagement";

const DocumentManagement: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت اسناد"
        breadCrumbParent="اطلاعات اولیه"
        breadCrumbActive="مدیریت اسناد"
      />
      <DocumentManagementContainer />
    </>
  );
};

export default DocumentManagement;
