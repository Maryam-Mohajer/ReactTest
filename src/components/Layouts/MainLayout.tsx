import React, { ReactNode } from 'react';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
interface Props {
  children: ReactNode;
}
const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
