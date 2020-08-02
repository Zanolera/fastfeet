import React from 'react';
import PropTypes from 'prop-types';

import { MdRemoveRedEye, MdEdit, MdDeleteForever } from 'react-icons/md';

import Status from '~/components/Status';
import Avatar from '~/components/Avatar';
import ActionsMenu from '~/components/ActionsMenu';

import { AvatarWrapper } from './styles';

export default function DeliveriesBody({
  data,
  handleOpen,
  handleEdit,
  handleDelete,
}) {
  return (
    <tbody>
      {data.map((delivery) => (
        <tr key={delivery.id}>
          <td>#{String(`0${delivery.id}`).slice(-2)}</td>
          <td>{delivery.recipient.name}</td>
          <td>
            <AvatarWrapper>
              <Avatar
                url={
                  delivery.deliveryman.avatar
                    ? delivery.deliveryman.avatar.url
                    : null
                }
                name={delivery.deliveryman.name}
              />
              {delivery.deliveryman.name}
            </AvatarWrapper>
          </td>
          <td>{delivery.recipient.city}</td>
          <td>{delivery.recipient.state}</td>
          <td>
            <Status status={delivery.status} />
          </td>
          <td>
            <ActionsMenu height={120} width={150}>
              <li>
                <MdRemoveRedEye color="#8E5BE8" size={14} />
                <button type="button" onClick={() => handleOpen(delivery)}>
                  Visualizar
                </button>
              </li>
              <li>
                <MdEdit color="#4D85EE" size={14} />
                <button
                  type="button"
                  onClick={() => handleEdit(delivery.id)}
                >
                  Editar
                </button>
              </li>
              <li>
                <MdDeleteForever color="#DE3B3B" size={14} />
                <button type="button" onClick={() => handleDelete(delivery)}>
                  Excluir
                </button>
              </li>
            </ActionsMenu>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

DeliveriesBody.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
