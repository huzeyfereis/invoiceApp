import {
  GET_CUSTOMER,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_ERROR,
  GET_CUSTOMERS_ERROR,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS,
  DELETE_CUSTOMER,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_ERROR,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER,
  ADD_CUSTOMER_ERROR,
  UPDATE_CUSTOMER,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_ERROR,
  GET_CUSTOMER_RECEIPTS,
  GET_CUSTOMER_RECEIPTS_SUCCESS,
  GET_CUSTOMER_RECEIPTS_ERROR,
  CLOSE_CUSTOMER_RECEIPTS_TABLE,
  SORT_CUSTOMERS
} from '../actions/types';
import { sortAsc, sortDesc } from './helper'

const initialState = {
  customers: [],
  customer: {},
  customerReceipts: [],
  customerSubtableID: [],
  pending: false,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CUSTOMERS:
    case DELETE_CUSTOMER:
    case ADD_CUSTOMER:
    case UPDATE_CUSTOMER:
    case GET_CUSTOMER:
    case GET_CUSTOMER_RECEIPTS:
      return {
        ...state,
        pending: true
      };
    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: payload,
        pending: false
      };
    case GET_CUSTOMERS_ERROR:
    case DELETE_CUSTOMER_ERROR:
    case ADD_CUSTOMER_ERROR:
    case UPDATE_CUSTOMER_ERROR:
    case GET_CUSTOMER_ERROR:
    case GET_CUSTOMER_RECEIPTS_ERROR:
      return {
        ...state,
        error: payload,
        pending: false
      };
    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.map((customer) =>
          customer.id === payload.id ? { ...payload } : customer
        ),
        pending: false
      };
    case ADD_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: [...state.customers, payload],
        pending: false
      };
    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.map((customer) =>
          customer.id === payload.id ? { ...payload } : customer
        ),
        customer: payload,
        pending: false
      };
    case GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        customer: payload,
        pending: false
      };
    case GET_CUSTOMER_RECEIPTS_SUCCESS:
    case CLOSE_CUSTOMER_RECEIPTS_TABLE:
      const isNotAdded = state.customerSubtableID.indexOf(payload.id) === -1;
      return {
        ...state,
        customerReceipts: isNotAdded
          ? [...state.customerReceipts, ...payload.receipts]
          : state.customerReceipts.filter((r) => payload.id !== r.customer.id),
        customerSubtableID: isNotAdded
          ? [...state.customerSubtableID, payload.id]
          : state.customerSubtableID.filter((id) => payload.id !== id),
        pending: false
      };
    case SORT_CUSTOMERS:
      const { fieldName, dir} = payload
      let sorted = dir === 'asc' ? sortAsc(state.customers, fieldName) : sortDesc(state.customers, fieldName)
      return {
        ...state,
        customers: sorted
      }
    default:
      return state;
  }
}
