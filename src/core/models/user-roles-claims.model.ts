export type Claim = {
  claimType: string;
  cliameValue: string;
  cliameValueTitle: string;
  attribute: string;
  description: string;
};

export type Role = {
  value: string;
  description: string;
};

export type UserRolesClaims = {
  claims: Claim[];
  fName: string;
  lName: string;
  mobileNumber: string;
  nationalCode: string;
  roles: Role[];
};
