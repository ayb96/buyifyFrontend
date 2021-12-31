import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import AddShoppingCartTwoToneIcon from "@material-ui/icons/AddShoppingCartTwoTone";
import { signout } from "../../redux/actions/userAction";
import { SEARCH_PRODUCT } from "../../redux/contants/action-types";

export const Header = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userSignin);
  const [searchtest, setSearchtest] = useState("");
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout(navigate));
  };

  return (
    <div className="header-all-container">
      <header className="row">
        <div className="brand">
          {/* <AppNav /> */}
          <Link to="/">
            <p>Buyify</p>
          </Link>
        </div>
        <div className="search">
          <input
            type="text"
            className="input-search"
            placeholder="Search for products"
            onChange={(e) => setSearchtest(e.target.value)}
          />
          <div className="icon-search">
            <button
              className="icon-search"
              onClick={() =>
                dispatch({ type: SEARCH_PRODUCT, payload: searchtest })
              }
              disabled={searchtest.length === 0}
            >
              <SearchIcon />
            </button>
          </div>
        </div>

        <div className="testIconz">
          <div>
            <Link to="/cart">
              <AddShoppingCartTwoToneIcon className="cartIcon" />
              {cartItems.length > 0 && (
                <span className="signinname"> ({cartItems.length})</span>
              )}
            </Link>
          </div>
          <>
            {userInfo ? (
              <div className="dropdown">
                <Link to="">
                  <p className="name-signout">
                    {userInfo.name} <i className="fa fa-caret-down"></i>
                  </p>{" "}
                </Link>
                <ul className="dropdown-content">
                  {!userInfo.isAdmin && (
                    <li>
                      <Link to="/profile">Update Profile</Link>
                    </li>
                  )}

                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="/profile">Edit Profile</Link>
                  </li>
                  {userInfo.isAdmin && (
                    <li>
                      <Link to="/addProduct">Add Product</Link>
                    </li>
                  )}
                  {userInfo.isAdmin && (
                    <li>
                      <Link to="/manageproduct">Manage Product</Link>
                    </li>
                  )}

                  <li>
                    <Link to="/" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <Link to="/signin">
                  <p className="name-signout">Sign in</p>
                </Link>
              </div>
            )}
          </>
        </div>
      </header>
    </div>
  );
};
