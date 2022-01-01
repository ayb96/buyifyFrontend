import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { signin } from "../redux/actions/userAction";

import { useNavigate } from "react-router-dom";
import LoadingBox from "../component/HomePageComponent/LoadingBox";
import ErrorBox from "../component/HomePageComponent/ErrorBox";
import { fetchRecommendedData } from "../redux/actions/productActions";
export default function SigninScreen(props) {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state) => state.userSignin);

  const dispatch = useDispatch();

  const handelInput = (e) => {
    e.persist();
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };
  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/";
  useEffect(() => {
    if (userInfo) {
      dispatch(fetchRecommendedData(userInfo._id));
      console.log("userInfo", userInfo);
      console.log("dsdssdsdfds", window.location);
      navigate(redirect);
    }
  }, [redirect, userInfo, navigate, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(inputValue.email, inputValue.password));
  };
  return (
    <>
      <form className="signin-container" onSubmit={submitHandler}>
        <div className="form signin-subcontainer">
          <div>
            <h1>Sign In</h1>
          </div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <ErrorBox variant="danger">Invalid Emal or Password</ErrorBox>}
          <div>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              required
              onChange={handelInput}
            ></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              required
              onChange={handelInput}
            ></input>
          </div>
          <div>
            <label />
            <button className="primary" type="submit">
              Sign In
            </button>
          </div>
          <div>
            <label />
            <div className="Newusers">
              New customer?{" "}
              <Link to={`/register?redirect=${redirect}`} className="Newuser">
                Create your account
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
