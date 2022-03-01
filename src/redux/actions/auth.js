import {
  USER_LOADED,
  USER_LOADED_SUCCESS,
  AUTH_ERROR,
  USER_LOGOUT,
  USER_LOGOUT_SUCCESS
} from './types';

// Load User
export const loadUser = () => async (dispatch) => {
  dispatch({
    type: USER_LOADED
  });
  try {
    const okta = JSON.parse(localStorage.getItem('okta-token-storage'));
    const idToken = okta.idToken.idToken;
    const groups = okta.idToken.claims.groups;
    const name = okta.idToken.claims.name;
    const id = okta.idToken.claims.sub;
    const currentBranch = okta.idToken.claims.branch;

    dispatch({
      type: USER_LOADED_SUCCESS,
      payload: { name, idToken, groups, id, currentBranch }
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Load User
export const logOutUser = () => async (dispatch) => {
  dispatch({
    type: USER_LOGOUT
  });
  try {
    dispatch({
      type: USER_LOGOUT_SUCCESS
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};
