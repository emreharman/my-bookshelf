import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { getBooks } from "../actions/bookActions";

const ListBooks = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooks);
  }, []);

  return (
    <div className="container mt-5">
      {state.fetched && state.books.length > 0 ? (
        <>
          <div className="mt-5 mb-2 d-flex justify-content-end">
            <Link to="/add-book" className="btn btn-primary ">
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
              {state.books.map((book, index) => (
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
