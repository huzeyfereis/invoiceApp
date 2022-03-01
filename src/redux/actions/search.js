import { useAxios } from '../../helper/useAxios';
import { toast } from 'react-toastify';

import { SET_SEARCH_TERM, SET_SEARCH, LOCATION_CHANGED } from './types';
const RECEIPTS_API_URL = process.env.REACT_APP_RECEIPT_API;

export const setSearchTerm = (term, type) => async (dispatch) => {
  dispatch({
    type: SET_SEARCH_TERM,
    payload: { term, type }
  });
};

export const setSearch = (term, data, type, skip, limit) => async (dispatch) => {
  let filtered = [];
  let count = null;
  if (type === 'searchCustomers') {
    filtered = data.filter((customer) => {
      return (
        customer.firstName.toLowerCase().includes(term.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(term.toLowerCase())
      );
    });
  }
  if (type === 'searchManager') {  
    filtered = data.filter((user) => {
      return (
        user.firstName.toLowerCase().includes(term.toLowerCase()) ||
        user.lastName.toLowerCase().includes(term.toLowerCase())
        );
      });
  }
  if (type === 'searchReceiptsById') {
    try {
      const res = await useAxios(`${RECEIPTS_API_URL}/${data}`);
      filtered = [res.data];
      count = 1;
    } catch (err) {
      count = 1;
      toast.error(`There is no receipt with ${data} number`);
    }
  }
  if (type === 'searchReceiptsByName') {
    try {
      const res = await useAxios(
        `${RECEIPTS_API_URL}/search?skip=${skip}&limit=${limit}&name=${data}`
      );
      filtered = res.data.data;
      count = res.data.count;
      if(!filtered.length) {
        throw Object.assign(
          new Error('No receipt'),
          { code: 404 }
       );
      } 
    } catch (error) {
      count = 1;
      toast.error(`There is no receipt with ${data} name`);
    }
  }
  dispatch({
    type: SET_SEARCH,
    payload: { filtered, count }
  });
};

export const setLocationChanged = () => async (dispatch) => {
  dispatch({
    type: LOCATION_CHANGED
  });
};
