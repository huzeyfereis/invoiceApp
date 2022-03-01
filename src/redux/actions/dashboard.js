import { useAxios } from '../../helper/useAxios';
import {
  GET_DASHBOARD_BRANCHES,
  GET_DASHBOARD_PAYMENT_REASONS,
  GET_DASHBOARD_PAYMENT_TYPES,
  GET_DASHBOARD_DATE,
  GET_DASHBOARD_DATA_ERRORS,
  GET_DASHBOARD_DATA_SUCCESS
} from './types';

const RECEIPT_DATA_API = process.env.REACT_APP_RECEIPT_API;
// Get Dashboard Data
export const getDashboardData = (type) => async (dispatch) => {
  let actionType = '';
  let url = RECEIPT_DATA_API;
  switch (type) {
    case 'branch':
      actionType = GET_DASHBOARD_BRANCHES;
      break;
    case 'paymentReason':
      actionType = GET_DASHBOARD_PAYMENT_REASONS;
      break;
    case 'paymentType':
      actionType = GET_DASHBOARD_PAYMENT_TYPES;
      break;
    case 'date':
      actionType = GET_DASHBOARD_DATE;
      break;
    default:
      break;
  }
  try {
    dispatch({ type: actionType });

    const res = await useAxios(`${url}/dashboard?ref=${type}`);
    dispatch({
      type: GET_DASHBOARD_DATA_SUCCESS,
      payload: { type: type, data: res.data }
    });
  } catch (err) {
    dispatch({
      type: GET_DASHBOARD_DATA_ERRORS,
      payload: { msg: err.response?.statusText, status: err.response?.status }
    });
  }
};

