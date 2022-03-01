import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Input, Button } from '../../../atoms';
import { useRefData } from './../../../redux/hooks';

const Phone = ({ handleOnChange, handleDeletePhone, phone, i, description }) => {
  const { phoneType, getRefData } = useRefData();
  useEffect(() => {
    !phoneType.length && getRefData('phoneType');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRefData]);
  return (
    <Row id="phones">
      <Col xs={12} sm={5} md={5}>
        <Input
          as="select"
          size="sm"
          id={`phones[${i}].phoneTypeId`}
          label="Phone Types"
          onChange={(e) => {
            handleOnChange(
              `phones[${i}].id`,
              e.target.options[e.target.options.selectedIndex].getAttribute('option-id')
            );
          }}
          value={phoneType.find((p) => p.id === phone.id)?.name}
          name={`phones[${i}]`}
          className="text-capitalize"
          readOnly={description === 'View'}
          disabled={description === 'View'}
        >
          {phoneType.map((b) => (
            <option
              value={b.name}
              disabled={b.id === '5f18476eb577210fe83f161a'}
              option-id={b.id}
              key={b.id}
            >
              {b.name}
            </option>
          ))}
        </Input>

        <Input
          id={`phones[${i}].phone`}
          type="tel"
          placeholder="1-(555)-555-5555"
          label="Number"
          size="sm"
          value={phone.phone}
          onChange={(e) => {
            handleOnChange(`phones[${i}].phone`, e.target.value);
          }}
          name={`phones[${i}]`}
          readOnly={description === 'View'}
        ></Input>
      </Col>
      <Col>
        <Button
          variant="danger"
          text="Delete"
          size="sm"
          className={`btn btn-danger mt-4 ${description === 'View' && 'd-none'}`}
          onClick={() => handleDeletePhone(i)}
          id={`phone-delete-button-${i}`}
        ></Button>
      </Col>
      <hr />
    </Row>
  );
};

export default Phone;
