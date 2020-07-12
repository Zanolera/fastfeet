import React from 'react';
import { MdSearch } from 'react-icons/md';

import { Container } from './styles';

export default function SearchInput({ placeholder, handleSearch }) {
  return (
    <Container>
      <MdSearch size={22} color="#999999" />
      <input
        name="search"
        type="search"
        placeholder={placeholder}
        onKeyPress={(e) =>
          e.key === 'Enter' ? handleSearch(e.target.value) : ''
        }
      />
    </Container>
  );
}
