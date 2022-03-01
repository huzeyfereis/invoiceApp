import { SET_CONFIRMATION_MODAL_SHOW, SET_CONFIRMATION_MODAL_CLOSE } from '../actions/types';

const initialState = {
  isOpen: false,
  heading: '',
  type: '',
  id: '',
  values: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CONFIRMATION_MODAL_SHOW:
      return {
        ...state,
        isOpen: true,
        heading: payload.confirmationHeading,
        type: payload.confirmationType,
        id: payload.id,
        values: payload.values
      };

    case SET_CONFIRMATION_MODAL_CLOSE:
      return { ...initialState };
    default:
      return state;
  }
}
