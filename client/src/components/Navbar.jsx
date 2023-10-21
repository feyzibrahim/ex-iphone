import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logoGrey.png";

const Navbar = () => {
  return (
    <nav className="flex z-10 absolute justify-between py-5 px-5 lg:px-40 font-bold text-gray-500 w-full">
      <div className="w-7 flex items-center">
        <img src={Logo} alt="ex.iphones. logo" />
        <p>ex.iphones.</p>
      </div>
      <div className="hidden lg:flex gap-10">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
      <div className="flex gap-3">
        <NavLink to="/login">Login</NavLink>
        <span>|</span>
        <NavLink to="/register">Sign Up</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
