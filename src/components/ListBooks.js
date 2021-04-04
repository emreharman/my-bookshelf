import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { getBooks } from "../actions/bookActions";

const ListBooks = () => {
  const [isSortAuthor, setIsSortAuthor] = useState(false);
  const state = useSelector((state) => state);
  let sortedBooks = state.books.sort((a, b) => {
    let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  if (isSortAuthor) {
    sortedBooks = state.books.sort((a, b) => {
      let fa = a.author.toLowerCase(),
        fb = b.author.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooks);
  }, []);
  const sortAuthor = () => {
    setIsSortAuthor(!isSortAuthor);
  };
  return (
    <div className="container mt-5">
      {state.fetched && state.books.length > 0 ? (
        <>
          <div className="mt-5 mb-2 d-flex justify-content-evenly">
            <button
              onClick={sortAuthor}
              className="btn btn-outline-primary mr-2"
            >
              Yazara Göre Sırala
            </button>
            <Link to="/add-book" className="btn btn-primary">
              Kitap Ekle
            </Link>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Sıra No</th>
                <th scope="col">Adı</th>
                <th scope="col">Yazarı</th>
                <th scope="col">Yayın Evi</th>
                <th scope="col">Baskı Numarası</th>
                <th scope="col">Basım Yeri ve Tarihi</th>
                <th scope="col">ISBN</th>
                <th scope="col">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {sortedBooks.map((book, index) => (
                <tr key={book.id}>
                  <th>{index + 1}</th>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{book.publisher}</td>
                  <td>{book.edition.number}</td>
                  <td>
                    {book.edition.place} {book.edition.date}
                  </td>
                  <td>{book.isbn}</td>
                  <td>
                    <Link
                      to={{
                        pathname: "/update-book",
                        book: book,
                      }}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Düzenle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ListBooks;
