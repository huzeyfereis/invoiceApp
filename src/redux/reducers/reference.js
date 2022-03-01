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
} from '../actions/types';

const initialState = {
  branch: [],
  paymentReason: [],
  paymentType: [],
  phoneType: [],
  pending: false,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_REF_BRANCHES:
    case GET_REF_PAYMENT_REASONS:
    case GET_REF_PAYMENT_TYPES:
    case GET_REF_PHONE_TYPES:
    case ADD_REF_BRANCHES:
    case ADD_REF_PAYMENT_REASONS:
    case ADD_REF_PAYMENT_TYPES:
    case ADD_REF_PHONE_TYPES:
    case UPDATE_REF_BRANCHES:
    case UPDATE_REF_PAYMENT_REASONS:
    case UPDATE_REF_PAYMENT_TYPES:
    case UPDATE_REF_PHONE_TYPES:
    case DELETE_REF_BRANCHES:
    case DELETE_REF_PAYMENT_REASONS:
    case DELETE_REF_PAYMENT_TYPES:
    case DELETE_REF_PHONE_TYPES:
      return {
        ...state,
        pending: true
      };
    case GET_REF_DATA_SUCCESS:
      return {
        ...state,
        [payload.type]: payload.data,
        pending: false
      };
    case GET_REF_DATA_ERRORS:
    case ADD_REF_DATA_ERROR:
    case DELETE_REF_DATA_ERROR:
    case UPDATE_REF_DATA_ERROR:
      return {  
        ...state,
        error: payload,
        pending: false
      };
    case DELETE_REF_DATA_SUCCESS:
      return {
        ...state,
        [payload.type]: state[payload.type].map((ref) =>
          ref.id === payload.id ? payload.data : ref
        ),
        pending: false
      };
    case ADD_REF_DATA_SUCCESS:
      return {
        ...state,
        [payload.type]: [...state[payload.type], payload.data],
        pending: false
      };
    case UPDATE_REF_DATA_SUCCESS:
      return {
        ...state,
        [payload.type]: state[payload.type].map((ref) =>
          ref.id === payload.id ? payload.data : ref
        ),
        pending: false
      };
    default:
      return state;
  }
}
