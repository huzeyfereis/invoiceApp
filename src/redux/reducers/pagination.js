import {
  SET_PAGINATION_PAGE,
  SET_PAGINATION_ITEMS,
  SET_PAGINATION_SIZE,
} from './../actions/types';

const initialState = {
  activePage: 1,
  pageSize: 20,
  pageOfItems: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_PAGINATION_PAGE:
      return {
        ...state,
        activePage: payload
      };
    case SET_PAGINATION_ITEMS:
      return {
        ...state,
        pageOfItems: payload
      };
    case SET_PAGINATION_SIZE:
      return {
        ...state,
        pageSize: payload
      };
    default:
      return state;
  }
}
