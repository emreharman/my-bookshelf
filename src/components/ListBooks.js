import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { getBooks } from "../actions/bookActions";
import { getCategories } from "../actions/categoryActions";

const ListBooks = () => {
  const [isSortAuthor, setIsSortAuthor] = useState(false);
  const [searchBar, setSearchBar] = useState("");
  const state = useSelector((state) => state);
  let sortedBooks = state.books.books.sort((a, b) => {
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
    sortedBooks = state.books.books.sort((a, b) => {
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
  const filteredBooks = sortedBooks.filter((book) => {
    if (
      book.name.includes(searchBar) ||
      book.author.includes(searchBar) ||
      book.publisher.includes(searchBar)
    ) {
      return true;
    }
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooks);
    dispatch(getCategories);
  }, []);
  const sortAuthor = () => {
    setIsSortAuthor(!isSortAuthor);
  };
  return (
    <div className="container mt-5">
      {state.books.fetched && state.categories.fetched ? (
        <>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
            className="mb-5"
          >
            <div style={{ width: "40%" }}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Aramak istediğiniz kitap ya da yazarı girin"
                aria-label="Search"
                value={searchBar}
                onChange={(e) => setSearchBar(e.target.value.toUpperCase())}
              ></input>
            </div>
            <div className="btn-group" style={{ width: "40%" }}>
              <button onClick={sortAuthor} className="btn btn-outline-primary">
                Yazara Göre Sırala
              </button>
              <Link
                to="/category-operations"
                className="btn btn-outline-primary"
              >
                Kategori İşlemleri
              </Link>
              <Link to="/add-book" className="btn btn-primary">
                Kitap Ekle
              </Link>
            </div>
          </div>
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th scope="col">Sıra No</th>
                <th scope="col">Adı</th>
                <th scope="col">Yazarı</th>
                <th scope="col">Yayın Evi</th>
                <th scope="col">Kategori</th>
                <th scope="col">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length == 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    Eşleşen Sonuç Yok
                  </td>
                </tr>
              )}
              {filteredBooks.map((book, index) => {
                const category = state.categories.categories.find(
                  (category) => {
                    if (category.id == book.categoryId) {
                      return true;
                    }
                  }
                );
                return (
                  <tr key={book.id}>
                    <th>{index + 1}</th>
                    <td>{book.name}</td>
                    <td>{book.author}</td>
                    <td>{book.publisher}</td>
                    <td>{category.name}</td>
                    <td>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic outlined example"
                      >
                        <Link
                          to={{
                            pathname: "/book-detail",
                            book: book,
                            category: category.name,
                          }}
                          className="btn btn-light btn-sm mr-1"
                        >
                          Detay
                        </Link>
                        <Link
                          to={{
                            pathname: "/update-book",
                            book: book,
                          }}
                          className="btn btn-primary btn-sm"
                        >
                          Düzenle
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
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
