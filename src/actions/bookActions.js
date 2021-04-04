import axios from "axios";
import {
  BOOKS_FETCH_STARTED,
  BOOKS_FETCH_SUCCESS,
  BOOKS_FETCH_FAIL,
  ADD_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
} from "../actions/actionTypes";
const booksURL = "http://localhost:8000/books";

export const getBooks = (dispatch) => {
  dispatch({ type: BOOKS_FETCH_STARTED });
  axios
    .get(booksURL)
    .then((res) => dispatch({ type: BOOKS_FETCH_SUCCESS, payload: res.data }))
    .catch((err) => dispatch({ type: BOOKS_FETCH_FAIL, payload: err }));
};

export const addBook = (dispatch, book) => {
  //console.log(book);
  axios
    .post(booksURL, book)
    .then((res) => dispatch({ type: ADD_BOOK, payload: book }))
    .catch((err) => dispatch({ type: BOOKS_FETCH_FAIL, payload: err }));
};

export const updateBook = (dispatch, book) => {
  axios
    .put(booksURL + "/" + book.id, book)
    .then((res) => dispatch({ type: UPDATE_BOOK, payload: book }))
    .catch((err) => dispatch({ type: BOOKS_FETCH_FAIL, payload: err }));
};

export const deleteBook = (dispatch, book) => {
  axios
    .delete(booksURL + "/" + book.id)
    .then((res) => dispatch({ type: DELETE_BOOK, payload: book }));
};
//dispatch({ type: BOOKS_FETCH_SUCCESS, payload: res.data })
