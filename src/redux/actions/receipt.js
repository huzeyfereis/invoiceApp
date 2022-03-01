import { useAxios } from '../../helper/useAxios';
import { toast } from 'react-toastify';

import {
  GET_RECEIPT,
  GET_RECEIPT_SUCCESS,
  GET_RECEIPT_ERROR,
  GET_RECEIPTS,
  GET_RECEIPTS_SUCCESS,
  GET_RECEIPTS_ERROR,
  ADD_RECEIPT,
  ADD_RECEIPT_SUCCESS,
  ADD_RECEIPT_ERROR,
  UPDATE_RECEIPT,
  UPDATE_RECEIPT_SUCCESS,
  UPDATE_RECEIPT_ERROR
} from './types';

const RECEIPTS_API_URL = process.env.REACT_APP_RECEIPT_API;
// Get receipts
export const getReceipts = (skip, limit, sort = 'createdAt', dir = 'desc') => async (dispatch) => {
  try {
    dispatch({ type: GET_RECEIPTS });
    const res = await useAxios(`${RECEIPTS_API_URL}?skip=${skip}&limit=${limit}&sort=${sort}&sdir=${dir}`);
    dispatch({
      type: GET_RECEIPTS_SUCCESS,
      payload: { data: res.data.data, count: res.data.count }
    });
  } catch (err) {
    dispatch({
      type: GET_RECEIPTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add receipt
export const addReceipt = (data) => async (dispatch) => {
  try {
    dispatch({ type: ADD_RECEIPT });
    const res = await useAxios(RECEIPTS_API_URL, 'post', data);
    dispatch({
      type: ADD_RECEIPT_SUCCESS,
      payload: res.data
    });
    toast.success('Receipt created successfully');
  } catch (err) {
    const errors = err.response.data.errors;

    if (Array.isArray(errors)) {
      errors.forEach((error) => toast.error(error.msg));
    }else {
      toast.error(errors)
    }
    dispatch({
      type: ADD_RECEIPT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update receipt
export const updateReceipt = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_RECEIPT });
    const res = await useAxios(`${RECEIPTS_API_URL}/${id}`, 'patch', data);
    dispatch({
      type: UPDATE_RECEIPT_SUCCESS,
      payload: res.data
    });
    toast.success('Receipt updated successfully');
  } catch (err) {
    const errors = err.response.data.errors;

    if (Array.isArray(errors)) {
      errors.forEach((error) => toast.error(error.msg));
    }else {
      toast.error(errors)
    }
    dispatch({
      type: UPDATE_RECEIPT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get One receipt
export const getReceipt = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_RECEIPT });
    const res = await useAxios(`${RECEIPTS_API_URL}/${id}`);
    dispatch({
      type: GET_RECEIPT_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_RECEIPT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
