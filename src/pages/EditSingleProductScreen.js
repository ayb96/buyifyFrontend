import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../component/HomePageComponent/LoadingBox";
import ErrorBox from "../component/HomePageComponent/ErrorBox";
import {
  fetchDetailsProduct,
  updateProduct,
} from "../redux/actions/productActions";

export default function EditSingleProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [inputValue, setInputValue] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [editTitle, setEditTitle] = useState(false);
  const [editprice, setEditPrice] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const productId = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, product, error } = useSelector((state) => state.product);
  const handelInput = (e) => {
    e.persist();
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });

  };
  const { name, price, description } = inputValue;
  useEffect(() => {
    dispatch(fetchDetailsProduct(productId.id));
  }, [productId.id, dispatch]);

  const handelEditTitle = () => {

    dispatch(updateProduct({ productId: product._id, name }));
    setEditTitle(false);
  };
  const handelEditPrice = () => {
    dispatch(updateProduct({ productId: product._id, price }));
    setEditPrice(false);
  };
  const handelEditDescription = () => {
    dispatch(updateProduct({ productId: product._id, description }));
    setEditDescription(false);
  };

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <ErrorBox variant="danger">{error}</ErrorBox>
      ) : (
        <div className="row-flix top singleproductmargin">
          <div className="image-box">
            <button className="primary hover-edit-product">Edit</button>
            <img
              className="product-image"
              src={product.image}
              alt={product.name}
            ></img>
          </div>
          <div className="detail-price">
            <div className="product-detail update-product">
              <ul>
                <li>
                  {editTitle ? (
                    <div>
                      <input
                        type="text"
                        name="name"
                        defaultValue={product.name}
                        className="edit-product-botton"
                        onChange={handelInput}
                      />
                      <button
                        className="primary edit-product-botton"
                        onClick={handelEditTitle}
                      >
                        Change
                      </button>
                    </div>
                  ) : (
                    <div className="update-title">
                      <h1 className="edit-product-botton">{product.name}</h1>
                      <button
                        className="primary"
                        onClick={() => setEditTitle(true)}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </li>
                
                <li className="update-title">
                  <div className="edit-product-botton">Price :</div>
                  {editprice ? (
                    <div>
                      <input
                        type="text"
                        name="price"
                        className="edit-product-botton"
                        defaultValue={product.price}
                        onChange={handelInput}
                      />
                      <button
                        className="primary edit-product-botton"
                        onClick={handelEditPrice}
                      >
                        Change
                      </button>
                    </div>
                  ) : (
                    <div className="update-title">
                      <div className="edit-product-botton">{product.price}</div>
                      <button
                        className="primary"
                        onClick={() => setEditPrice(true)}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </li>
                <li className="update-title">
                  <div className="edit-product-botton">Description:</div>
                  {editDescription ? (
                    <div>
                      <textarea
                        name="description"
                        onChange={handelInput}
                        defaultValue={product.description}
                        className="edit-product-botton"
                      />
                      <button
                        className="primary "
                        onClick={handelEditDescription}
                      >
                        Change
                      </button>
                    </div>
                  ) : (
                    <div className="update-title">
                      <div className="edit-product-botton">
                        {product.description}
                      </div>
                      <button
                        className="primary"
                        onClick={() => setEditDescription(true)}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </li>
              </ul>
            </div>
            <div>
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row ">
                      <div className="while-product">Price</div>
                      <div className="price while-product">
                        ${product.price}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div className="while-product">Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="error">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div className="while-product">Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={() => navigate("/manageproduct")}
                          className="primary block while-product"
                        >
                          Return
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
