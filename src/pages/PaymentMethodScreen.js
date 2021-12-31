import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../component/CheckoutSteps";
import { savePaymentMethod } from "../redux/actions/cartAction";

export default function PaymentMethodScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userSignin);
  const { shippingAddress } = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  console.log("shippinaddress:", shippingAddress);
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/signin/shipping");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);
  if (!userInfo) {
    navigate("/");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <div className="payment-container">
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form payment-sub" onSubmit={submitHandler}>
        <div>
          <h1 className="label1">Payment Method</h1>
        </div>
        <div>
          <div className="payment-flex">
            <input
              className="payment-input"
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal" className="label1">
              PayPal
            </label>
          </div>
        </div>
        <div>
          <div className="payment-flex">
            <input
              className="payment-input"
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="stripe" className="label1">
              Stripe
            </label>
          </div>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
