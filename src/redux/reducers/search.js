import { SET_SEARCH_TERM, SET_SEARCH, LOCATION_CHANGED } from './../actions/types';

const initialState = {
  isActive: null,
  searchTerm: '',
  filtered: [],
  searchCount: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SEARCH:
      return {
        ...state,
        filtered: payload.filtered,
        searchCount: payload.count
      };
    case SET_SEARCH_TERM:
      return {
        ...state,
        isActive: payload.term ? payload.type : null,
        searchTerm: payload.term,
        filtered: payload.term ? state.filtered : [],
        searchCount: payload.term ? state.searchCount : null,

      };
    case LOCATION_CHANGED:
      return initialState;

    default:
      return state;
  }
}
