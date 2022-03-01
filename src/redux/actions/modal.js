import { SET_MODAL_SHOW, SET_MODAL_CLOSE } from './types';

export const setModalShow = (data) => async (dispatch) => {
    dispatch({
      type: SET_MODAL_SHOW,
      payload: data
    })
  }
  
  export const setModalClose = () => async (dispatch) => {
    dispatch({ type: SET_MODAL_CLOSE });
  };