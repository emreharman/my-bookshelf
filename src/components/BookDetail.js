import React from "react";

const BookDetail = (props) => {
  const book = props.location.book;
  const category = props.location.category;
  return (
    <div
      className="container"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="card" style={{ width: "50%" }}>
        <div className="card-header text-center ps-5">
          <span
            className="badge bg-secondary"
            style={{
              cursor: "pointer",
              display: "inline-block",
              float: "left",
            }}
            onClick={() => props.history.push("/")}
          >
            Geri
          </span>
          {book.name} - {book.author}
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item ps-5">
            Yayın Evi &emsp;&emsp;&emsp;&emsp;&emsp;: {book.publisher}
          </li>
          <li className="list-group-item ps-5">
            Kategori &emsp;&emsp;&emsp;&emsp;&emsp;: {category}
          </li>
          <li className="list-group-item ps-5">
            Basım Numarası&emsp;&emsp;: {book.edition.number}
          </li>
          <li className="list-group-item ps-5">
            Basım Yeri &emsp;&emsp;&emsp;&emsp;: {book.edition.place}
          </li>
          <li className="list-group-item ps-5">
            Basım Tarihi &emsp;&emsp;&emsp;: {book.edition.date}
          </li>
          <li className="list-group-item ps-5">
            ISBN &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;: {book.isbn}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BookDetail;
