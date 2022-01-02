import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import ErrorBox from "../component/HomePageComponent/ErrorBox";
import LoadingBox from "../component/HomePageComponent/LoadingBox";
import { detailsOrder, payOrder } from "../redux/actions/orderAction";

import urlAxios from "../apis/axiosApi";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../redux/contants/order-constant";

export default function OrderScreen(props) {
  const { orderId } = useParams();

  const [sdkReady, setSdkReady] = useState(false);
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = useSelector((state) => state.orderPay);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await urlAxios.get("/api/config/paypal");

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, sdkReady, order, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <ErrorBox variant="danger">{error}</ErrorBox>
  ) : (
    <div className="order-screen-container">
      <div className="order-id">
        <h1>Order {order._id.slice(10)}</h1>
      </div>

      <div className="row top">
        <div className="col-2 order-screen-box-1">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <ErrorBox variant="success">
                    Delivered at {order.deliveredAt}
                  </ErrorBox>
                ) : (
                  <ErrorBox variant="danger">Not Delivered</ErrorBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <ErrorBox variant="success">
                    Paid at {order.paidAt.slice(0, 10)}
                  </ErrorBox>
                ) : (
                  <ErrorBox variant="danger">Not Paid</ErrorBox>
                )}
              </div>
            </li>
            <li>
              <div className="card ">
                <h2>Order Items</h2>
                <ul className="order-screen-overflow">
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`} style={{color:"#fe8033"}}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1 order-screen-box-2">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <ErrorBox variant="danger">{errorPay}</ErrorBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                        onClick={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
