import React, { useState, useEffect, useCallback } from 'react';
import { Pagination } from 'react-bootstrap';
import './Pagination.css';

const Paginations = ({
  items,
  pageSize,
  initialPage = 1,
  onChangePage,
  paginationClass,
  activePagehandler,
  isSearchActive,
  id,
  paginationType,
  itemsLength
}) => {
  //Redux Hooks

  const [pager, setPager] = useState({});

  const setPage = useCallback(
    (page, size) => {
      let pager;
      // get new pager object for specified page
      if (paginationType === 'client') {
        pager = getPager(items.length, page, size);
      } else if (paginationType === 'server') {
        pager = getPager(itemsLength, page, size);
      }

      // get new page of items from items array
      const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
      onChangePage(pageOfItems);

      if (page < 1 || page > pager.totalPages) {
        if (isSearchActive) {
          return setPager({});
        }
        return;
      }
      activePagehandler(page);

      // update state
      setPager(pager);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activePagehandler, isSearchActive, items, itemsLength, onChangePage, paginationType]
  );

  useEffect(() => {
    // set page if items array isn't empty
    if (paginationType === 'client') {
      if ((items && items.length) || isSearchActive) {
        setPage(initialPage, pageSize);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPage, isSearchActive, items, pageSize, setPage]);

  useEffect(() => {
    if (paginationType === 'server') {
      if ((items && items.length) || isSearchActive) {
        setPage(pager.currentPage || 1, pageSize);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearchActive, items, pageSize, paginationType, setPage]);

  const getPager = (totalItems, currentPage = 1, pageSize) => {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage, endPage;
    if (totalPages <= 6) {
      // less than 6 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 6 total pages so calculate start and end pages
      if (currentPage <= 4) {
        startPage = 1;
        endPage = 7;
      } else if (currentPage + 3 >= totalPages) {
        startPage = totalPages - 6;
        endPage = totalPages;
      } else {
        startPage = currentPage - 3;
        endPage = currentPage + 3;
      }
    }
    let startIndex;
    let endIndex;
    if (paginationType === 'client') {
      // calculate start and end item indexes
      startIndex = (currentPage - 1) * pageSize;
      endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    } else if (paginationType === 'server') {
      // calculate start and end item indexes
      startIndex = 0;
      endIndex = Math.min(pageSize - 1, totalItems - 1);
    }

    // create an array of pages to ng-repeat in the pager control

    const pages = [...Array(endPage + 1 - startPage).keys()].map((i) => {
      if (i === 0) {
        return { page: 1, value: true };
      }
      if (totalPages <= 6) {
        return { page: startPage + i, value: true };
      }
      if (currentPage >= 5 && i === 1) {
        return { page: startPage + i, value: false };
      }
      if (currentPage + 3 >= totalPages && i >= 4) {
        return { page: startPage + i, value: true };
      }
      if (i < 5) {
        return { page: startPage + i, value: true };
      }
      if (i < 6) {
        return { page: startPage + i, value: false };
      }
      if (i === 6) {
        return { page: totalPages, value: true };
      }
      return { page: totalPages, value: true };
    });

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  };
  if (!pager.pages || pager.pages.length <= 1) {
    // don't display pager if there is only 1 page
    return null;
  }
  return (
    <Pagination id={id} className={`${paginationClass}`}>
      <Pagination.First onClick={() => setPage(1, pager.pageSize)} />
      <Pagination.Prev
        onClick={() => {
          if (pager.currentPage > 1) setPage(pager.currentPage - 1, pager.pageSize);
        }}
      />

      {pager.pages.map((page, i) => (
        <Pagination.Item
          active={page.value && pager.currentPage === page.page}
          key={'page' + i}
          onClick={() => page.value && setPage(page.page, pager.pageSize)}
          className={!page.value ? 'disabled' : ''}
        >
          {page.value ? page.page : '...'}
        </Pagination.Item>
      ))}

      <Pagination.Next
        onClick={() => {
          if (pager.currentPage < pager.totalPages)
            setPage(pager.currentPage + 1, pager.pageSize);
        }}
      />
      <Pagination.Last onClick={() => setPage(pager.totalPages, pager.pageSize)} />
    </Pagination>
  );
};

export default Paginations;
