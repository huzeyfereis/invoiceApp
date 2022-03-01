import {
    GET_DASHBOARD_BRANCHES,
    GET_DASHBOARD_PAYMENT_REASONS,
    GET_DASHBOARD_PAYMENT_TYPES,
    GET_DASHBOARD_DATE,
    GET_DASHBOARD_DATA_ERRORS,
    GET_DASHBOARD_DATA_SUCCESS
  } from '../actions/types';
  
  const initialState = {
    branch: [],
    paymentReason: [],
    paymentType: [],
    date: [],
    pending: false,
    error: {}
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_DASHBOARD_BRANCHES:
      case GET_DASHBOARD_PAYMENT_REASONS:
      case GET_DASHBOARD_PAYMENT_TYPES:
      case GET_DASHBOARD_DATE:
        return {
          ...state,
          pending: true
        };
      case GET_DASHBOARD_DATA_SUCCESS:
        return {
          ...state,
          [payload.type]: payload.data,
          pending: false
        };
      case GET_DASHBOARD_DATA_ERRORS:
        return {  
          ...state,
          error: payload,
          pending: false
        };
      default:
        return state;
    }
  }
  