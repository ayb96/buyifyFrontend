import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import LoadingBox from "../component/HomePageComponent/LoadingBox";
import { useNavigate } from "react-router";
import ErrorBox from "../component/HomePageComponent/ErrorBox";
import Rating from "../component/HomePageComponent/Rating";
import InfiniteScroll from "react-infinite-scroll-component";
import { URL } from "../apis/BackendConfig";
export default function CategoryScreen() {
  const [hasMore, sethasMore] = useState(true);
  const [items, setItems] = useState([]);
  const [page, setpage] = useState(2);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const location = useLocation();
  const { loading, error } = useSelector((state) => state.products);
  useEffect(() => {
    setQuery(location.search.slice(8));
  }, [location]);

  useEffect(() => {
    const getArticles = async () => {
      const res = await fetch(`${URL}/api/product?page=1&limit=20&search=${query}`);
      const data = await res.json();
      console.log(data.results);
      setItems(data.results);
    };
    getArticles();
  }, [query]);

  const fetchArticle = async () => {
    const limit = 20;
    const res = await fetch(
      `${URL}/api/product?page=${page}&limit=${limit}&search=${query}`
    );
    const data = await res.json();
    console.log(data.results);

    return data.results;
  };

  const fetchData = async () => {
    const articlesFormServer = await fetchArticle();
    console.log("articlesFormServer", articlesFormServer);
    if (articlesFormServer.length === 0 || articlesFormServer.length < 10) {
      sethasMore(false);
    }

    setItems([...items, ...articlesFormServer]);
    console.log("items", items);
    setpage(page + 1);
  };

  ////////////////////////////////////////////////////

  return (
    <div style={{ backgroundColor: "#272b34" }}>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <ErrorBox variant="danger">{error}</ErrorBox>
      ) : (
        <>
          <InfiniteScroll
            className="main_content"
            style={{ width: "100%" }}
            dataLength={items.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<div className="loading-inf">Loading...</div>}
            endMessage={
              <div className="end-message-scroll">
                <b>Yay! You have seen all our products</b>
              </div>
            }
          >
            {items &&
              items.map((product) => (
                <div
                  key={product._id}
                  className="card"
                  onClick={() => {
                    setItems([]);
                    navigate(`/product/${product._id}`);
                  }}
                >
                  <div className="card_img">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="card_header">
                    <h2>{product.name}</h2>
                    <Rating
                      rating={product.rating}
                      numReviews={product.numReviews}
                    ></Rating>
                    <p className="price">${product.price}</p>
                    <div className="btn">View Product</div>
                  </div>
                </div>
              ))}
          </InfiniteScroll>
        </>
      )}
    </div>
  );
}
