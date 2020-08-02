import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { MdAdd } from 'react-icons/md';
import api from '~/services/api';
import history from '~/services/history';

import SearchInput from '~/components/SearchInput';
import Table from '~/components/Table';
import Pagination from '~/components/Pagination';

import { Content, HeaderWrapper } from '~/styles/global';
import { Body } from './styles';

export default function Delivery() {
  const [deliveries, setDeliveries] = useState();
  const [filter, setFilter] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [deletableId, setDeletableId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDelivery, setCurrentDelivery] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get('deliveries', {
        params: { page, q: filter },
      });
console.log('response', response);
      setTotalPages(Math.ceil(response.data.count / 7));

      const rows = response.data.deliveries.map((row) => ({
        ...row,
        start_date: row.start_date
          ? format(parseISO(row.start_date), 'dd/MM/yyyy HH:MM')
          : null,
        end_date: row.end_date
          ? format(parseISO(row.end_date), 'dd/MM/yyyy HH:MM')
          : null,
      }));

      setDeliveries(rows);
    }

    loadDeliveries();
  }, [page, filter]);


  function handleDelete(id) {
    setAlertOpen(true);
    setDeletableId(id);
  }

  function handleOpen(delivery) {
    setCurrentDelivery(delivery);
    setModalVisible(!modalVisible);
  }

  function handleEdit(id) {
    history.push(`/deliveries/${id}`);
  }

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
        {deliveries && (
          <Body>
            <Table
              type="Deliveries"
              data={deliveries}
              handleOpen={handleOpen}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
            {totalPages >= 1 && (
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                  />
                )}
          </Body>
          )}
      </Content>
    </>
  );
};
