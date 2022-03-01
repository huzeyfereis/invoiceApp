import React from 'react';

export default function Heading({ size = '1', text, id }) {
  const Title = `h${size}`;
  return <Title id={id}>{text}</Title>;
}
