import { useAxios } from '../../helper/useAxios';
import { toast } from 'react-toastify'

import {
  GET_REF_BRANCHES,
  GET_REF_PAYMENT_REASONS,
  GET_REF_PAYMENT_TYPES,
  GET_REF_PHONE_TYPES,
  ADD_REF_BRANCHES,
  ADD_REF_PAYMENT_REASONS,
  ADD_REF_PAYMENT_TYPES,
  ADD_REF_PHONE_TYPES,
  UPDATE_REF_BRANCHES,
  UPDATE_REF_PAYMENT_REASONS,
  UPDATE_REF_PAYMENT_TYPES,
  UPDATE_REF_PHONE_TYPES,
  DELETE_REF_BRANCHES,
  DELETE_REF_PAYMENT_REASONS,
  DELETE_REF_PAYMENT_TYPES,
  DELETE_REF_PHONE_TYPES,
  GET_REF_DATA_ERRORS,
  GET_REF_DATA_SUCCESS,
  ADD_REF_DATA_ERROR,
  ADD_REF_DATA_SUCCESS,
  UPDATE_REF_DATA_ERROR,
  UPDATE_REF_DATA_SUCCESS,
  DELETE_REF_DATA_ERROR,
  DELETE_REF_DATA_SUCCESS
} from './types';

const REF_DATA_API = process.env.REACT_APP_REF_DATA_API;
// Get Reference Data
export const getRefData = (type) => async (dispatch) => {
  let actionType = '';
  let url = REF_DATA_API;
  switch (type) {
    case 'branch':
      actionType = GET_REF_BRANCHES;
      break;
    case 'paymentReason':
      actionType = GET_REF_PAYMENT_REASONS;
      break;
    case 'phoneType':
      actionType = GET_REF_PHONE_TYPES;
      break;
    case 'paymentType':
      actionType = GET_REF_PAYMENT_TYPES;
      break;
    default:
      break;
  }
  try {
    dispatch({ type: actionType });

    const res = await useAxios(`${url}/${type}`);
    dispatch({
      type: GET_REF_DATA_SUCCESS,
      payload: { type: type, data: res.data }
    });
  } catch (err) {
    dispatch({
      type: GET_REF_DATA_ERRORS,
      payload: { msg: err.response?.statusText, status: err.response?.status }
    });
  }
};

// Add Ref Data
export const addRefData = (type, data) => async (dispatch) => {
  
  let actionType = '';
  let url = REF_DATA_API;
  switch (type) {
    case 'branch':
      actionType = ADD_REF_BRANCHES;
      break;
    case 'paymentReason':
      actionType = ADD_REF_PAYMENT_REASONS;
      break;
    case 'phoneType':
      actionType = ADD_REF_PHONE_TYPES;
      break;
    case 'paymentType':
      actionType = ADD_REF_PAYMENT_TYPES;
      break;
    default:
      break;
  }
  try {
    dispatch({ type: actionType });
    const res = await useAxios(`${url}/${type}`, 'post', data);
    dispatch({
      type: ADD_REF_DATA_SUCCESS,
      payload: {type: type, data: res.data}
    });
    toast.success('Ref data added successfully');
  } catch (err) {
    const errors = err.response.data.errors;

    if (Array.isArray(errors)) {
      errors.forEach((error) => toast.error(error.msg));
    }else {
      toast.error(errors)
    }
    dispatch({
      type: ADD_REF_DATA_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update user
export const updateRefData = (type, id, data) => async (dispatch) => {
  let actionType = '';
  let url = REF_DATA_API;
  switch (type) {
    case 'branch':
      actionType = UPDATE_REF_BRANCHES;
      break;
    case 'paymentReason':
      actionType = UPDATE_REF_PAYMENT_REASONS;
      break;
    case 'phoneType':
      actionType = UPDATE_REF_PHONE_TYPES;
      break;
    case 'paymentType':
      actionType = UPDATE_REF_PAYMENT_TYPES;
      break;
    default:
      break;
  }
  try {
    dispatch({ type: actionType });
    const res = await useAxios(`${url}/${type}/${id}`, 'patch', data);
    dispatch({
      type: UPDATE_REF_DATA_SUCCESS,
      payload: {type: type, data: res.data, id}
    });
    toast.success('Ref Data updated successfully');
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (Array.isArray(errors)) {
      errors.forEach((error) => toast.error(error.msg));
    } else {
      toast.error(errors)
    }
    dispatch({
      type: UPDATE_REF_DATA_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Reference Data
export const deleteRefData = (type, id) => async (dispatch) => {
  let actionType = '';
  let url = REF_DATA_API;
  switch (type) {
    case 'branch':
      actionType = DELETE_REF_BRANCHES;
      break;
    case 'paymentReason':
      actionType = DELETE_REF_PAYMENT_REASONS;
      break;
    case 'phoneType':
      actionType = DELETE_REF_PHONE_TYPES;
      break;
    case 'paymentType':
      actionType = DELETE_REF_PAYMENT_TYPES;
      break;
    default:
      break;
  }
  try {
    dispatch({ type: actionType });
    const res = await useAxios(`${url}/${type}/${id}`, 'delete');
    dispatch({
      type: DELETE_REF_DATA_SUCCESS,
      payload: {type: type, data: res.data, id}
    });
    toast.success('Ref Data deleted successfully');
  } catch (err) {
    dispatch({
      type: DELETE_REF_DATA_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
