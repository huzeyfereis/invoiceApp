import React, { useState } from 'react';
import { useRefData, useConfirmationModal, useModal } from '../../../redux/hooks';
import { Button, Modal, ConfirmationModal } from '../../../atoms';
import { Card } from 'react-bootstrap'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'


const RefDataModal = (props) => {
  const { name, data, setData, setModalClose } = props

  // Modal Hooks
  const { modalHeading, modalType } = useModal()
  const { isConfirmationOpen, confirmationHeading, setConfirmationModalClose, setConfirmationModalShow } = useConfirmationModal()
  const { addRefData, updateRefData } = useRefData();

  //Formik
  const [formik, setFormik] = useState({})
  const initialValues = {
    name: data.name || ''
  }
  const validationSchema = Yup.object({
    name: Yup.string().required('Required')
  })

  const onSubmit = values => {
    setFormik(values)
      setConfirmationModalShow({
        confirmationType: modalType,
        confirmationHeading: modalHeading
      })
  }

  const onClick = () => {
    (modalType === 'add') ? addRefData(name, formik) : updateRefData(name, data.id, formik)
    setData('')
    setConfirmationModalClose()
    setModalClose()
  }
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
    {props => {
      const { isValid, dirty } = props
      return (
        <Card>
          <Card.Body>
            <Form>
            <div className="form-row">
            <div className="col-12">
              <div className="form-group">
                <div className='form-label' style={{ display: 'flex' }}>
                  <label htmlFor='name' >Ref Name</label>
                  <ErrorMessage name='name' component='div' style={{'marginLeft' : '10px', color: 'red'}} />
                </div>          
                <Field
                  className='form-control form-control-sm'
                  type="text"
                  placeholder="Ref name"
                  name="name"
                />
            </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-6 col-sm-12 col-12">
            <div className="form-group">
              <Button text={modalHeading}
              variant="info"
              className="ml-auto"
              type='submit'
              disabled={!isValid || !dirty}
              />
            </div>
            </div>
          </div>
            </Form>
          </Card.Body>
        </Card>
      )
    }}       
    </Formik>
    </>
  );
};

export default RefDataModal;
