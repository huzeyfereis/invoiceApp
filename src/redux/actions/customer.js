import { useAxios } from '../../helper/useAxios';
import { toast } from 'react-toastify';

import {
  GET_CUSTOMER,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_ERROR,
  GET_CUSTOMERS,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_ERROR,
  DELETE_CUSTOMER,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_ERROR,
  ADD_CUSTOMER,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_ERROR,
  UPDATE_CUSTOMER,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_ERROR,
  GET_CUSTOMER_RECEIPTS,
  GET_CUSTOMER_RECEIPTS_SUCCESS,
  GET_CUSTOMER_RECEIPTS_ERROR,
  CLOSE_CUSTOMER_RECEIPTS_TABLE,
  SORT_CUSTOMERS
} from './types';

const CUSTOMER_API_URL = process.env.REACT_APP_CUSTOMER_API;
const RECEIPTS_API_URL = process.env.REACT_APP_RECEIPT_API;
// Get customers
export const getCustomers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CUSTOMERS });
    const res = await useAxios(CUSTOMER_API_URL);
    dispatch({
      type: GET_CUSTOMERS_SUCCESS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: GET_CUSTOMERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete customer
export const deleteCustomer = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CUSTOMER });
    const res = await useAxios(`${CUSTOMER_API_URL}/${id}`, 'delete');
    dispatch({
      type: DELETE_CUSTOMER_SUCCESS,
      payload: res.data
    });
    toast.success('Customer deleted successfully');
  } catch (err) {
    dispatch({
      type: DELETE_CUSTOMER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add customer
export const addCustomer = (data) => async (dispatch) => {
  try {
    dispatch({ type: ADD_CUSTOMER });
    const res = await useAxios(CUSTOMER_API_URL, 'post', data);
    dispatch({
      type: ADD_CUSTOMER_SUCCESS,
      payload: res.data.data
    });
    toast.success('Customer added successfully');
  } catch (err) {
    const errors = err.response.data.errors;

    if (Array.isArray(errors)) {
      errors.forEach((error) => toast.error(error.msg));
    }else {
      toast.error(errors)
    }
    dispatch({
      type: ADD_CUSTOMER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update customers
export const updateCustomer = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CUSTOMER });
    const res = await useAxios(`${CUSTOMER_API_URL}/${id}`, 'patch', data);
    dispatch({
      type: UPDATE_CUSTOMER_SUCCESS,
      payload: res.data
    });
    toast.success('Customer updated successfully');
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (Array.isArray(errors)) {
      errors.forEach((error) => toast.error(error.msg));
    } else {
      toast.error(errors)
    }
    dispatch({
      type: UPDATE_CUSTOMER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get One customer
export const getCustomer = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_CUSTOMER });
    const res = await useAxios(`${CUSTOMER_API_URL}/${id}`);
    dispatch({
      type: GET_CUSTOMER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_CUSTOMER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Get customer receipts and open/close accordion
export const getCustomerReceipts = (id, type) => async (dispatch) => {
  try {
    if (type === 'open') {
      dispatch({ type: GET_CUSTOMER_RECEIPTS });
      const res = await useAxios(`${RECEIPTS_API_URL}?customerId=${id}`);
      dispatch({
        type: GET_CUSTOMER_RECEIPTS_SUCCESS,
        payload: { receipts: res.data.data, id }
      });
      return;
    }
    dispatch({
      type: CLOSE_CUSTOMER_RECEIPTS_TABLE,
      payload: { id }
    });
  } catch (err) {
    dispatch({
      type: GET_CUSTOMER_RECEIPTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Sort Customers
export const sortCustomers = (fieldName, dir = 'asc') => (dispatch) => {
  dispatch({
    type: SORT_CUSTOMERS,
    payload: {fieldName, dir}
  })
}
