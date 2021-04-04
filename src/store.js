import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { booksReducer } from "./reducers/bookReducer";
import { categoriesReducer } from "./reducers/categoriesReducer";

const rootReducer = combineReducers({
  books: booksReducer,
  categories: categoriesReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
