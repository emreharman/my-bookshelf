import {
  CATEGORY_FETCH_STARTED,
  CATEGORY_FETCH_SUCCESS,
  CATEGORY_FETCH_FAIL,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "../actions/actionTypes";

const initialState = {
  categories: [],
  fetching: false,
  fetched: false,
  add: false,
  update: false,
  delete: false,
  error: null,
};

export const categoriesReducer = (state = initialState, action) => {
  if (action.type === CATEGORY_FETCH_STARTED) {
    return {
      ...state,
      fetching: true,
      add: false,
      update: false,
      delete: false,
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
  } else if (action.type === ADD_CATEGORY) {
    return {
      ...state,
      categories: [...state.categories, action.payload],
      add: true,
    };
  } else if (action.type === UPDATE_CATEGORY) {
    const filteredCategories = state.categories.filter((category) => {
      if (category.id !== action.payload.id) {
        return true;
      }
    });
    return {
      ...state,
      categories: [...filteredCategories, action.payload],
      update: true,
    };
  } else if (action.type === DELETE_CATEGORY) {
    const filteredCategories = state.categories.filter((category) => {
      if (category.id !== action.payload.id) {
        return true;
      }
    });
    return {
      ...state,
      delete: true,
      categories: filteredCategories,
    };
  } else {
    return state;
  }
};
