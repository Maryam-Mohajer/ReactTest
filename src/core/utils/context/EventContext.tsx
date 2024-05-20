import React, { useState, useContext } from "react";

export const refetchContext = React.createContext<any>(null);

export const useRefetchState = () => {
  const pc = useContext(refetchContext);
  if (pc === null) {
    throw new Error("useRefetchState Must be inside of Provider");
  }
  return pc;
};

const RefetchProvider: React.FC = ({ children }) => {
  const [refetchEvent, setRefetchEvent] = useState({
    uploadedDocuments : false,
    neededDocuments : false,
    realUserJobInfoList : false,
    usersList:false,
    
  }); 


  return (
    <refetchContext.Provider
      value={{
        refetchEvent,
        setRefetchEvent: (val: any) => {
          setRefetchEvent(val);
        },
      }}
    >
      {children}
    </refetchContext.Provider>
  );
};

export { RefetchProvider };
