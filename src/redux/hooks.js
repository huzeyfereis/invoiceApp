import { useCallback } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import {
  getCustomers,
  deleteCustomer,
  addCustomer,
  updateCustomer,
  getCustomer,
  getCustomerReceipts,
  sortCustomers
} from './actions/customer';
import { getReceipts, addReceipt, updateReceipt, getReceipt } from './actions/receipt';
import { setSearchTerm, setSearch, setLocationChanged } from './actions/search';
import { setPage, setPageItems, setPageSize } from './actions/pagination';
import {
  setConfirmationModalShow,
  setConfirmationModalClose
} from './actions/confirmationModal';
import { setModalShow, setModalClose } from './actions/modal';
import { loadUser, logOutUser } from './actions/auth';
import {
  getRefData,
  addRefData,
  updateRefData,
  deleteRefData
} from './actions/reference';
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getUser,
  sortUsers
} from './actions/users';
import { getDashboardData } from './actions/dashboard';

//+++++++++++++++++++++++++ CUSTOMER/S HOOK+++++++++++++++++++++++++++++++++++++

export function useCustomers() {
  const dispatch = useDispatch();
  const {
    customers,
    customer,
    pending,
    error,
    customerSubtableID,
    customerReceipts
  } = useSelector(
    (state) => ({
      customers: state.customer.customers,
      customer: state.customer.customer,
      pending: state.customer.pending,
      error: state.customer.error,
      customerSubtableID: state.customer.customerSubtableID,
      customerReceipts: state.customer.customerReceipts
    }),
    shallowEqual
  );

  const boundGetCustomers = useCallback(
    (...args) => {
      return dispatch(getCustomers(...args));
    },
    [dispatch]
  );
  const boundDeleteCustomer = useCallback(
    (...args) => {
      return dispatch(deleteCustomer(...args));
    },
    [dispatch]
  );
  const boundAddCustomer = useCallback(
    (...args) => {
      return dispatch(addCustomer(...args));
    },
    [dispatch]
  );
  const boundUpdateCustomer = useCallback(
    (...args) => {
      return dispatch(updateCustomer(...args));
    },
    [dispatch]
  );
  const boundGetCustomer = useCallback(
    (...args) => {
      return dispatch(getCustomer(...args));
    },
    [dispatch]
  );
  const boundGetCustomerReceipts = useCallback(
    (...args) => {
      return dispatch(getCustomerReceipts(...args));
    },
    [dispatch]
  );
  const boundSortCustomers = useCallback(
    (...args) => {
      return dispatch(sortCustomers(...args));
    },
    [dispatch]
  );

  return {
    customers,
    customer,
    getCustomers: boundGetCustomers,
    deleteCustomer: boundDeleteCustomer,
    addCustomer: boundAddCustomer,
    updateCustomer: boundUpdateCustomer,
    getCustomer: boundGetCustomer,
    getCustomerReceipts: boundGetCustomerReceipts,
    sortCustomers: boundSortCustomers,
    pending,
    error,
    customerSubtableID,
    customerReceipts
  };
}
//+++++++++++++++++++++++++ SEARCH CUSTOMERS +++++++++++++++++++++++++++++++++++++

export function useSearch() {
  const dispatch = useDispatch();
  const { isActive, searchTerm, filtered, searchCount } = useSelector(
    (state) => ({
      searchTerm: state.search.searchTerm,
      isActive: state.search.isActive,
      filtered: state.search.filtered,
      searchCount: state.search.searchCount
    }),
    shallowEqual
  );

  const boundSetSearchTerm = useCallback(
    (term, type) => {
      return dispatch(setSearchTerm(term, type));
    },
    [dispatch]
  );

  const boundSetSearch = useCallback(
    (...args) => {
      return dispatch(setSearch(...args));
    },
    [dispatch]
  );

  const boundSetLocationChanged = useCallback(
    (...args) => {
      return dispatch(setLocationChanged(...args));
    },
    [dispatch]
  );

  return {
    filtered,
    setSearchTerm: boundSetSearchTerm,
    setSearch: boundSetSearch,
    setLocationChanged: boundSetLocationChanged,
    isActive,
    searchTerm,
    searchCount
  };
}

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

//+++++++++++++++++++++++++ MODAL HOOK+++++++++++++++++++++++++++++++++++++

export function useConfirmationModal() {
  const dispatch = useDispatch();
  const {
    isConfirmationOpen,
    confirmationHeading,
    confirmationType,
    id,
    values
  } = useSelector(
    (state) => ({
      isConfirmationOpen: state.confirmationModal.isOpen,
      confirmationHeading: state.confirmationModal.heading,
      confirmationType: state.confirmationModal.type,
      id: state.confirmationModal.id,
      values: state.confirmationModal.values
    }),
    shallowEqual
  );

  const boundSetConfirmationModalShow = useCallback(
    (...args) => {
      return dispatch(setConfirmationModalShow(...args));
    },
    [dispatch]
  );
  const boundSetConfirmationModalClose = useCallback(
    (...args) => {
      return dispatch(setConfirmationModalClose(...args));
    },
    [dispatch]
  );

  return {
    isConfirmationOpen,
    confirmationHeading,
    confirmationType,
    id,
    setConfirmationModalShow: boundSetConfirmationModalShow,
    setConfirmationModalClose: boundSetConfirmationModalClose,
    values
  };
}

export function useModal() {
  const dispatch = useDispatch();
  const { isModalOpen, modalHeading, modalType, id, values } = useSelector(
    (state) => ({
      isModalOpen: state.modal.isOpen,
      modalHeading: state.modal.heading,
      modalType: state.modal.type,
      id: state.modal.id,
      values: state.modal.values
    }),
    shallowEqual
  );

  const boundSetModalShow = useCallback(
    (...args) => {
      return dispatch(setModalShow(...args));
    },
    [dispatch]
  );
  const boundSetModalClose = useCallback(
    (...args) => {
      return dispatch(setModalClose(...args));
    },
    [dispatch]
  );

  return {
    isModalOpen,
    modalHeading,
    modalType,
    id,
    setModalShow: boundSetModalShow,
    setModalClose: boundSetModalClose,
    values
  };
}

//+++++++++++++++++++++++++ AUTH +++++++++++++++++++++++++++++++++++++
export function useAuth() {
  const dispatch = useDispatch();
  const {
    token,
    isAuthenticated,
    loading,
    name,
    groups,
    id,
    currentBranch
  } = useSelector(
    (state) => ({
      token: state.auth.token,
      isAuthenticated: state.auth.isAuthenticated,
      loading: state.auth.loading,
      name: state.auth.name,
      id: state.auth.id,
      groups: state.auth.groups,
      currentBranch: state.auth.currentBranch
    }),
    shallowEqual
  );

  const boundLoadUser = useCallback(
    (...args) => {
      return dispatch(loadUser(...args));
    },
    [dispatch]
  );
  const boundLogOutUser = useCallback(
    (...args) => {
      return dispatch(logOutUser(...args));
    },
    [dispatch]
  );

  return {
    token,
    isAuthenticated,
    loading,
    name,
    id,
    groups,
    currentBranch,
    loadUser: boundLoadUser,
    logOutUser: boundLogOutUser
  };
}

//+++++++++++++++++++++++++ RECEIPT/S HOOK+++++++++++++++++++++++++++++++++++++

export function useReceipts() {
  const dispatch = useDispatch();
  const { receipts, receipt, pending, error, count } = useSelector(
    (state) => ({
      receipts: state.receipt.receipts,
      receipt: state.receipt.receipt,
      pending: state.receipt.pending,
      error: state.receipt.error,
      count: state.receipt.count
    }),
    shallowEqual
  );

  const boundGetReceipts = useCallback(
    (...args) => {
      return dispatch(getReceipts(...args));
    },
    [dispatch]
  );

  const boundAddReceipt = useCallback(
    (...args) => {
      return dispatch(addReceipt(...args));
    },
    [dispatch]
  );
  const boundUpdateReceipt = useCallback(
    (...args) => {
      return dispatch(updateReceipt(...args));
    },
    [dispatch]
  );
  const boundGetReceipt = useCallback(
    (...args) => {
      return dispatch(getReceipt(...args));
    },
    [dispatch]
  );

  return {
    receipts,
    receipt,
    getReceipts: boundGetReceipts,
    addReceipt: boundAddReceipt,
    updateReceipt: boundUpdateReceipt,
    getReceipt: boundGetReceipt,
    pending,
    error,
    count
  };
}

//+++++++++++++++++++++++++ REF DATA HOOK+++++++++++++++++++++++++++++++++++++

export function useRefData() {
  const dispatch = useDispatch();
  const { branch, paymentReason, paymentType, phoneType, pending, error } = useSelector(
    (state) => ({
      branch: state.reference.branch,
      paymentReason: state.reference.paymentReason,
      paymentType: state.reference.paymentType,
      phoneType: state.reference.phoneType,
      pending: state.reference.pending,
      error: state.reference.error
    }),
    shallowEqual
  );

  const boundGetRefData = useCallback(
    (...args) => {
      return dispatch(getRefData(...args));
    },
    [dispatch]
  );
  const boundDeleteRefData = useCallback(
    (...args) => {
      return dispatch(deleteRefData(...args));
    },
    [dispatch]
  );
  const boundAddRefData = useCallback(
    (...args) => {
      return dispatch(addRefData(...args));
    },
    [dispatch]
  );
  const boundUpdateRefData = useCallback(
    (...args) => {
      return dispatch(updateRefData(...args));
    },
    [dispatch]
  );

  return {
    branch,
    paymentReason,
    paymentType,
    phoneType,
    pending,
    error,
    getRefData: boundGetRefData,
    deleteRefData: boundDeleteRefData,
    addRefData: boundAddRefData,
    updateRefData: boundUpdateRefData
  };
}

//+++++++++++++++++++++++++ USER/S HOOK+++++++++++++++++++++++++++++++++++++

export function useUsers() {
  const dispatch = useDispatch();
  const { users, user, pending, error } = useSelector(
    (state) => ({
      users: state.user.users,
      user: state.user.user,
      pending: state.user.pending,
      error: state.user.error
    }),
    shallowEqual
  );

  const boundGetUsers = useCallback(
    (...args) => {
      return dispatch(getUsers(...args));
    },
    [dispatch]
  );
  const boundDeleteUser = useCallback(
    (...args) => {
      return dispatch(deleteUser(...args));
    },
    [dispatch]
  );
  const boundAddUser = useCallback(
    (...args) => {
      return dispatch(addUser(...args));
    },
    [dispatch]
  );
  const boundUpdateUser = useCallback(
    (...args) => {
      return dispatch(updateUser(...args));
    },
    [dispatch]
  );
  const boundGetUser = useCallback(
    (...args) => {
      return dispatch(getUser(...args));
    },
    [dispatch]
  );
  const boundSortUsers = useCallback(
    (...args) => {
      return dispatch(sortUsers(...args));
    },
    [dispatch]
  );

  return {
    users,
    user,
    getUsers: boundGetUsers,
    deleteUser: boundDeleteUser,
    addUser: boundAddUser,
    updateUser: boundUpdateUser,
    getUser: boundGetUser,
    sortUsers: boundSortUsers,
    pending,
    error
  };
}

//+++++++++++++++++++++++++ DASHBOARD DATA HOOK+++++++++++++++++++++++++++++++++++++

export function useDashboardData() {
  const dispatch = useDispatch();
  const { branch, paymentReason, paymentType, date, pending, error } = useSelector(
    (state) => ({
      branch: state.dashboard.branch,
      paymentReason: state.dashboard.paymentReason,
      paymentType: state.dashboard.paymentType,
      date: state.dashboard.date,
      pending: state.dashboard.pending,
      error: state.dashboard.error
    }),
    shallowEqual
  );

  const boundGetDashboardData = useCallback(
    (...args) => {
      return dispatch(getDashboardData(...args));
    },
    [dispatch]
  );

  return {
    branch,
    paymentReason,
    paymentType,
    date,
    pending,
    error,
    getDashboardData: boundGetDashboardData
  };
}
