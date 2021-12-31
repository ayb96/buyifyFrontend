import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorBox from "../component/HomePageComponent/ErrorBox";

import LoadingBox from "../component/HomePageComponent/LoadingBox";
import { detailsUser } from "../redux/actions/userAction";

export default function EditWebsiteInfo() {
  const { userInfo } = useSelector((state) => state.userSignin);
  console.log();
  const { loading, error, user } = useSelector((state) => state.userDetails);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  }, [userInfo._id, dispatch]);

  const submitHandler = () => {};
  return (
    <div>
      <form className="form user-profile" onSubmit={submitHandler}>
        <div>
          <h1>Manage website Information</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <ErrorBox variant="danger">{error}</ErrorBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={user.name}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={user.email}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Enter confirm password"
              ></input>
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
