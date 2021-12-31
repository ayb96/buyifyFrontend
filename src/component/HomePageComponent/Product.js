import React, { useEffect } from "react";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import LoadingBox from "./LoadingBox";
import ErrorBox from "./ErrorBox";
import { fetchProducts } from "../../redux/actions/productActions";

export default function Product() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <main>
      <div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <ErrorBox variant="danger">{error}</ErrorBox>
        ) : (
          <div className="row center" >
            {products.products &&
              products.products.map((product) => (
                <div key={product._id} className="card">
                  <div
                    className="imageproduct"
                    size="sm"
                    variant="info"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <img
                      className="medium"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div className="card-body">
                    <div
                      className="a"
                      size="sm"
                      variant="info"
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      <h2>{product.name}</h2>
                    </div>
                    <Rating
                      rating={product.rating}
                      numReviews={product.numReviews}
                    ></Rating>
                    <div className="price">${product.price}</div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </main>
  );
}
