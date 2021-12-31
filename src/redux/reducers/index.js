import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderMineListReducer,
  orderPayReducer,
} from "./orderReducer";

import {
  averageProductReducer,
  createproductReducer,
  deleteProductReducer,
  InfiniteProductReducer,
  productDetailReducer,
  productReducer,
  recommendedProductReducer,
  updateproductReducer,
} from "./productReducer";
import {
  userDetailsReducer,
  userRegisterReducer,
  userSinginReducer,
  userUpdateProfileReducer,
} from "./userReducer";

const reducers = combineReducers({
  products: productReducer,
  product: productDetailReducer,
  cart: cartReducer,
  userSignin: userSinginReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  UpdatePrduct: updateproductReducer,
  CreatePrduct: createproductReducer,
  InfiniteScrollPrduct: InfiniteProductReducer,
  ratingAverageProduct: averageProductReducer,
  deletedProduct: deleteProductReducer,
  recommededProduct: recommendedProductReducer,
});

export default reducers;
