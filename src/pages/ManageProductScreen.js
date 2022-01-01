import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { deleteProduct } from "../redux/actions/productActions";

import InfiniteScroll from "react-infinite-scroll-component";
import { URL } from "../apis/BackendConfig";

const ManageProductScreen = () => {
  const { allSearch } = useSelector((state) => state.InfiniteScrollPrduct);

  const [hasMore, sethasMore] = useState(true);
  const [items, setItems] = useState([]);
  const [page, setpage] = useState(2);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getArticles = async () => {
      const res = await fetch(
        `${URL}/api/product?page=1&limit=20&allsearch=${allSearch}`
      );
      const data = await res.json();

      setItems(data.results);
    };
    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getArticles = async () => {
      const res = await fetch(
        `${URL}/api/product?page=1&limit=20&allsearch=${allSearch}`
      );
      const data = await res.json();

      setItems(data.results);
    };
    getArticles();
  }, [allSearch]);

  ////////////////////////////////////////////////

  const fetchArticle = async () => {
    const limit = 20;
    const res = await fetch(
      `${URL}/api/product?page=${page}&limit=${limit}&allsearch=${allSearch}`
    );
    const data = await res.json();

    return data.results;
  };

  const fetchData = async () => {
    const articlesFormServer = await fetchArticle();

    if (articlesFormServer.length === 0 || articlesFormServer.length < 10) {
      sethasMore(false);
    }

    setItems([...items, ...articlesFormServer]);

    setpage(page + 1);
  };

  /////////////////////////////////////////////

  return (
    <div
      className="main_content"
      style={{ backgroundColor: "#272b34", width: "100vw" }}
    >
      <>
        <InfiniteScroll
          className="main_content"
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
            items.map((product) => {
              return (
                <div key={product._id} className="card">
                  <div className="card_img">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="card_header">
                    <h2>{product.name}</h2>

                    <p className="price">${product.price}</p>
                    <div style={{ display: "flex" }}>
                      <div
                        className="btn"
                        onClick={() => {
                          navigate(`/editproduct/${product._id}`);
                        }}
                      >
                        Edit Product
                      </div>
                      <div
                        className="btn delete-btn"
                        onClick={() => {
                          dispatch(deleteProduct(product._id));
                        }}
                      >
                        Delete Product
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </InfiniteScroll>
      </>
    </div>
  );
};
export default ManageProductScreen;
