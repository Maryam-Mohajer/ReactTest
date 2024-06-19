import React, { useState, useContext, ReactNode } from "react";

export const refetchContext = React.createContext<any>(null);

export const useRefetchState = () => {
  const pc = useContext(refetchContext);
  if (pc === null) {
    throw new Error("useRefetchState Must be inside of Provider");
  }
  return pc;
};

interface RefetchProviderProps {
  children: ReactNode;
}

const RefetchProvider: React.FC<RefetchProviderProps> = ({ children }) => {
  const [refetchEvent, setRefetchEvent] = useState({
    uploadedDocuments : false,
    neededDocuments : false,
    realUserJobInfoList : false,
    
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
