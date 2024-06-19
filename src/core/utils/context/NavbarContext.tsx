import React, { useState, useContext, ReactNode } from 'react';

export const NavbarMenu = React.createContext<any>(null);

export const useNavbarMenu = () => {
  const pc = useContext(NavbarMenu);
  if (pc === null) {
    throw new Error('useRefetchState Must be inside of Provider');
  }
  return pc;
};

interface ProfileProviderProps {
  children: ReactNode;
}

const NavbarMenuProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <NavbarMenu.Provider
      value={{
        isOpen,
        setIsOpen: (val: any) => {
          setIsOpen(val);
        },
      }}
    >
      {children}
    </NavbarMenu.Provider>
  );
};

export { NavbarMenuProvider };
