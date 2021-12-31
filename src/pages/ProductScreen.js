import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../component/HomePageComponent/LoadingBox";
import ErrorBox from "../component/HomePageComponent/ErrorBox";
import { fetchDetailsProduct } from "../redux/actions/productActions";
import RateAssessment from "../component/HomePageComponent/RateAssessment";

export default function ProductScreen(props) {
  const [qty, setQty] = useState(1);

  const productId = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, product, error } = useSelector((state) => state.product);
  const addToCartHandler = () => {
    navigate(`/cart/${productId.id}/${qty}`);
  };
  useEffect(() => {
    dispatch(fetchDetailsProduct(productId.id));
  }, [productId.id, dispatch]);

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <ErrorBox variant="danger">{error}</ErrorBox>
      ) : (
        <div className="row-flix top singleproductmargin">
          <div className="image-box">
            <img
              className="product-image"
              src={product.image}
              alt={product.name}
            ></img>
          </div>
          <div className="detail-price">
            <div className="product-detail">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <RateAssessment productIdd={productId.id} product={product} />
                </li>
                <li>Price : ${product.price}</li>
                <li>
                  Description:
                  <p>{product.description}</p>
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
                              onChange={(e) => {setQty(e.target.value);}}
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
                          onClick={addToCartHandler}
                          className="primary block while-product"
                        >
                          Add to Cart
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
