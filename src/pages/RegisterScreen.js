import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ErrorBox from "../component/HomePageComponent/ErrorBox";

import LoadingBox from "../component/HomePageComponent/LoadingBox";
import { register } from "../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
export default function SignupScreen(props) {
  const navigate = useNavigate();
  const { loading, error, userInfo } = useSelector(
    (state) => state.userRegister
  );
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const handelInput = (e) => {
    e.persist();
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (inputValue.password !== inputValue.confirmPassword) {
      alert("Password and comfirm password are not match");
    } else {
      dispatch(
        register(inputValue.name, inputValue.email, inputValue.password)
      );
    }
  };
  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/";
  useEffect(() => {
    if (userInfo) {
      console.log("dsdssdsdfds", window.location);
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <>
      
      <form className="register-container" onSubmit={submitHandler}>
        <div className="form registration-subcontainer">
          <div>
            <h1>Register</h1>
          </div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <ErrorBox>{error}</ErrorBox>}
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              name="name"
              id="name"
              placeholder="Enter name"
              required
              onChange={handelInput}
            ></input>
          </div>
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
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm password"
              required
              onChange={handelInput}
            ></input>
          </div>
          <div>
            <label />
            <button className="primary" type="submit">
              Register
            </button>
          </div>
          <div>
            <label />
            <div className="Newusers">
              Already have an acount?{" "}
              <Link to={`/register?redirect=${redirect}`} className="Newuser">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
