import {
  BOOKS_FETCH_STARTED,
  BOOKS_FETCH_SUCCESS,
  BOOKS_FETCH_FAIL,
  ADD_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
} from "../actions/actionTypes";

const initialState = {
  books: [],
  fetching: false,
  fetched: false,
  add: false,
  update: false,
  delete: false,
  error: null,
};

export const booksReducer = (state = initialState, action) => {
  if (action.type === BOOKS_FETCH_STARTED) {
    return {
      ...state,
      fetching: true,
      add: false,
      update: false,
      delete: false,
    };
  } else if (action.type === BOOKS_FETCH_SUCCESS) {
    return {
      ...state,
      fetching: false,
      fetched: true,
      books: action.payload,
    };
  } else if (action.type === BOOKS_FETCH_FAIL) {
    return {
      ...state,
      fetching: false,
      fetched: false,
      error: action.payload,
    };
  } else if (action.type === ADD_BOOK) {
    return {
      ...state,
      books: [...state.books, action.payload],
      add: true,
    };
  } else if (action.type === UPDATE_BOOK) {
    const filteredBooks = state.books.filter((book) => {
      if (book.id !== action.payload.id) {
        return true;
      }
    });
    return {
      ...state,
      books: [...filteredBooks, action.payload],
      update: true,
    };
  } else if (action.type === DELETE_BOOK) {
    const filteredBooks = state.books.filter((book) => {
      if (book.id !== action.payload.id) {
        return true;
      }
    });
    return {
      ...state,
      delete: true,
      books: filteredBooks,
    };
  } else {
    return state;
  }
};
