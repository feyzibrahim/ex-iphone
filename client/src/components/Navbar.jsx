import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/userActions";
import ExIphoneLogo from "./ExIphoneLogo";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineHistory,
  AiOutlineLogout,
} from "react-icons/ai";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropDown, setDropDown] = useState(false);
  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  const handleLogout = () => {
    toggleDropDown();
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="flex z-10 absolute items-center justify-between py-5 px-5 lg:px-40 font-bold text-gray-500 w-full">
      <div className="w-7 flex items-center cursor-pointer opacity-70 hover:opacity-100">
        <ExIphoneLogo />
      </div>
      <div className="hidden lg:flex gap-10">
        <NavLink className="hover:text-blue-400 px-2 py-1" to="/">
          Home
        </NavLink>
        {!user ? (
          <>
            <NavLink className="hover:text-blue-400 px-2 py-1" to="/contact">
              Contact
            </NavLink>
            <NavLink className="hover:text-blue-400 px-2 py-1" to="/about">
              About
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className="hover:text-blue-400 px-2 py-1" to="/products">
              Products
            </NavLink>
            <NavLink className="hover:text-blue-400 px-2 py-1" to="/og">
              Original Products
            </NavLink>
          </>
        )}
      </div>
      <div className="flex gap-6 items-center relative">
        {user ? (
          <>
            <NavLink to="/cart" className="hover:text-blue-400 p-2">
              <AiOutlineShoppingCart className="text-xl" />
            </NavLink>
            <NavLink to="/wishlist" className="hover:text-blue-400 p-2">
              <AiOutlineHeart className="text-xl" />
            </NavLink>
            <button className="hover:text-blue-400" onClick={toggleDropDown}>
              <AiOutlineUser className="text-xl" />
            </button>
            {dropDown && (
              <div className="absolute top-10 font-normal w-44 bg-white rounded-lg">
                <NavLink
                  to="/profile"
                  className="navbar-drop-ul"
                  onClick={toggleDropDown}
                >
                  <AiOutlineUser className="text-xl" /> Profile
                </NavLink>
                <NavLink
                  to="/order-history"
                  className="navbar-drop-ul"
                  onClick={toggleDropDown}
                >
                  <AiOutlineHistory className="text-xl" /> Order History
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="navbar-drop-ul w-full"
                >
                  <AiOutlineLogout className="text-xl" />
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <NavLink className="hover:text-blue-400 py-1 px-2" to="/login">
              Login
            </NavLink>
            <span className="py-1">|</span>
            <NavLink className="hover:text-blue-400 py-1 px-2" to="/register">
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
