import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/userActions";
import ExIphoneLogo from "./ExIphoneLogo";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
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
      <div className="flex gap-3">
        {user ? (
          <button
            onClick={handleLogout}
            className="hover:text-blue-400 px-2 py-1"
          >
            Logout
          </button>
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
