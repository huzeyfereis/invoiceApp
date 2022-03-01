import React from 'react';
import { Modal as ModalB } from 'react-bootstrap';

const Modal = ({ body, isOpen, heading, onHide }) => {
  return (
    <>
      <ModalB show={isOpen} onHide={onHide}>
        <ModalB.Body>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '.5rem .5rem 1rem .5rem', padding: '.5rem' }}>
            <h4>{heading}</h4>
            <button type="button" className="close" onClick={onHide}>
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close</span>
            </button>
          </div>
          {body}
        </ModalB.Body>
      </ModalB>
    </>
  );
};

export default Modal;
