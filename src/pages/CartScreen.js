import React, { useEffect } from "react";

import { useNavigate, useParams } from "react-router";
import { addToCart, removeFromCart } from "../redux/actions/cartAction";
import ErrorBox from "../component/HomePageComponent/ErrorBox";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";

export default function CartScreen(props) {

  const { userInfo } = useSelector((state) => state.userSignin);

  const { productId, qty } = useParams();
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [productId, dispatch, qty]);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    if (!userInfo) {
      navigate("/signin?redirect=shipping");
    } else {
      navigate("/signin/shipping");
    }
  };
  
  return (
    <>
      <div className="row top cart-container">
        <div className="col-2 cart-sub-1">
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <ErrorBox>
              Cart is empty.<Link to="/">Go Shopping</Link>
            </ErrorBox>
          ) : (
            <ul className="cartItems-container">
              {cartItems.map((item, index) => (
                <li key={index}>
                  <div className="row">
                    <div>
                      <img src={item.image} alt={item.name} className="small" />
                    </div>
                    <div className="min-30">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div>
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>$ {item.price}</div>
                    <div
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <DeleteForeverTwoToneIcon className="removeIcon" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-1 cart-sub-2">
          <div className="card card-body">
            <ul>
              <li>
                <h2 className="subtotal-cart">
                  Subtotal 
                  
                  : 
                  ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </h2>
              </li>
              <li>
                <button
                  type="button"
                  onClick={checkoutHandler}
                  className="primary block"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
