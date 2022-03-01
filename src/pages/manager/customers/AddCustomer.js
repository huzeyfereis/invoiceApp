import React from 'react';
import Customer from './Customer';
import {CUSTOMER_INITIAL_DATA} from './formikData'

const AddCustomer = () => {
  return <Customer customer={CUSTOMER_INITIAL_DATA} description="Add" />;
};

export default AddCustomer;
