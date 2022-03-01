import React from 'react';
import { Form, Col } from 'react-bootstrap';
import { Input, Button } from '../../../atoms'

const defaultAddress = {
  firstLine: '',
  secondLine: '',
  thirdLine: '',
  town: '',
  city: '',
  postCode: ''
};

const Address = ({
  handleOnChange,
  handleDeleteAddress,
  address = defaultAddress,
  description,
  i
}) => {
  return (
    <>
      <Form.Row id="addresses">
        <Col xs={12} sm={5} md={5}>
          <Input
            label="First Line"
            id={`address[${i}].firstLine`}
            size="sm"
            type="text"
            value={address.firstLine}
            onChange={handleOnChange}
            name={`address[${i}].firstLine`}
            readOnly={description === 'View'}
          ></Input>
          <Input
            label="Second Line"
            id={`address[${i}].secondLine`}
            size="sm"
            type="text"
            value={address.secondLine}
            onChange={handleOnChange}
            name={`address[${i}].secondLine`}
            readOnly={description === 'View'}
          ></Input>
          <Input
            label="Third Line"
            id={`address[${i}].thirdLine`}
            size="sm"
            type="text"
            value={address.thirdLine}
            onChange={handleOnChange}
            name={`address[${i}].thirdLine`}
            readOnly={description === 'View'}
          ></Input>
        </Col>
        <Col xs={12} sm={5} md={5}>
          <Input
            label="Town"
            id={`address[${i}].town`}
            size="sm"
            type="text"
            value={address.town}
            onChange={handleOnChange}
            name={`address[${i}].town`}
            readOnly={description === 'View'}
          ></Input>
          <Input
            label="City"
            id={`address[${i}].city`}
            size="sm"
            type="text"
            value={address.city}
            onChange={handleOnChange}
            name={`address[${i}].city`}
            readOnly={description === 'View'}
          ></Input>
          <Input
            label="Post Code"
            id={`address[${i}].postCode`}
            size="sm"
            type="text"
            value={address.postCode}
            onChange={handleOnChange}
            name={`address[${i}].postCode`}
            readOnly={description === 'View'}
          ></Input>
        </Col>
        <Col>
          <Button
            variant="danger"
            text="Delete"
            size="sm"
            onClick={() => handleDeleteAddress(i)}
            className={`btn btn-danger mt-4 ${description === 'View' && 'd-none'}`}
            id={`adress-delete-button-${i}`}
          ></Button>
        </Col>
        <hr />
      </Form.Row>
    </>
  );
};

export default Address;
