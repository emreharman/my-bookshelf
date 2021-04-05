import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategories,
  addCategory,
  updateCategory,
} from "../actions/categoryActions";
import Loading from "./Loading";

const CategoryOperations = (props) => {
  const state = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");
  const [updatedCategoryName, setUpdatedCategoryName] = useState("");
  const [updatedCategoryId, setUpdatedCategoryId] = useState(0);
  const [isUpdateClick, setIsUpdateClick] = useState(false);
  useEffect(() => {
    dispatch(getCategories);
    setIsUpdateClick(false);
  }, []);

  const handleAdd = () => {
    if (categoryName === "") {
      alert("Kategori Adı Boş Olamaz!");
      return false;
    } else {
      const category = {
        id: state.categories.length + 1,
        name: categoryName,
      };
      dispatch((dispatch) => addCategory(dispatch, category));
      setCategoryName("");
    }
  };
  const handleUpdate = () => {
    const updatedCategory = {
      id: updatedCategoryId,
      name: updatedCategoryName,
    };
    dispatch((dispatch) => updateCategory(dispatch, updatedCategory));
    setIsUpdateClick(false);
  };

  return (
    <div
      className="container mt-5"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{ width: "60%", display: "flex", justifyContent: "flex-end" }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Kategori adını girin"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value.toUpperCase())}
        />
        <button
          className="btn btn-primary"
          style={{ width: "30%" }}
          onClick={handleAdd}
        >
          Kateori Ekle
        </button>
      </div>
      <>
        {isUpdateClick ? (
          <div
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "flex-end",
            }}
            className="mt-5"
          >
            <input
              type="text"
              className="form-control"
              value={updatedCategoryName}
              onChange={(e) =>
                setUpdatedCategoryName(e.target.value.toUpperCase())
              }
            />
            <button
              className="btn btn-primary"
              style={{ width: "30%" }}
              onClick={handleUpdate}
            >
              Güncelle
            </button>
          </div>
        ) : null}
      </>

      <table className="table table-hover mt-5" style={{ width: "70%" }}>
        <thead className="table-light">
          <tr>
            <th scope="col">Sıra No</th>
            <th scope="col">Kategori Adı</th>
            <th scope="col">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {state.fetched ? (
            <>
              {state.categories.map((category, index) => {
                return (
                  <tr key={category.id}>
                    <td>{index + 1}</td>
                    <td>{category.name}</td>
                    <td>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic outlined example"
                      >
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            setIsUpdateClick(true);
                            setUpdatedCategoryName(category.name);
                            setUpdatedCategoryId(parseInt(category.id));
                          }}
                        >
                          Düzenle
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <Loading />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryOperations;
