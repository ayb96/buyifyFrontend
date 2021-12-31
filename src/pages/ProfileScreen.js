import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorBox from "../component/HomePageComponent/ErrorBox";

import LoadingBox from "../component/HomePageComponent/LoadingBox";
import { detailsUser, updateUserProfile } from "../redux/actions/userAction";
import { USER_UPDATE_PROFILE_RESET } from "../redux/contants/user-constant";

export default function ProfileScreen() {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = inputValue;
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = useSelector((state) => state.userUpdateProfile);

  const handelInput = (e) => {
    e.persist();
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };
  const { userInfo } = useSelector((state) => state.userSignin);
  console.log();
  const { loading, error, user } = useSelector((state) => state.userDetails);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: USER_UPDATE_PROFILE_RESET });
    dispatch(detailsUser(userInfo._id));
  }, [userInfo._id, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and Confirm Password Are Not Matched");
    } else {
      dispatch(updateUserProfile({ userId: user._id, name, email, password }));
    }
  };
  return (
    <div className="manage-profile-container">
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Update User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <ErrorBox variant="danger">{error}</ErrorBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && <ErrorBox variant="danger">{errorUpdate}</ErrorBox>}
            {successUpdate && (
              <ErrorBox variant="success">
                Profile Updated Successfully
              </ErrorBox>
            )}
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter name"
                defaultValue={user.name}
                onChange={handelInput}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                defaultValue={user.email}
                onChange={handelInput}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                onChange={handelInput}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Enter confirm password"
                onChange={handelInput}
              ></input>
            </div>
            <div>
              <label />
              <button className="fix-buttonss" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
