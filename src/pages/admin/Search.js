import React from 'react';
import { useSearch } from '../../redux/hooks';

import { Input } from '../../atoms';

const SearchCustomer = () => {
  
  const { setSearchTerm, searchTerm, isActive } = useSearch();
  const handleChange = (e) => {
    setSearchTerm(e.target.value, 'searchManager');
  };

  return (
    <Input
      type="text"
      placeholder="search"
      className="border-top-0 border-left-0 border-right-0"
      pClassName="ml-4"
      onChange={handleChange}
      value={isActive === 'searchManager' ? searchTerm : '' }
      id={'search-customer-input'}
    />
  );
};

export default SearchCustomer;