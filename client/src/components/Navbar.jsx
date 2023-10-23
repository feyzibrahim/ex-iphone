import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logoGrey.png";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/userActions";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    console.log("Logout initiated");
  };

  return (
    <nav className="flex z-10 absolute justify-between py-5 px-5 lg:px-40 font-bold text-gray-500 w-full">
      <div className="w-7 flex items-center cursor-pointer opacity-70 hover:opacity-100">
        <img src={Logo} alt="ex.iphones. logo" />
        <p>ex.iphones.</p>
      </div>
      <div className="hidden lg:flex gap-10">
        <NavLink className="hover:text-gray-300" to="/">
          Home
        </NavLink>
        <NavLink className="hover:text-gray-300" to="/contact">
          Contact
        </NavLink>
        <NavLink className="hover:text-gray-300" to="/about">
          About
        </NavLink>
      </div>
      <div className="flex gap-3">
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <NavLink className="hover:text-gray-300" to="/login">
              Login
            </NavLink>
            <span>|</span>
            <NavLink className="hover:text-gray-300" to="/register">
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
