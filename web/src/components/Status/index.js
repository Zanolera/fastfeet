import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container, Dot } from './styles';

export default function Status({ status }) {
  const [statusLabel, setStatusLabel] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    if (status.localeCompare('Delivered') === 0) {
      setStatusLabel('ENTREGUE');
      setColor('#2ca42b');
    } else if (status.localeCompare('Pending') === 0) {
      setStatusLabel('PENDENTE');
      setColor('#c1bc35');
    } else if (status.localeCompare('Canceled') === 0) {
      setStatusLabel('CANCELADA');
      setColor('#de3b3b');
    } else {
      setStatusLabel('RETIRADA');
      setColor('#4d85ee');
    }
  }, [status]);

  return (
    <Container color={color}>
      <Dot color={color} />
      <span>{statusLabel}</span>
    </Container>
  );
}

Status.propTypes = {
  status: PropTypes.string.isRequired,
};
