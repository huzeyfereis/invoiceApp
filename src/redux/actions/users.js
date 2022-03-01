import { useAxios } from '../../helper/useAxios';
import { toast } from 'react-toastify';

import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  SORT_USERS
} from './types';

const USER_API_URL = process.env.REACT_APP_USER_API;
// Get Users
export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USERS });
    const res = await useAxios(USER_API_URL);
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_USERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete user
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER });
    const res = await useAxios(`${USER_API_URL}/${id}`, 'delete');
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: res.data
    });
    toast.success('User deleted successfully');
  } catch (err) {
    dispatch({
      type: DELETE_USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add user
export const addUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: ADD_USER });
    const res = await useAxios(USER_API_URL, 'post', data);
    dispatch({
      type: ADD_USER_SUCCESS,
      payload: res.data.data
    });
    toast.success('User added successfully');
  } catch (err) {
    const errors = err.response.data.errors;

    if (Array.isArray(errors)) {
      errors.forEach((error) => toast.error(error.msg));
    }else {
      toast.error(errors)
    }
    dispatch({
      type: ADD_USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update user
export const updateUser = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER });
    const res = await useAxios(`${USER_API_URL}/${id}`, 'patch', data);
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: res.data
    });
    toast.success('User updated successfully');
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (Array.isArray(errors)) {
      errors.forEach((error) => toast.error(error.msg));
    } else {
      toast.error(errors)
    }
    dispatch({
      type: UPDATE_USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get One user
export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER });
    const res = await useAxios(`${USER_API_URL}/${id}`);
    dispatch({
      type: GET_USER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Sort Customers
export const sortUsers = (fieldName, dir = 'asc') => (dispatch) => {
  dispatch({
    type: SORT_USERS,
    payload: {fieldName, dir}
  })
}