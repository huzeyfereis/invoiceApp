import React, { useState, useEffect } from 'react';
import { Button, Modal, ConfirmationModal } from '../../atoms';
import { useModal, useConfirmationModal, useUsers, useRefData } from '../../redux/hooks';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card } from 'react-bootstrap';
import * as Yup from 'yup';

const UserModal = (props) => {
  const { data } = props;
  const { modalHeading, modalType } = useModal();
  const {
    isConfirmationOpen,
    confirmationHeading,
    setConfirmationModalClose,
    setConfirmationModalShow
  } = useConfirmationModal();
  const { addUser, updateUser } = useUsers();
  const { branch, getRefData } = useRefData();

  //getBranches
  useEffect(() => {
    branch.length === 0 && getRefData('branch');
  }, [branch, getRefData]);

  //Formik
  const [formik, setFormik] = useState({});
  const initialValues = {
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    email: data.email || '',
    mobilePhone: data.mobilePhone || '',
    branch: data.branch || ''
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format!').required('Required'),
    branch: Yup.string().required('Required')
  });

  const onSubmit = (values) => {
    setFormik(values);
    setConfirmationModalShow({
      confirmationType: modalType,
      confirmationHeading: modalHeading
    });
  };

  const onClick = () => {
    modalType === 'add' ? addUser(formik) : updateUser(data.id, formik);
    setConfirmationModalClose();
  };
  return (
    <>
      <Modal
        body={<ConfirmationModal modalHeading={modalHeading} onClick={onClick} />}
        isOpen={isConfirmationOpen}
        heading={confirmationHeading}
        onHide={setConfirmationModalClose}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => {
          const { isValid, dirty } = props;
          return (
            <Card className="receipt-form p-4">
              <Card.Body>
                <Form>
                  <div className="form-row">
                    <div className="col-md-6 col-sm-12 col-12">
                      <div className="form-group">
                        <div className="form-label" style={{ display: 'flex' }}>
                          <label htmlFor="firstName">First Name</label>
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            style={{ marginLeft: '10px', color: 'red' }}
                          />
                        </div>
                        <Field
                          className="form-control form-control-sm"
                          type="text"
                          placeholder="First name"
                          name="firstName"
                          readOnly={data.status === 'DEPROVISIONED'}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-12 col-12">
                      <div className="form-group">
                        <div style={{ display: 'flex' }}>
                          <label htmlFor="lastName">Last Name</label>
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            style={{ marginLeft: '10px', color: 'red' }}
                          />
                        </div>
                        <Field
                          className="form-control form-control-sm"
                          type="text"
                          placeholder="Last name"
                          name="lastName"
                          readOnly={data.status === 'DEPROVISIONED'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-6 col-sm-12 col-12">
                      <div className="form-group">
                        <div style={{ display: 'flex' }}>
                          <label htmlFor="email">Email</label>
                          <ErrorMessage
                            name="email"
                            component="div"
                            style={{ marginLeft: '10px', color: 'red' }}
                          />
                        </div>
                        <Field
                          className="form-control form-control-sm"
                          type="email"
                          placeholder="Enter email"
                          name="email"
                          readOnly={data.status === 'DEPROVISIONED'}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-12 col-12">
                      <div className="form-group">
                        <div style={{ display: 'flex' }}>
                          <label htmlFor="mobilePhone">Mobile Phone</label>
                          <ErrorMessage
                            name="mobilePhone"
                            component="div"
                            style={{ marginLeft: '10px', color: 'red' }}
                          />
                        </div>
                        <Field
                          className="form-control form-control-sm"
                          type="phone"
                          placeholder="mobilePhone"
                          name="mobilePhone"
                          readOnly={data.status === 'DEPROVISIONED'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-6 col-sm-12 col-12">
                      <div className="form-group">
                        <div style={{ display: 'flex' }}>
                          <label htmlFor="branch">Branch</label>
                          <ErrorMessage
                            name="branch"
                            component="div"
                            style={{ marginLeft: '10px', color: 'red' }}
                          />
                        </div>
                        <Field
                          className="form-control form-control-sm"
                          as="select"
                          type="branch"
                          placeholder="Enter branch"
                          name="branch"
                          readOnly={data.status === 'DEPROVISIONED'}
                        >
                          {initialValues.branch.length > 0 ? (
                            <option
                              value={initialValues.branch}
                              label={initialValues.branch}
                            />
                          ) : (
                            <option value="" label="Select a branch" />
                          )}
                          {branch &&
                            branch
                              .filter((e) => e.deletedAt === null)
                              .map((b) => (
                                <option
                                  disabled={b.id === '0'}
                                  option-id={b.id}
                                  key={b.id}
                                  value={b.name}
                                >
                                  {b.name}
                                </option>
                              ))}
                        </Field>
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <Button
                      text={modalHeading}
                      variant="info"
                      className="ml-auto"
                      type="submit"
                      disabled={!isValid || !dirty}
                    />
                  </div>
                </Form>
              </Card.Body>
            </Card>
          );
        }}
      </Formik>
    </>
  );
};

export default UserModal;
