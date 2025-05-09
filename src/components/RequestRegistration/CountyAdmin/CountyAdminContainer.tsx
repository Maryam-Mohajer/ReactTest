import React from 'react';
import CountyAdminRequest from './CountyAdminRequest/CountyAdminRequest';
import { CardWrapper } from 'components/common/Wrapper/CardWrapper/CardWrapper';
import CountyList from './CountyList/CountyList';

const CountyAdminContainer = () => {
  return (
    <>
      <CardWrapper>
        <CountyAdminRequest />
      </CardWrapper>
      <CardWrapper>
        <CountyList />
      </CardWrapper>
    </>
  );
};

export default CountyAdminContainer;
