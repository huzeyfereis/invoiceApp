import React, { useEffect } from 'react';
import { Form, Col, Row, Card } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useFormik } from 'formik';
import {
  useCustomers,
  useModal,
  useReceipts,
  useRefData,
  useAuth,
  useUsers,
  useConfirmationModal
} from './../../../redux/hooks';
import { RECEIPT_INITIAL_DATA, validate } from './formikData';
import Autocomplete from './Autocomplete';
import { Input, Modal, Button, ConfirmationModal } from '../../../atoms';
import './Receipt.css';
import 'react-datepicker/dist/react-datepicker.css';

const Receipt = (props) => {
    const { id, description, handleShow } = props
  //Redux Hooks
  const { customers, error } = useCustomers();
  const { id: userId, name: userName, currentBranch, groups } = useAuth();
  const {
    addReceipt,
    getReceipt,
    updateReceipt,
    receipt,
    pending,
    error: receiptError
  } = useReceipts();
  const { modalHeading, modalType } = useModal();
  const { isConfirmationOpen, setConfirmationModalClose, setConfirmationModalShow } = useConfirmationModal()
  const { branch, paymentReason, paymentType, getRefData } = useRefData();
  const { users, getUsers } = useUsers()
  const receivedBy = users
  const curBranch = branch && branch.filter(b => b.name === currentBranch)

  useEffect(() => {
    if(id) getReceipt(id);
  }, [getReceipt, id]);
  const formikData = {
    customer: receipt.customer,
    receivedBy: receipt.receivedBy,
    branch: receipt.branch,
    amount: receipt.amount,
    amountInLetters: receipt.amountInLetters,
    paymentType: receipt.paymentType,
    paymentReason: receipt.paymentReason,
    details: receipt.details,
    date: new Date(receipt.date)
  };
  //formik library Hook
  const formik = useFormik({
    initialValues:
    ((description === 'View' || description === 'Update') &&
    !pending && receipt.customer &&
    formikData) ||
    RECEIPT_INITIAL_DATA,
    validateOnMount: true,
    enableReinitialize: description === 'Update' || description === 'View',
    validate: description === 'View' ? () => {} : validate
  });

  // Check error state and notify
  useEffect(() => {
    if (error.msg === 'Unauthorized' && error.status === 401) {
      window.location.reload(true);
    }
  }, [error]);

  useEffect(() => {
    if (!id && curBranch.length > 0) {
      RECEIPT_INITIAL_DATA.receivedBy.id = userId;
      RECEIPT_INITIAL_DATA.receivedBy.name = userName;
      RECEIPT_INITIAL_DATA.branch.id = curBranch[0].id;
      RECEIPT_INITIAL_DATA.branch.name = curBranch[0].name
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curBranch]);

  useEffect(() => {
    !paymentReason.length && getRefData('branch');
    !paymentReason.length && getRefData('paymentReason');
    !paymentType.length && getRefData('paymentType');
    !receivedBy.length && getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRefData, getUsers]);

  const handleAddReceipt = () => {
    addReceipt(formik.values);
    !Object.keys(receiptError).length && formik.resetForm();
    setConfirmationModalClose()
  };

  const handleUpdateReceipt = (id, values) => {
    updateReceipt(id, values);
    setConfirmationModalClose()
  };
  
  const onClick = () => {
    (modalType === 'Add') ? handleAddReceipt(formik.values) : handleUpdateReceipt(receipt.id, formik.values)    
  }
  return (
    <React.Fragment>
      <Modal
        body={<ConfirmationModal modalHeading={modalHeading} onClick={onClick} />}
        isOpen={isConfirmationOpen}
        heading={modalHeading}
        onHide={setConfirmationModalClose}
      />

      <Card className="receipt-form p-4">
        <Card.Body>
          <Row className="d-flex justify-content-end align-items-center mb-1">
            <div>
              {description === 'View' && (
                <Button
                  className="flex-grow-1 mr-1 px-4"
                  variant="warning"
                  text="Edit"
                  size="sm"
                  id={`receipt-${description}-button`}
                  onClick= {() => handleShow('Update', id)}
                />
              )}
            </div>
          </Row>
          <Form>
            <Form.Row>
              <Col xs={12} sm={12} md={12}>
                <Autocomplete
                  selections={customers}
                  formikOnchange={formik.setFieldValue}
                  formikError={formik.errors.customer}
                  formikTouched={formik.touched.customer}
                  formikSetFieldTouched={formik.setFieldTouched}
                  value={
                    (description === 'View' || description === 'Update') &&
                    receipt.customer
                  }
                  description={description}
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} sm={12} md={6}>
                <Input
                  as="select"
                  label="Received By"
                  id={`receivedBy-${description}`}
                  size="sm"
                  type="text"
                  onBlur={formik.handleBlur}
                  value={formik.values.receivedBy.name }
                  onChange={(e) => {
                    formik.setFieldValue('receivedBy', {
                      id: e.target.options[e.target.options.selectedIndex].getAttribute(
                        'option-id'
                      ),
                      name: e.target.value
                    });
                  }}
                  onClick={() => formik.setFieldTouched('receivedBy')}
                  name="receivedBy"
                  readOnly={description === 'View'}
                  autoComplete="off"
                  error={
                    formik.touched.receivedBy && formik.errors.receivedBy ? (
                      <span className="text-danger small font-weight-bold">
                        {formik.errors.receivedBy}
                      </span>
                    ) : null
                  }
                >
                  {receivedBy.filter(e => e.status !== 'DEPROVISIONED').map((b) => (
                    <option disabled={b.id === '0'} option-id={b.id} key={b.id}>
                      {`${b.firstName} ${b.lastName}`}
                    </option>
                  ))}
                </Input>
              </Col>
              <Col xs={12} sm={12} md={6}>
                <Input
                  as="select"
                  label="Branch"
                  id={`branch-${description}`}
                  size="sm"
                  type="text"
                  onChange={(e) => {
                    if(!groups.includes('Admin')) return
                    formik.setFieldValue('branch', {
                      id: e.target.options[e.target.options.selectedIndex].getAttribute(
                        'option-id'
                      ),
                      name: e.target.value
                    });
                  }}
                  onClick={() => formik.setFieldTouched('branch')}
                  onBlur={formik.handleBlur}
                  value={formik.values.branch ? formik.values.branch.name : currentBranch}                  
                  name="branch"
                  readOnly={!groups.includes('Admin') && true}
                  autoComplete="off"     
                  error={
                    formik.touched.branch && formik.errors.branch ? (
                      <span className="text-danger small font-weight-bold">
                        {formik.errors.branch}
                      </span>
                    ) : null
                  }             
                >
                  
                    {!groups.includes('Admin') && formik.values.branch.length === 0 ? (<option value="" label="Select payment type" />) : (<option value={formik.values.branch.name} label={formik.values.branch.name} />)  }
                  {groups.includes('Admin') && branch.filter(e => e.deletedAt === null).map((b) => (
                    <option disabled={b.id === '0'} option-id={b.id} key={b.id}>
                      {b.name}
                    </option>
                  ))}
                </Input>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col xs={12} sm={12} md={6}>
                <Input
                  inputTextLeft="£"
                  label="Amount"
                  id={`amount-${description}`}
                  size="sm"
                  type="text"
                  onBlur={formik.handleBlur}
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  onClick={() => formik.setFieldTouched('amount')}
                  name="amount"
                  readOnly={description === 'View'}
                  autoComplete="off"
                  error={
                    formik.touched.amount && formik.errors.amount ? (
                      <span className="text-danger small font-weight-bold">
                        {formik.errors.amount}
                      </span>
                    ) : null
                  }
                ></Input>
              </Col>
              <Col xs={12} sm={12} md={6}>
                <Input
                  label="Amount In Letters"
                  id={`amountInLetters-${description}`}
                  size="sm"
                  type="text"
                  onBlur={formik.handleBlur}
                  value={formik.values.amountInLetters}
                  onChange={formik.handleChange}
                  onClick={() => formik.setFieldTouched('amountInLetters')}
                  name="amountInLetters"
                  readOnly={description === 'View'}
                  autoComplete="off"
                  error={
                    formik.touched.amountInLetters && formik.errors.amountInLetters ? (
                      <span className="text-danger small font-weight-bold">
                        {formik.errors.amountInLetters}
                      </span>
                    ) : null
                  }
                ></Input>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} sm={12} md={6}>
                <Input
                  as="select"
                  label="Payment Type"
                  id={`paymentType-${description}`}
                  size="sm"
                  type="text"
                  onBlur={formik.handleBlur}
                  defaultValue= 'Other'
                  value= {formik.values.paymentType.id !== '5f1842f3c17d552d24cf5941'
                  ? formik.values.paymentType.name
                  : 'Others'}
                  onChange={(e) => {
                    formik.setFieldValue('paymentType', {
                      id: e.target.options[e.target.options.selectedIndex].getAttribute(
                        'option-id'
                      ),
                      name: e.target.value
                    });
                  }}
                  onClick={() => formik.setFieldTouched('paymentType')}
                  name="paymentType"
                  readOnly={description === 'View'}
                  autoComplete="off"
                  error={
                    formik.touched.paymentType && formik.errors.paymentType ? (
                      <span className="text-danger small font-weight-bold">
                        {formik.errors.paymentType}
                      </span>
                    ) : null
                  }
                >                  
                  {formik.values.paymentType.length > 0 ? (<option value={formik.values.paymentType.name} label={formik.values.paymentType.name} />) : (<option value="" label="Select payment type" />) }
                  {paymentType.filter(e => e.deletedAt === null).map((b) => (
                    <option disabled={b.id === '0'} option-id={b.id} key={b.id}>
                      {b.name}
                    </option>
                  ))}
                </Input>
                <input
                 id={`paymentType-other-${description}`}
                 className={
                   formik.values.paymentType.id !== '5f1842f3c17d552d24cf5941'
                     ? 'd-none'
                     : 'd-block othersInput'
                 }
                 type="text"
                 value={
                  formik.values.paymentType.id === '5f1842f3c17d552d24cf5941'
                    ? formik.values.paymentType.name
                    : ''
                }
                onChange={formik.handleChange}
                name={`paymentType.name`}
                readOnly={description === 'View'}
                autoComplete="off"
                autoFocus= {true}
                ></input>
              </Col>
              <Col xs={12} sm={12} md={6}>
                <Input
                  as="select"
                  label="Payment Reason"
                  id={`paymentReason-${description}`}
                  size="sm"
                  type="text"
                  onBlur={formik.handleBlur}
                  value={formik.values.paymentReason.id !== '5f1842bdc17d552d24cf5940'
                  ? formik.values.paymentReason.name
                  : 'Others'}
                  onChange={(e) => {
                    formik.setFieldValue('paymentReason', {
                      id: e.target.options[e.target.options.selectedIndex].getAttribute(
                        'option-id'
                      ),
                      name: e.target.value
                    });
                  }}
                  onClick={() => formik.setFieldTouched('paymentReason')}
                  name={`paymentReason`}
                  readOnly={description === 'View'}
                  autoComplete="off"
                  error={
                    formik.touched.paymentReason && formik.errors.paymentReason ? (
                      <span className="text-danger small font-weight-bold">
                        {formik.errors.paymentReason}
                      </span>
                    ) : null
                  }
                >
                  {formik.values.paymentReason.length > 0 ? (<option value={formik.values.paymentReason.name} label={formik.values.paymentReason.name} />) : (<option value="" label="Select payment reason" />) }

                  {paymentReason.filter(e => e.deletedAt === null).map((b) => (
                    <option disabled={b.id === '0'} option-id={b.id} key={b.id}>
                      {b.name}
                    </option>
                  ))}
                </Input>
                <input
                  id={`paymentReason-other-${description}`}
                  size="sm"
                  type="text"
                  className={
                    formik.values.paymentReason.id !== '5f1842bdc17d552d24cf5940'
                      ? 'd-none'
                      : 'd-block othersInput'
                  }
                  value={
                    formik.values.paymentReason.id === '5f1842bdc17d552d24cf5940'
                      ? formik.values.paymentReason.name
                      : ''
                  }
                  onChange={
                    formik.values.paymentReason.id === '5f1842bdc17d552d24cf5940'
                      ? formik.handleChange
                      : () => {}
                  }
                  name={`paymentReason.name`}
                  readOnly={description === 'View'}
                  autoComplete="off"
                ></input>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col xs={12} sm={12} md={12}>
                <Form.Label>Date</Form.Label>
                {formik.touched.date && formik.errors.date ? (
                  <span className="text-danger small font-weight-bold">
                    {formik.errors.date}
                  </span>
                ) : null}
                <div
                  onClick={() => formik.setFieldTouched('date')}
                  id={`receipt-date-${description}`}
                >
                  <DatePicker
                    selected={formik.values.date}
                    name="date"
                    className="form-control py-0 receipt-date"
                    onChange={(date) => formik.setFieldValue('date', date)}
                    maxDate={new Date()}
                    disabled={description === 'View'}
                    dateFormat="MMMM d, yyyy"
                  />
                </div>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} sm={12} md={12}>
                <Input
                  as="textarea"
                  rows="3"
                  label="Payment Details"
                  id={`paymentDetails-${description}`}
                  size="sm"
                  type="text"
                  value={formik.values.details}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="details"
                  readOnly={description === 'View'}
                  autoComplete="off"
                  className={''}
                />
              </Col>
            </Form.Row>

            <Button
              variant="info"
              text={
                description === 'Update' || description === 'View'
                  ? 'Update Receipt'
                  : 'Add Receipt'
              }
              onClick={setConfirmationModalShow}
              color="white"
              className={` float-right ${description === 'View' && 'd-none'}`}
              disabled={!formik.isValid || !formik.dirty}
              id={`receipt-update-add-button-${description}`}
            />
          </Form>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default Receipt;