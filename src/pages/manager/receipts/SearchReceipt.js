import React from 'react';
import { useSearch, usePagination } from '../../../redux/hooks';
import { Icon, Input } from '../../../atoms';

const SearchCustomer = ({ inputId, iconId, placeholder, searchType }) => {
  const { setSearchTerm, searchTerm, isActive, setSearch } = useSearch();
  const { activePage, pageSize } = usePagination();
  const skip = (activePage - 1) * pageSize;
  const limit = pageSize;
  const handleChange = (e) => {
    setSearchTerm(e.target.value, searchType);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setSearch(searchTerm, searchTerm, searchType, skip, limit);
  };
  const handleKeyDown = (e) => {
    // pressed enter key
    if (e.keyCode === 13) {
      setSearch(searchTerm, searchTerm, searchType, skip, limit);
    }
  };
  return (
    <>
      <Input
        type="text"
        placeholder={placeholder}
        className="border-top-0 border-left-0 border-right-0"
        pClassName="ml-4"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={isActive === searchType ? searchTerm : ''}
        id={inputId}
      />
      <Icon
        name="search"
        icon={'fa' + ['Search']}
        onClick={handleClick}
        id={iconId}
        size={'1x'}
        fixedWidth
      />
    </>
  );
};

export default SearchCustomer;
