export interface ISetRealIdentityInfo {
  name: string;
  lastName: string;
  gender: number;
  idNumber: string;
  fathersName: string;
  birthDate: string;
  idIssuePlace: string;
  maritalStatus: number;
  countOfBoyChilds: number;
  countOfGirlChilds: number;
  dutySystemState: number;
  dutyEndCartNumber: string;
  dutyEndCartDate: string | null;
  educationLevel: number;
  educationFiledEnum: number;
  relationToAgriculture: boolean;
  accademyId: number;
}

export interface ISetRealIdentityInfoUnionExpert {
  name: string;
  lastName: string;
  gender: number;
  idNumber: string;
  fathersName: string;
  birthDate: string;
  idIssuePlace: string;
  maritalStatus: number;
  countOfBoyChilds: number;
  countOfGirlChilds: number;
  dutySystemState: number;
  dutyEndCartNumber: string;
  dutyEndCartDate: string | null;
  educationLevel: number;
  educationFiledEnum: number;
  relationToAgriculture: boolean;
  accademyId: number;
  nationalCodeSerial : string;
  // expertEngineeringSystemNumber: string;
  // employmentLicenseNumber: string;
}

export interface ISetLegalIdentityInfo {
  name: string;
  nationalId: string;
  companyType: number;
  economicCode: string;
  registrationNumber: string;
  companyRegistrationDate: string;
  // companyRegistrationPlace: string;
  companyRegistrationPlaceCountyId : number;
  chiefExecutiveNationalCode: string;
  chiefExecutiveFirstName: string;
  chiefExecutiveLastName: string;
}
