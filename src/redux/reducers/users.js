import {
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    GET_USERS_ERROR,
    GET_USERS_SUCCESS,
    GET_USERS,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR,
    ADD_USER_SUCCESS,
    ADD_USER,
    ADD_USER_ERROR,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    SORT_USERS
  } from '../actions/types';
  import { sortAsc, sortDesc } from './helper'
  
  const initialState = {
    users: [],
    user: {},
    pending: false,
    error: {}
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_USERS:
      case DELETE_USER:
      case ADD_USER:
      case UPDATE_USER:
      case GET_USER:
        return {
          ...state,
          pending: true
        };
      case GET_USERS_SUCCESS:
        return {
          ...state,
          users: payload,
          pending: false
        };
      case GET_USERS_ERROR:
      case DELETE_USER_ERROR:
      case ADD_USER_ERROR:
      case UPDATE_USER_ERROR:
      case GET_USER_ERROR:
        return {
          ...state,
          error: payload,
          pending: false
        };
      case DELETE_USER_SUCCESS:
        return {
          ...state,
          users: state.users.map((user) =>
            user.id === payload.id ? { ...payload } : user
          ),
          pending: false
        };
      case ADD_USER_SUCCESS:
        return {
          ...state,
          users: [...state.users, payload],
          pending: false
        };
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          users: state.users.map((user) =>
            user.id === payload.id ? { ...payload } : user
          ),
          user: payload,
          pending: false
        };
      case GET_USER_SUCCESS:
        return {
          ...state,
          user: payload,
          pending: false
        };    
      case SORT_USERS:
        const { fieldName, dir} = payload
        let sorted = dir === 'asc' ? sortAsc(state.users, fieldName) : sortDesc(state.users, fieldName)
        return {
          ...state,
          users: sorted
        }  
      default:
        return state;
    }
  }
  