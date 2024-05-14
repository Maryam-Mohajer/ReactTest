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
      <Button
        color="warning"
        size="sm"
        onClick={() => {
          window.open(`/info/${id}`, '_blank');
        }}
      >
        ویرایش
      </Button>
    </>
  );
};

export default Actions;
