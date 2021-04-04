import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { booksReducer } from "./reducers/bookReducer";

const rootReducer = combineReducers({
  books: booksReducer,
});
const store = createStore(booksReducer, applyMiddleware(thunk, logger));

export default store;
