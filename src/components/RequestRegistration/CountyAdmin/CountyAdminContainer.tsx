import React from 'react';
import AddCountyAdmin from './AddCountyAdmin/AddCountyAdmin';
import { CardWrapper } from 'components/common/Wrapper/CardWrapper/CardWrapper';
import CountyList from './CountyList/CountyList';

const CountyAdminContainer = () => {
  return (
    <div>
      <CardWrapper>
        <AddCountyAdmin />
      </CardWrapper>
      <CardWrapper>
        <CountyList />
      </CardWrapper>
    </div>
  );
};

export default CountyAdminContainer;
