import axios from "axios";
import urlAxios from "../../apis/axiosApi";
import {
  ActionTypes,
  AVERAGE_PRODUCT_RATING_FAIL,
  AVERAGE_PRODUCT_RATING_REQUEST,
  AVERAGE_PRODUCT_RATING_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_RATING_FAIL,
  CREATE_PRODUCT_RATING_REQUEST,
  CREATE_PRODUCT_RATING_SUCCESS,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  INFINITE_SCROLL_PRODUCT_FAIL,
  INFINITE_SCROLL_PRODUCT_REQUEST,
  INFINITE_SCROLL_PRODUCT_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  RECOMMENDED_PRODUCT_FAIL,
  RECOMMENDED_PRODUCT_REQUEST,
  RECOMMENDED_PRODUCT_SUCCESS,
} from "../contants/action-types";

export const fetchProducts = (query) => {
  console.log("action search", query);
  return async function (dispatch) {
    try {
      dispatch({ type: ActionTypes.PRODUCT_LIST_REQUEST });
      const response = await urlAxios.get(
        `/api/product?page=1&limit=20&search=${query}`
      );
      console.log(response.data.results);
      const data = response.data;
      dispatch({ type: ActionTypes.PRODUCT_LIST_SUCCESS, payload: data });
    } catch (err) {
      console.log(err);
      dispatch({ type: ActionTypes.PRODUCT_LIST_FAIL, payload: err.message });
    }
  };
};

export const fetchDetailsProduct = (productId) => {
  return async function (dispatch) {
    try {
      dispatch({ type: ActionTypes.PRODUCT_DETAIL_REQUEST });
      const response = await urlAxios.get(`/api/product/${productId}`);
      const data = response.data;

      dispatch({ type: ActionTypes.PRODUCT_DETAIL_SUCCESS, payload: data });
    } catch (err) {
      console.log("show me the", err);
      dispatch({
        type: ActionTypes.PRODUCT_DETAIL_FAIL,
        payload:
          err.response && err.response.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

//////////////// product update //////////////////
export const updateProduct = (product) => async (dispatch, getState) => {
  console.log(product);
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await urlAxios.put(`/api/product/profile`, product, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    dispatch({ type: ActionTypes.PRODUCT_DETAIL_SUCCESS, payload: data });
    //localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_UPDATE_FAIL, payload: message });
  }
};

//////////////////add product/////////////////

export const addProduct = (product) => async (dispatch, getState) => {
  console.log(product);
  dispatch({ type: CREATE_PRODUCT_REQUEST, payload: product });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await urlAxios.post("/api/product", product, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log("show me the data:", data);
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (err) {
    console.log("show me the error:", err);

    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload:
        err.response && err.response.message
          ? err.response.data.message
          : err.message,
    });
  }
};

/////////////////// Infinite Scroll ///////////////////

export const InfiniteFetchProducts = (page) => {
  console.log("action search", page);
  return async function (dispatch) {
    try {
      dispatch({ type: INFINITE_SCROLL_PRODUCT_REQUEST });
      const response = await urlAxios.get(`/api/product?page=${page}&limit=20`);
      const data = response.data;

      dispatch({
        type: INFINITE_SCROLL_PRODUCT_SUCCESS,
        payload: { ...data, page },
      });

      // dispatch({
      //   type: INFINITE_SCROLL_PRODUCT__PAGE_SUCCESS,
      //   payload: next,
      // });
    } catch (err) {
      console.log(err);
      dispatch({ type: INFINITE_SCROLL_PRODUCT_FAIL, payload: err.message });
    }
  };
};

const fetchArticle = async (page) => {
  const limit = 20;
  const res = await fetch(`/api/product?page=${page}&limit=${limit}`);
  const data = await res.json();
  console.log(data.results);

  return data;
};
export const fetchData = (page) => async (dispatch, getState) => {
  const {
    InfiniteScrollPrduct: { products },
  } = getState();
  const page = products.page + 1;
  console.log(page);
  const articlesFormServer = await fetchArticle(page);
  console.log("articlesFormServer", articlesFormServer);
  // if (articlesFormServer.length === 0 || articlesFormServer.length < 10) {
  //   sethasMore(false);
  // }
  console.log("whyyyyyyyy");

  if (products.results) {
    console.log([...products.results, ...articlesFormServer.results]);
    const data = [...products.results, ...articlesFormServer.results];

    dispatch({
      type: INFINITE_SCROLL_PRODUCT_SUCCESS,
      payload: { data, page },
    });
  }
};

//////////////////////////rating ///////////////////////////
export const addRating = (productId) => async (dispatch, getState) => {
  const {
    InfiniteScrollPrduct: { rating },
  } = getState();
  console.log(productId, rating);

  dispatch({ type: CREATE_PRODUCT_RATING_REQUEST, payload: productId, rating });
  const {
    userSignin: { userInfo },
  } = getState();
  console.log(userInfo);
  const ratedata = { id: productId, rating, userId: userInfo._id };
  try {
    const { data } = await urlAxios.post("/api/rating", ratedata);
    console.log("show me the data:", data);

    dispatch({ type: CREATE_PRODUCT_RATING_SUCCESS, payload: data });
  } catch (err) {
    console.log("show me the error:", err);

    dispatch({
      type: CREATE_PRODUCT_RATING_FAIL,
      payload:
        err.response && err.response.message
          ? err.response.data.message
          : err.message,
    });
  }
};

///////////// Average Rating /////////////

export const RatingDetailsProduct = (productId) => {
  return async function (dispatch, getState) {
    try {
      dispatch({ type: AVERAGE_PRODUCT_RATING_REQUEST });
      const response = await urlAxios.get(`/api/rating/${productId}`);
      const data = response.data;
      console.log("averageeeeeee:", response.data);

      ////////rating average ///////

      const ratingsum = data.reduce((a, b) => ({
        rating: a.rating + b.rating,
      }));
      console.log("ratingsummmmmmmmmmmmm", ratingsum.rating);
      const ratingelementnumber = data.length;
      console.log("ratingelementnumber", ratingelementnumber);
      const avereagerating = ratingsum.rating / ratingelementnumber;
      console.log("avereagerating", avereagerating);
      const averagerounde = {
        avereagerating: Math.round(avereagerating),
        productId: productId,
      };
      ////////update average rating in database /////////////
      const {
        userSignin: { userInfo },
      } = getState();
      const { dataz } = await urlAxios.put(`/api/product/profile`, averagerounde, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      console.log(dataz);
      //////////////////////////////
      //////////////////////////////

      dispatch({ type: AVERAGE_PRODUCT_RATING_SUCCESS, payload: data });
    } catch (err) {
      console.log("show me the", err);
      dispatch({
        type: AVERAGE_PRODUCT_RATING_FAIL,
        payload: 1,
      });
    }
  };
};

////////////// Delete Product //////////////

export const deleteProduct = (id) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    await urlAxios.delete(`/api/product/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    //const newData = getState().orders.orders.filter((item) => item.id != id);
    //dispatch({ type: ActionTypes.FETCH_ORDERS, payload: newData });
  } catch (err) {
    if (err.response && !err.response.success) {
      console.log(err.response.message);
    } else {
      console.log(err.message);
    }
  }
};

////////////// fetch recommendayion data //////////////

export const fetchRecommendedData = (userId) => async (dispatch, getState) => {
  dispatch({ type: RECOMMENDED_PRODUCT_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(
      `http://localhost:7000/ReadCSV/${userInfo._id}`

      // {
      //   headers: { Authorization: `Bearer ${userInfo.token}` },
      // }
    );

    dispatch({ type: RECOMMENDED_PRODUCT_SUCCESS, payload: data.message });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: RECOMMENDED_PRODUCT_FAIL, payload: message });
  }
};
