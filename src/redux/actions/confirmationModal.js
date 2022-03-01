import { SET_CONFIRMATION_MODAL_SHOW, SET_CONFIRMATION_MODAL_CLOSE } from './types';

export const setConfirmationModalShow = (data) => async (dispatch) => {
  dispatch({
    type: SET_CONFIRMATION_MODAL_SHOW,
    payload: data
  });
};

export const setConfirmationModalClose = () => async (dispatch) => {
  dispatch({ type: SET_CONFIRMATION_MODAL_CLOSE });
};

