import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBook, deleteBook } from "../actions/bookActions";

const BookUpdate = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const book = props.location.book;
  const [name, setName] = useState(book.name);
  const [author, setAuthor] = useState(book.author);
  const [publisher, setPublisher] = useState(book.publisher);
  const [editionNumber, setEditionNumber] = useState(book.edition.number);
  const [editionPlace, setEditionPlace] = useState(book.edition.place);
  const [editionDate, setEditionDate] = useState(book.edition.date);
  const [isbn, setIsbn] = useState(book.isbn);
  const [categoryId, setCategoryId] = useState(book.categoryId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBook = {
      id: book.id,
      name,
      author,
      publisher,
      edition: {
        number: editionNumber,
        place: editionPlace,
        date: editionDate,
      },
      isbn,
      categoryId: parseInt(categoryId),
    };
    if (state.books.update === false) {
      dispatch((dispatch) => updateBook(dispatch, updatedBook));
    }
  };
  const handleDelete = () => {
    dispatch((dispatch) => deleteBook(dispatch, book));
  };
  useEffect(() => {
    if (state.books.update || state.books.delete) {
      props.history.push("/");
    }
  });
  return (
    <div className="mt-5 container d-flex-column justify-content-center">
      <h4 className="text-center">Kitap Ekle</h4>
      <form onSubmit={handleSubmit} className="mt-5 container w-60">
        <div className="row container mt-5">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Kitap Adı"
              aria-label="Kitap Adı"
              required
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Yazar Adı"
              aria-label="Yazar Adı"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <div className="row container mt-5">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Yayınevi"
              aria-label="Yayınevi"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value.toUpperCase())}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Baskı Numarası"
              aria-label="Baskı Numarası"
              value={editionNumber}
              onChange={(e) => setEditionNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="row container mt-5">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Basım Yeri"
              aria-label="Basım Yeri"
              value={editionPlace}
              onChange={(e) => setEditionPlace(e.target.value.toUpperCase())}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Baskı Yılı"
              aria-label="Baskı Yılı"
              value={editionDate}
              onChange={(e) => setEditionDate(e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <div className="row container mt-5">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="ISBN"
              aria-label="ISBN"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />
          </div>
          <div className="col">
            <select
              className="form-select"
              aria-label="Default select example"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {state.categories.categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div
          className="row mt-5"
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <input
            onClick={handleDelete}
            type="button"
            className="btn btn-outline-danger w-25"
            value="Kitabı Sil"
          />
          <button type="submit" className="btn btn-outline-primary w-25">
            Güncelle
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookUpdate;
