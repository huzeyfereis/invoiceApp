import { SET_PAGINATION_PAGE, SET_PAGINATION_SIZE, SET_PAGINATION_ITEMS } from './types';

export const setPage = (page) => async (dispatch) => {
  dispatch({
    type: SET_PAGINATION_PAGE,
    payload: page
  });
};

export const setPageSize = (size) => async (dispatch) => {
  dispatch({
    type: SET_PAGINATION_SIZE,
    payload: size
  });
};

export const setPageItems = (size) => async (dispatch) => {
  dispatch({
    type: SET_PAGINATION_ITEMS,
    payload: size
  });
};
