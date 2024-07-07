import React from 'react';
import UnionAdminRequest from './UnionAdminRequest/UnionAdminRequest';
import { CardWrapper } from 'components/common/Wrapper/CardWrapper/CardWrapper';
import UnionList from './UnionList/UnionList';

const UnionAdminContainer = () => {
  return (
    <>
      <CardWrapper>
        <UnionAdminRequest />
      </CardWrapper>
      <CardWrapper>
        <UnionList />
      </CardWrapper>
    </>
  );
};

export default UnionAdminContainer;
