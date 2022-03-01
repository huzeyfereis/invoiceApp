import React, { useEffect } from 'react';
import Customer from './Customer';
import { Spinner } from './../../../atoms';
import { useCustomers } from './../../../redux/hooks';

const Edit = (props) => {
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
      {!pending && <Customer description="Update" />}
    </>
  );
};

export default Edit;
