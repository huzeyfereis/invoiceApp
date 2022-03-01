import React from 'react';
import Icon from './Icon';

export default function RenderBoolean({ value }) {
  return value ? <Icon icon="faCheck" /> : null;
}
