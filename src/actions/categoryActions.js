import axios from "axios";
import {
  CATEGORY_FETCH_STARTED,
  CATEGORY_FETCH_SUCCESS,
  CATEGORY_FETCH_FAIL,
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
