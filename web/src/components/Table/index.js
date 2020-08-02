import React from 'react';
import PropTypes from 'prop-types';

import DeliveriesHeader  from './THeader/Deliveries';
/*import DeliverymenHeader from './Header/Deliverymen';
import RecipientsHeader from './Header/Recipients';
import ProblemsHeader from './Header/Problems';*/

import DeliveriesBody from './TBody/Deliveries';
/*import DeliverymenBody from './Body/Deliverymen';
import RecipientsBody from './Body/Recipients';
import ProblemsBody from './Body/Problems';*/

import { Container } from './styles';

export default function Table({
  type,
  data,
  handleOpen,
  handleEdit,
  handleDelete,
}) {
  return (
    <Container>
      {type === 'Deliveries' && (
        <>
          <DeliveriesHeader />
          <DeliveriesBody
            data={data}
            handleOpen={handleOpen}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
    </Container>
  );
}

Table.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  handleOpen: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func.isRequired,
};

Table.defaultProps = {
  handleOpen: null,
  handleEdit: null,
};
