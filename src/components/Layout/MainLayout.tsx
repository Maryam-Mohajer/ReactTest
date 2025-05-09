import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import React, { ReactNode } from 'react';
interface Props {
  children: ReactNode;
}
const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
