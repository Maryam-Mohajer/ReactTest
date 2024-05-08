export interface ITaAvoniLocationData {
  id: number;
  cityOrVilageId: number;
  address: string;
  postalCode: string;
  lat: number;
  lng: number;
}
export interface ITaAvoniBankData {
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
export interface ITaAvoniBasicData {
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
  countyId: number;
}
export interface ITaAvoniContactData {
  id: number;
  phoneNumber: string;
  phoneNumber2: string;
  fax: string;
  fax2: string;
  email: string;
  webSite: string;
}
