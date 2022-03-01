import {
  USER_LOADED,
  USER_LOADED_SUCCESS,
  AUTH_ERROR,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT
} from './../actions/types';

const initialState = {
  token: null,
  isAuthenticated: null,
  loading: false,
  name: '',
  id: '',
  groups: [],
  currentBranch: ''
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
    case USER_LOGOUT:
      return {
        ...state,
        loading: true
      };
    case USER_LOADED_SUCCESS:
      return {
        isAuthenticated: true,
        loading: false,
        token: payload.idToken,
        name: payload.name,
        groups: payload.groups,
        id: payload.id,
        currentBranch: payload.currentBranch
      };

    case AUTH_ERROR:
    case USER_LOGOUT_SUCCESS:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
