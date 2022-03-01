import React from 'react';
import Form from 'react-bootstrap/Form';
import './InputField.css';

export default function InputField({
  id,
  name,
  text,
  type = 'text',
  required = false,
  placeholder,
  onChange = undefined,
  labelClassName,
  inputClassName,
  value,
  disabled = false
}) {
  return (
    <div>
      <Form.Group controlId={id}>
        <Form.Label className={labelClassName}>{text}</Form.Label>

        <Form.Control
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          onChange={onChange}
          className={inputClassName}
          value={value}
          disabled={disabled}
        />

        <Form.Text className="text-muted">
          We'll never share your entrance with anyone else.
        </Form.Text>
      </Form.Group>
    </div>
  );
}
