import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBooks } from "./actions/bookActions";
import Navbar from "./components/Navbar";
import ListBooks from "./components/ListBooks";
import Loading from "./components/Loading";
import AddBook from "./components/AddBook";
import BookUpdate from "./components/BookUpdate";

function App() {
  const booksState = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks);
  }, []);

  return (
    <>
      {booksState.fetched ? (
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={ListBooks} />
            <Route path="/add-book" component={AddBook} />
            <Route path="/update-book" component={BookUpdate} />
          </Switch>
        </Router>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
