import React from 'react';
import { MdAdd } from 'react-icons/md';

import SearchInput from '~/components/SearchInput';

import { Content, HeaderWrapper } from '~/styles/global';

export default function Delivery() {
  return (
    <>
      <Content>
        <header>Gerenciando encomendas</header>
        <HeaderWrapper>
          <SearchInput placeholder="Buscar por encomendas"/>
          <button type="button">
            <MdAdd size={22} color="#FFF" />
            CADASTRAR
          </button>
        </HeaderWrapper>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#01</td>
              <td>NomeDestinatario</td>
              <td>NomeEntregador</td>
              <td>Rio do Sul</td>
              <td>Santa Catarina</td>
              <td>Entregue</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
      </Content>
    </>
  );
};
