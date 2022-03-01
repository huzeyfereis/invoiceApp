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
} from './../actions/types';

const initialState = {
  receipts: [],
  receipt: {},
  pending: false,
  error: {},
  count: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_RECEIPTS:
    case ADD_RECEIPT:
    case UPDATE_RECEIPT:
    case GET_RECEIPT:
      return {
        ...state,
        pending: true
      };
    case GET_RECEIPTS_SUCCESS:
      return {
        ...state,
        receipts: payload.data,
        count: payload.count,
        pending: false
      };
    case GET_RECEIPTS_ERROR:
    case ADD_RECEIPT_ERROR:
    case UPDATE_RECEIPT_ERROR:
    case GET_RECEIPT_ERROR:
      return {
        ...state,
        error: payload,
        pending: false
      };

    case ADD_RECEIPT_SUCCESS:
      return {
        ...state,
        receipts: [payload, ...state.receipts],
        pending: false
      };
    case UPDATE_RECEIPT_SUCCESS:
      return {
        ...state,
        receipts: state.receipts.map((receipt) =>
          receipt.id === payload.id ? { ...payload } : receipt
        ),
        receipt: payload,
        pending: false
      };
    case GET_RECEIPT_SUCCESS:
      return {
        ...state,
        receipt: payload,
        pending: false
      };

    default:
      return state;
  }
}
