import React, { useEffect } from 'react';
import Customer from './Customer';
import { Spinner } from './../../../atoms';

import { useCustomers } from './../../../redux/hooks';

const CustomerView = (props) => {
  const id = props.match.params.id;

  //Redux Hooks
  const { getCustomer, pending, customer } = useCustomers();

  useEffect(() => {
    getCustomer(id);
  }, [getCustomer, id]);
  return (
    <>
      {pending && !customer.length && (
        <div className="position-absolute" style={{ top: '50%', left: '50%' }}>
          <Spinner animation="grow" />
        </div>
      )}
      {!pending && <Customer description="View" />}
    </>
  );
};

export default CustomerView;
