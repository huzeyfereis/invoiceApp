import React from 'react';
import Button from './Button';

const RenderAddress = ({ addresses = [], onClick = undefined }) => {
  return (
    <div>
      <Button
        variant="link"
        size="sm"
        onClick={onClick}
        text={addresses[0].postCode}
      ></Button>
    </div>
  );
};

export default RenderAddress;
