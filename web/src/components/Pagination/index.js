import React from 'react';
import PropTypes from 'prop-types';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

import { Container } from './styles';

export default function Pagination({ page, totalPages, setPage }) {
  return (
    <Container>
      <button
        type="button"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        <FaAngleLeft color="#8e5be8" size={20} />
      </button>
      <span>
        {page} de {totalPages}
      </span>
      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        <FaAngleRight color="#8e5be8" size={20} />
      </button>
    </Container>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
