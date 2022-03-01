import { useCallback } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { setPage, setPageItems, setPageSize } from './actions/pagination';

//+++++++++++++++++++++++++ PAGINATION +++++++++++++++++++++++++++++++++++++
export function usePagination() {
  const dispatch = useDispatch();
  const { activePage, pageSize, pageOfItems } = useSelector(
    (state) => ({
      activePage: state.pagination.activePage,
      pageSize: state.pagination.pageSize,
      pageOfItems: state.pagination.pageOfItems
    }),
    shallowEqual
  );

  const boundSetPageSize = useCallback(
    (...args) => {
      return dispatch(setPageSize(...args));
    },
    [dispatch]
  );
  const boundSetPage = useCallback(
    (...args) => {
      return dispatch(setPage(...args));
    },
    [dispatch]
  );
  const boundSetPageItems = useCallback(
    (...args) => {
      return dispatch(setPageItems(...args));
    },
    [dispatch]
  );
  return {
    activePage,
    pageSize,
    pageOfItems,
    setPageSize: boundSetPageSize,
    setPage: boundSetPage,
    setPageItems: boundSetPageItems
  };
}
