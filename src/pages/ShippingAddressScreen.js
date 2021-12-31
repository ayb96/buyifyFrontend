import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CheckoutSteps from "../component/CheckoutSteps";
import { saveShippingAddress } from "../redux/actions/cartAction";

export default function ShippingAddressScreen() {
  const { userInfo } = useSelector((state) => state.userSignin);
  const { shippingAddress } = useSelector((state) => state.cart);
  console.log(shippingAddress);
  const [inputValue, setInputValue] = useState({
    fullName: shippingAddress.fullName,
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //////////protected route ////////////
  if (!userInfo) {
    navigate("/signin");
  }

  /////////////////////////////////////
  const handelInput = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress(
        inputValue.fullName,
        inputValue.address,
        inputValue.city,
        inputValue.postalCode,
        inputValue.country
      )
    );
    navigate("/payment");
  };

  return (
    <div className="shippingtest">
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form shippingtest-input" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter full name"
            value={inputValue.fullName}
            onChange={handelInput}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter address"
            value={inputValue.address}
            onChange={handelInput}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Enter city"
            value={inputValue.city}
            onChange={handelInput}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            placeholder="Enter postal code"
            value={inputValue.postalCode}
            onChange={handelInput}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            placeholder="Enter country"
            value={inputValue.country}
            onChange={handelInput}
            required
          ></input>
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
