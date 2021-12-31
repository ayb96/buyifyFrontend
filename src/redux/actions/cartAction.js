
import urlAxios from "../../apis/axiosApi";
import {
  ADD_TO_CART,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../contants/cart-constant";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  
  const { data } = await urlAxios.get(`/api/product/${productId}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: "CART_REMOVE_ITEM", payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress =
  (fullName, address, city, postalCode, country) => (dispatch) => {
    const data = { fullName, address, city, postalCode, country };
    console.log(data);
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
    localStorage.setItem("shippingAddress", JSON.stringify(data));
  };

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
