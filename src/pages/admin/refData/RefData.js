import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { useRefData, useConfirmationModal, useModal } from '../../../redux/hooks';
import { Modal, ConfirmationModal } from '../../../atoms';
import { RefBody } from './index'
import RefDataModal from './RefDataModal'

export const title = [
  {
    title: 'Name',
    fieldName: 'name',
    className: 'col-4 col-xs-4'
  },

  {
    title: '',
    fieldName: 'icon',

    icons: ['Edit', 'TrashAlt'],
    className: 'col-4 col-xs-4'
  }
];

const RefData = () => {
  const { branch, paymentReason, paymentType, phoneType, error, pending, getRefData, deleteRefData } = useRefData();
  const references = {branch, paymentReason, paymentType, phoneType}

  //Modal States
  const { isModalOpen, modalHeading, setModalShow, setModalClose } = useModal()
  const { isConfirmationOpen, confirmationHeading, confirmationType, id, setConfirmationModalShow,  setConfirmationModalClose } = useConfirmationModal()
  const [name, setName] = useState('')
  const [data, setData] = useState('')

  // Fetch all users to populate Redux store
  useEffect(() => {
    getRefData('branch');
    getRefData('paymentReason');
    getRefData('paymentType');
    getRefData('phoneType');
  }, [getRefData]);

  // Check error state and notify
  useEffect(() => {
    if (error.msg === 'Unauthorized' && error.status === 401) {
      window.location.reload(true);
    }
  }, [error]);

  //handle Button and icon OnClick Event
  const handleClick = (e, type, id, name, refName) => {
    switch(type) {
      case 'Add':
        setModalShow({modalHeading: `Add ${refName}`, modalType: 'add'})
        setName(name)
        break
      case 'TrashAlt':
        setName(name)
        setConfirmationModalShow({
          confirmationType: 'Delete',
          confirmationHeading: `Delete ${refName}`,
          id: id
        });
        break
      case 'Edit':
       setData( references[name].find(e => e.id === id))
        setModalShow({modalHeading: `Update ${refName}`, modalType: 'update'})
        setName(name)
        break
      default:
        break
    }
  }
  
  const handleDelete = (name, id) =>{
    deleteRefData(name, id)
    setConfirmationModalClose();
  };

  const props ={
    title: title,
    pending,
    handleClick
  }

  const modalProps = {
    name,
    data,
    setData, 
    setModalClose
  }
  return (
    <>      
     <Modal
        isOpen={isModalOpen}
        heading={modalHeading}
        onHide={setModalClose}
        body={<RefDataModal {...modalProps}/>}
      />
      {confirmationType === 'Delete' && <Modal
       body={<ConfirmationModal modalHeading={confirmationHeading} onClick={() => handleDelete(name, id)} variant={'danger'} />}
       isOpen={isConfirmationOpen}
       heading={confirmationHeading}
       onHide={setConfirmationModalClose}
      />}
    <Container>
      <Row>
        <Col md><RefBody {...props} refName={'Branch'} name='branch' data={branch}/></Col>
        <Col md><RefBody {...props} refName={'Payment Reason'} name='paymentReason' data={paymentReason}/></Col>
      </Row>
      <Row >
        <Col md><RefBody {...props} refName={'Payment Type'} name='paymentType' data={paymentType}/></Col>
        <Col md><RefBody {...props} refName={'Phone Type'} name='phoneType' data={phoneType}/></Col>
      </Row>
    </Container>
    </>
  );
};

export default RefData;



