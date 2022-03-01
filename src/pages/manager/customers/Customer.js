import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Col, Row, Card, Badge } from 'react-bootstrap';
import { Input, Button, Modal, ConfirmationModal } from '../../../atoms';
import Address from './Address';
import Phone from './Phones';
import { useFormik } from 'formik';
import './Customer.css';
import { useCustomers, useConfirmationModal } from './../../../redux/hooks';
import {
  validate,
  CUSTOMER_INITIAL_DATA,
  ADDR_INITIAL_DATA,
  PHONE_INITIAL_DATA
} from './formikData';

const Customer = ({ description }) => {
  const history = useHistory();
  //Redux Hooks
  const {
    deleteCustomer,
    addCustomer,
    updateCustomer,
    customer,
    error,
    pending
  } = useCustomers();
  const {
    isConfirmationOpen,
    confirmationHeading,
    confirmationType,
    setConfirmationModalClose,
    setConfirmationModalShow
  } = useConfirmationModal();

  const formikData = {
    address: customer.address,
    phones: customer.phones,
    email: customer.email,
    firstName: customer.firstName,
    lastName: customer.lastName,
    isIndividual: customer.isIndividual
  };
  //formik library Hook
  const formik = useFormik({
    initialValues:
      (Object.keys(formikData).length > 0 &&
        (description === 'View' || description === 'Update') &&
        !pending &&
        formikData) ||
      CUSTOMER_INITIAL_DATA,
    validateOnMount: true,
    enableReinitialize: description === 'Update' || description === 'View',
    validate
  });

  // Check error state and notify
  useEffect(() => {
    if (error.msg === 'Unauthorized' && error.status === 401) {
      window.location.reload(true);
    }
  }, [error]);

  const handleShow = (type) => (e) => {
    e.preventDefault();
    setConfirmationModalShow({
      confirmationHeading: `${type} Customer`,
      confirmationType: type
    });
  };

  const handleGoHome = () => {
    history.goBack();
  };

  const handleAddAddress = () => {
    const address = formik.values.address;
    address[address.length] = ADDR_INITIAL_DATA;
    formik.setFieldValue();
  };

  const handleAddPhone = () => {
    const phones = formik.values.phones;
    phones[phones.length] = PHONE_INITIAL_DATA;
    formik.setFieldValue();
  };

  const handleDeleteAddress = (i) => {
    const address = formik.values.address;
    address.splice(i, 1);
    formik.setFieldValue();
  };

  const handleDeletePhone = (i) => {
    const phones = formik.values.phones;
    phones.splice(i, 1);
    formik.setFieldValue();
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    addCustomer(formik.values);
    !error && formik.resetForm();
  };

  const handleUpdateCustomer = (id) => async (e) => {
    e.preventDefault();
    updateCustomer(id, formik.values);
  };

  const handleDeleteCustomer = (id) => async (e) => {
    e.preventDefault();
    deleteCustomer(id);
    history.goBack();
  };

  const onClick = (e) => {
    confirmationType === 'Add'
      ? handleAddCustomer(e)
      : confirmationType === 'Update'
      ? handleUpdateCustomer(customer.id)(e)
      : handleDeleteCustomer(customer.id)(e);
    setConfirmationModalClose();
  };
  return (
    <React.Fragment>
      <Modal
        body={<ConfirmationModal modalHeading={confirmationHeading} onClick={onClick} />}
        isOpen={isConfirmationOpen}
        heading={confirmationHeading}
        onHide={setConfirmationModalClose}
      />

      <Card className="customer-form px-5 py-2 mb-5 mx-auto">
        {customer?.deletedAt && description !== 'Add' && (
          <Badge className="customer-deleted-label" variant="danger">
            Deleted Customer
          </Badge>
        )}
        <Card.Body>
          <Row className="d-flex justify-content-between align-items-center mb-5">
            <Card.Title>{description} Customer Page</Card.Title>

            <Row className="d-flex justify-content-between flex-nowrap">
              <Button
                variant="primary"
                className="flex-grow-1 mr-1"
                onClick={handleGoHome}
                text="Go Home"
                size="sm"
                id={'customer-gohome-button'}
              />
              {(description === 'Update' || description === 'View') &&
                !customer?.deletedAt && (
                  <Button
                    variant="danger"
                    text="Delete"
                    onClick={handleShow('Delete')}
                    className="px-3 mr-1"
                    size="sm"
                    id={'customer-delete-button'}
                  />
                )}

              {description === 'View' && (
                <Button
                  className="flex-grow-1 mr-1 px-4"
                  variant="warning"
                  text="Edit"
                  size="sm"
                  id={'customer-edit-button'}
                  onClick={() =>
                    history.push({ pathname: `/manager/customers/${customer.id}/edit` })
                  }
                />
              )}
            </Row>
          </Row>
          <hr />
          <Form>
            <Form.Row>
              <Col xs={12} sm={6} md={6}>
                <Input
                  label="First Name"
                  id="firstName"
                  size="sm"
                  type="text"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="firstName"
                  onClick={() => formik.setFieldTouched('firstName')}
                  readOnly={description === 'View'}
                  autoComplete="off"
                  className={''}
                  error={
                    formik.touched.firstName && formik.errors.firstName ? (
                      <span className="text-danger small font-weight-bold">
                        {formik.errors.firstName}
                      </span>
                    ) : null
                  }
                />
                <Input
                  label="Last Name"
                  id="lastName"
                  size="sm"
                  type="text"
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onClick={() => formik.setFieldTouched('lastName')}
                  name="lastName"
                  readOnly={description === 'View'}
                  autoComplete="off"
                  error={
                    formik.touched.lastName && formik.errors.lastName ? (
                      <span className="text-danger small font-weight-bold">
                        {formik.errors.lastName}
                      </span>
                    ) : null
                  }
                ></Input>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} sm={12} md={6}>
                <Input
                  id="email"
                  label="Email"
                  size="sm"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  name="email"
                  readOnly={description === 'View'}
                  autoComplete="off"
                  error={
                    formik.errors.email ? (
                      <span className="text-danger small font-weight-bold">
                        {formik.errors.email}
                      </span>
                    ) : null
                  }
                ></Input>
              </Col>
            </Form.Row>

            <hr />
            <Form.Label>
              <strong>Addresses</strong>
            </Form.Label>
            {formik.values.address?.length > 0 ? (
              formik.values.address?.map((address, i) => (
                <div key={i}>
                  <Address
                    handleOnChange={formik.handleChange}
                    handleDeleteAddress={handleDeleteAddress}
                    address={address}
                    i={i}
                    description={description}
                  />
                  <hr />
                </div>
              ))
            ) : (
              <p>There is no address for this customer.</p>
            )}
            <Button
              variant="secondary"
              text="Add New Address"
              onClick={handleAddAddress}
              size="sm"
              className={description === 'View' && 'd-none'}
              id={'customer-add-adress-button'}
            />
            {/* //////////////////////////Start Phones */}
            <hr />
            <Form.Label>
              <strong>Phones</strong>
            </Form.Label>
            {formik.values.phones?.length > 0 ? (
              formik.values.phones?.map((phone, i) => (
                <div key={i}>
                  <Phone
                    handleOnChange={formik.setFieldValue}
                    handleDeletePhone={handleDeletePhone}
                    phone={phone}
                    description={description}
                    i={i}
                  />
                  <hr />
                </div>
              ))
            ) : (
              <p>There is no phone number for this customer.</p>
            )}
            <Button
              variant="secondary"
              text="Add New Phone"
              onClick={handleAddPhone}
              size="sm"
              id={'customer-add-phone-button'}
              className={description === 'View' && 'd-none'}
            />
            {/* ////////////////////////// End Phones */}
            <hr />
            <Form.Row>
              <div className="custom-control custom-checkbox mb-3">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="isIndividual"
                  name="isIndividual"
                  onChange={formik.handleChange}
                  checked={formik.values.isIndividual}
                  disabled={description === 'View'}
                />
                <label className="custom-control-label" htmlFor="isIndividual">
                  Is Individual?
                </label>
              </div>
            </Form.Row>

            <Button
              variant="info"
              text={
                description === 'Update' || description === 'View'
                  ? 'Update Customer'
                  : 'Add Customer'
              }
              onClick={
                description === 'Update' ? handleShow('Update') : handleShow('Add')
              }
              color="white"
              type="submit"
              className={` float-right ${description === 'View' && 'd-none'}`}
              disabled={!formik.isValid || !formik.dirty}
              id={'customer-update-add-button'}
            />
          </Form>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default Customer;
