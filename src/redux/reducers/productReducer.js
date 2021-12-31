import {
  ActionTypes,
  ADD_RATING,
  AVERAGE_PRODUCT_RATING_FAIL,
  AVERAGE_PRODUCT_RATING_REQUEST,
  AVERAGE_PRODUCT_RATING_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  INFINITE_SCROLL_PRODUCT_REQUEST,
  INFINITE_SCROLL_PRODUCT_SUCCESS,
  INFINITE_SCROLL_PRODUCT__PAGE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  RECOMMENDED_PRODUCT_FAIL,
  RECOMMENDED_PRODUCT_PUSH,
  RECOMMENDED_PRODUCT_REQUEST,
  RECOMMENDED_PRODUCT_SUCCESS,
  SEARCH_PRODUCT,
} from "../contants/action-types";

const initialState = {
  products: [],
  loading: false,
  error: false,
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.PRODUCT_LIST_FAIL:
      return {
        error: payload,
      };
    case ActionTypes.PRODUCT_LIST_REQUEST:
      return {
        loading: true,
      };
    case ActionTypes.PRODUCT_LIST_SUCCESS:
      return {
        products: payload,
      };
    default:
      return state;
  }
};
export const productDetailReducer = (
  state = { product: {}, loading: false, error: false },
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.PRODUCT_DETAIL_FAIL:
      return {
        error: payload,
      };
    case ActionTypes.PRODUCT_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case ActionTypes.PRODUCT_DETAIL_SUCCESS:
      return {
        product: payload,
      };
    default:
      return state;
  }
};

///////// Update Product /////////

export const updateproductReducer = (
  state = { product: {}, loading: false, error: false },
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_UPDATE_FAIL:
      return {
        error: payload,
      };
    case PRODUCT_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        product: payload,
        success: true,
      };
    default:
      return state;
  }
};

export const createproductReducer = (
  state = { product: {}, loading: false, error: false },
  { type, payload }
) => {
  switch (type) {
    case CREATE_PRODUCT_FAIL:
      return {
        error: payload,
      };
    case CREATE_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        product: payload,
        success: true,
      };
    default:
      return state;
  }
};

////////////////// Infinte Scroll Reducer //////////////////

export const InfiniteProductReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.INFINITE_SCROLL_PRODUCT_FAIL:
      return {
        error: payload,
      };
    case INFINITE_SCROLL_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case INFINITE_SCROLL_PRODUCT_SUCCESS:
      return {
        ...state,
        products: payload,
        loading: false,
      };
    case INFINITE_SCROLL_PRODUCT__PAGE_SUCCESS:
      return {
        ...state,
        page: payload,
      };
    case SEARCH_PRODUCT:
      return {
        ...state,
        allSearch: payload,
      };
    case ADD_RATING:
      return {
        ...state,
        rating: payload,
      };
    default:
      return state;
  }
};

export const averageProductReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case AVERAGE_PRODUCT_RATING_FAIL:
      return {
        error: payload,
      };
    case AVERAGE_PRODUCT_RATING_REQUEST:
      return {
        loading: true,
      };
    case AVERAGE_PRODUCT_RATING_SUCCESS:
      return {
        productrating: Math.round(payload),
      };
    default:
      return state;
  }
};

export const deleteProductReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_DELETE_FAIL:
      return {
        error: payload,
      };
    case PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        products: payload,
      };
    default:
      return state;
  }
};

export const recommendedProductReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case RECOMMENDED_PRODUCT_FAIL:
      return {
        error: payload,
      };
    case RECOMMENDED_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case RECOMMENDED_PRODUCT_SUCCESS:
      return {
        ...state,
        recommendedProduct: payload,
      };
    case RECOMMENDED_PRODUCT_PUSH:
      
      return { ...state, recommend: payload };

    default:
      return state;
  }
};
