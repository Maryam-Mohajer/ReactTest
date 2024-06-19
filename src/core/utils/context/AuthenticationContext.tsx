import React, { ReactNode, useContext, useEffect, useState } from "react";
import { FallBackSpinner } from "components/common/Spinner/FallBackSpinner/FallbackSpinner";
import {
  getUser,
  getUserClaims,
} from "core/services/authentication/authentication.service";
import {
  clearStorage,
  getItem,
} from "core/services/common/storage/storage.service";

interface IUserInfo {
  userType?: number;
  userName?: string;
  name?: string;
  family?: string;
  userInfoId?: number;
  authTime?: string;
}

interface IUserClaim {
  value: string;
  type: string;
}

export interface IAuthInfo {
  token: string;
  userClaim: IUserClaim[];
  userInfo: IUserInfo;
  role: string[];
  setUserClaimState: React.Dispatch<React.SetStateAction<IUserClaim[]>>;
  setUserInfoState: React.Dispatch<React.SetStateAction<IUserInfo>>;
  setTokenState: React.Dispatch<React.SetStateAction<string>>;
  setRoleState: React.Dispatch<React.SetStateAction<string[]>>;
  isAuthenticated: () => boolean;
  resetAuthContext: () => void;
  logOut: () => void;
}

export const authContext = React.createContext<IAuthInfo | null>(null);

const initialUserInfoState: IUserInfo = {
  userType: 1,
  userName: "",
  name: "",
  authTime: "",
  family: "",
  userInfoId: 0,
};

const useUserAuth = () => {
  const pc = useContext(authContext);
  if (pc === null) {
    throw new Error("usePermissions Must be inside of Provider");
  }
  return pc;
};

const queryString = require("query-string");
const parsed = queryString.parse(window.location.search);

let token: any;

if (parsed && parsed.isFromSabak) {
  token = "";
} else if (getItem("token") && getItem("token") !== "undefined") {
  token = getItem("token");
} else {
  token = "";
}
const userClaim: any = getUserClaims() ? getUserClaims() : [];

interface AuthenticationProviderProps {
  children: ReactNode;
}


const AuthenticationContext: React.FC<AuthenticationProviderProps> = ({ children }) => {
  const [userInfoState, setUserInfoState] = useState<IUserInfo>({
    userType: 0,
    authTime: "",
    family: "",
    name: "",
    userInfoId: 0,
    userName: "",
  });
  const [tokenState, setTokenState] = useState<string>(token);
  const [userClaimState, setUserClaimState] = useState<IUserClaim[]>(userClaim);
  const [roleState, setRoleState] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const logOut = () => {
    clearStorage();
    setUserInfoState({
      userType: 0,
      authTime: "",
      family: "",
      name: "",
      userInfoId: 0,
      userName: "",
    });
    setTokenState("");
    setUserClaimState([]);
    setRoleState([]);
    window.location.pathname = "/";
  };

  const getData = async () => {
    try {
      const user = await getUser();
      let roles: any =
        getItem("role") && getItem("role") !== "undefined"
          ? getItem("role")
          : JSON.stringify(["UserReal"]);

      if (roles) {
        setRoleState(JSON.parse(roles));
      }

      const userInfo: any =
        getItem("userInfo") &&
        getItem("userInfo") !== "undefined" &&
        getItem("userInfo");
      const myUserInfo: any = JSON.parse(userInfo);

      if (myUserInfo) {
        setUserInfoState({
          userName: myUserInfo?.userName,
          name: myUserInfo?.name,
          family: myUserInfo?.family,
          authTime: user?.profile.auth_time?.toString(),
          userType: +myUserInfo?.userType,
          userInfoId: +myUserInfo?.userInfoId,
        });
      }

      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const isAuthenticated = () => {
    if (!userInfoState.userName || !userInfoState.userType) {
      return false;
    }
    if (token) {
      return true;
    }

    return false;
  };

  const resetAuthContext = () => {
    setUserInfoState(initialUserInfoState);
    setTokenState("");
    setRoleState([""]);
  };

  return (
    <authContext.Provider
      value={{
        token: tokenState,
        userInfo: userInfoState,
        role: roleState,
        userClaim: userClaimState,
        setUserClaimState,
        setUserInfoState,
        setTokenState,
        setRoleState,
        isAuthenticated,
        resetAuthContext,
        logOut,
      }}
    >
      {isLoading ? <FallBackSpinner /> : children}
    </authContext.Provider>
  );
};

export { AuthenticationContext, useUserAuth };
