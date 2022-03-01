import React from 'react';
import { Form } from 'react-bootstrap';
import './Label.css';

export default function Label({ htmlFor, text, className }) {
  return (
    <Form.Label htmlFor={htmlFor} className={className}>
      {text}
    </Form.Label>
  );
}
