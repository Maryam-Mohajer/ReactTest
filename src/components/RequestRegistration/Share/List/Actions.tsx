import React from 'react';
import { Button } from 'reactstrap';

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      original: any;
    };
  };
}
const Actions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      original,
    },
  },
}) => {
  return (
    <>
      <Button size="sm" color={'warning'} onClick={() => {}}>
        ویرایش
      </Button>
      <Button size="sm" color="danger" style={{ marginRight: '0.75rem' }} onClick={() => {}}>
        حذف
      </Button>
    </>
  );
};

export default Actions;
