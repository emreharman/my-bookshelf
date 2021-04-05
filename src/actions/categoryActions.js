import axios from "axios";
import {
  CATEGORY_FETCH_STARTED,
  CATEGORY_FETCH_SUCCESS,
  CATEGORY_FETCH_FAIL,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from "../actions/actionTypes";
const categoriesURL = "http://localhost:8000/categories";

export const getCategories = (dispatch) => {
  dispatch({ type: CATEGORY_FETCH_STARTED });
  axios
    .get(categoriesURL)
    .then((res) => {
      dispatch({ type: CATEGORY_FETCH_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: CATEGORY_FETCH_FAIL, payload: err }));
};
export const addCategory = (dispatch, category) => {
  //console.log(book);
  axios
    .post(categoriesURL, category)
    .then((res) => dispatch({ type: ADD_CATEGORY, payload: category }))
    .catch((err) => dispatch({ type: CATEGORY_FETCH_FAIL, payload: err }));
};

export const updateCategory = (dispatch, category) => {
  axios
    .put(categoriesURL + "/" + category.id, category)
    .then((res) => dispatch({ type: UPDATE_CATEGORY, payload: category }))
    .catch((err) => dispatch({ type: CATEGORY_FETCH_FAIL, payload: err }));
};

export const deleteCategory = (dispatch, category) => {
  axios
    .delete(categoriesURL + "/" + category.id)
    .then((res) => dispatch({ type: DELETE_CATEGORY, payload: category }))
    .catch((err) => dispatch({ type: CATEGORY_FETCH_FAIL, payload: err }));
};
