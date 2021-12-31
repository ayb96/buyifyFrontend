import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorBox from "../component/HomePageComponent/ErrorBox";

import LoadingBox from "../component/HomePageComponent/LoadingBox";
import { addProduct } from "../redux/actions/productActions";

export default function AddProductScreen() {
  const [inputValue, setInputValue] = useState({
    name: "",
    image: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    countInStock: "",
  });
  const handelInput = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };
  const { name, image, brand, category, description, price, countInStock } =
    inputValue;
  const { loading, error, success } = useSelector(
    (state) => state.CreatePrduct
  );

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addProduct({
        name,
        image,
        brand,
        category,
        description,
        price,
        countInStock,
      })
    );
  };
  return (
    <div>
      <form className="form manage-addprofile-container" onSubmit={submitHandler}>
        <div>
          <h1>Add Product</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <ErrorBox variant="danger">{error}</ErrorBox>
        ) : (
          <>
            {success && (
              <ErrorBox variant="success">
                Product Created Successfully
              </ErrorBox>
            )}
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter name"
                onChange={handelInput}
              ></input>
            </div>
            <div>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                name="image"
                type="text"
                placeholder="Enter Image"
                onChange={handelInput}
              ></input>
            </div>
            <div>
              <label htmlFor="brand">Brand</label>
              <input
                id="brand"
                name="brand"
                type="text"
                placeholder="Enter brand"
                onChange={handelInput}
              ></input>
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <input
                id="category"
                name="category"
                type="text"
                placeholder="Enter category"
                onChange={handelInput}
              ></input>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Enter description"
                onChange={handelInput}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                type="text"
                placeholder="Enter price"
                onChange={handelInput}
              ></input>
            </div>
            <div>
              <label htmlFor="countInStock">Count In Stock</label>
              <input
                id="countInStock"
                name="countInStock"
                type="text"
                placeholder="Enter count In Stock"
                onChange={handelInput}
              ></input>
            </div>

            <div>
              <label />
              <button className="primary" type="submit">
                Add Product
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
