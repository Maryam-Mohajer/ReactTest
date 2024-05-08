export interface IFactoryBasicData {
  id: number;
  title: string;
  managerUserName: string;
  phoneNumber: string;
  phoneNumber2: string;
  fax: string;
  fax2: string;
  email: string;
  webSite: string;
  cityOrVilageId: number;
  address: string;
  postalCode: string;
  lat: number;
  lng: number;
  nationalId: string;
  economicCode: string;
  bankInfos: [
    {
      bankShabaNumber: string;
      bankAcountNumber: string;
      bankName: string;
      bankBranchName: string;
      bankBranchCode: string;
    }
  ];
  unionId: number;
  factoryType: 1;
  licenseNumber: string;
  licenseExpirationDateTimeAsShamsi: string;
}

export interface IFactoryContactData {
  id: number;
  phoneNumber: string;
  phoneNumber2: string;
  fax: string;
  fax2: string;
  email: string;
  webSite: string;
}

export interface IFactoryLocationData {
  id: number;
  cityOrVilageId: number;
  address: string;
  postalCode: string;
  lat: number;
  lng: number;
}
export interface IFactoryBankData {
  parentId: number;
  items: [
    {
      bankShabaNumber: string;
      bankAcountNumber: string;
      bankName: string;
      bankBranchName: string;
      bankBranchCode: string;
    }
  ];
}
