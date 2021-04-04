import {
  CATEGORY_FETCH_STARTED,
  CATEGORY_FETCH_SUCCESS,
  CATEGORY_FETCH_FAIL,
} from "../actions/actionTypes";

const initialState = {
  categories: [],
  fetching: false,
  fetched: false,
  error: null,
};

export const categoriesReducer = (state = initialState, action) => {
  if (action.type === CATEGORY_FETCH_STARTED) {
    return {
      ...state,
      fetching: true,
    };
  } else if (action.type === CATEGORY_FETCH_SUCCESS) {
    return {
      ...state,
      fetching: false,
      fetched: true,
      categories: action.payload,
    };
  } else if (action.type === CATEGORY_FETCH_FAIL) {
    return {
      ...state,
      fetching: false,
      fetched: false,
      error: action.payload,
    };
  } else {
    return state;
  }
};
