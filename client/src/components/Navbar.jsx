import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { debounce } from "time-loom";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/userActions";
import ExIphoneLogo from "./ExIphoneLogo";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineHistory,
  AiOutlineLogout,
  AiOutlineHome,
  AiOutlineWallet,
} from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import { GiHamburgerMenu, GiMailbox } from "react-icons/gi";
import { BiHistory, BiUser } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { MdTrackChanges } from "react-icons/md";
import { TiTicket } from "react-icons/ti";
import OutsideTouchCloseComponent from "./OutsideTouchCloseComponent";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropDown, setDropDown] = useState(false);
  const toggleDropDown = debounce(() => {
    setDropDown(!dropDown);
  }, 100);

  const handleLogout = () => {
    toggleDropDown();
    dispatch(logout());
    navigate("/");
  };

  const [showSideNavbar, setShowSideNavbar] = useState(false);
  const toggleSideNavbar = () => {
    setShowSideNavbar(!showSideNavbar);
  };

  return (
    <>
      <nav className="flex z-10 absolute items-center justify-between py-5 px-5 lg:px-40 font-bold text-gray-500 w-full">
        <div className="w-7 flex items-center cursor-pointer opacity-70 hover:opacity-100">
          <ExIphoneLogo />
        </div>
        <div className="hidden lg:flex gap-10">
          {!user ? (
            <>
              <NavLink className="hover:text-blue-400 px-2 py-1" to="/">
                Home
              </NavLink>
              <NavLink className="hover:text-blue-400 px-2 py-1" to="/contact">
                Contact
              </NavLink>
              <NavLink className="hover:text-blue-400 px-2 py-1" to="/about">
                About
              </NavLink>
            </>
          ) : (
            <>
              {/* <NavLink className="hover:text-blue-400 px-2 py-1" to="/products">
              Products
            </NavLink>
            <NavLink className="hover:text-blue-400 px-2 py-1" to="/og">
              Original Products
            </NavLink> */}
            </>
          )}
        </div>
        <div className="flex sm:gap-6 items-center relative">
          {user ? (
            <>
              <NavLink to="/" className="hover:text-blue-400 p-2">
                <AiOutlineHome className="text-xl" />
              </NavLink>
              <NavLink to="/cart" className="hover:text-blue-400 p-2">
                <AiOutlineShoppingCart className="text-xl" />
              </NavLink>
              <NavLink
                to="/dashboard/wishlist"
                className="hover:text-blue-400 p-2"
              >
                <AiOutlineHeart className="text-xl" />
              </NavLink>
              <button
                className="hover:text-blue-400 sm:hidden "
                onClick={toggleSideNavbar}
              >
                <GiHamburgerMenu className="text-xl" />
              </button>
              <button
                className="hover:text-blue-400 hidden sm:block"
                onClick={toggleDropDown}
              >
                <AiOutlineUser className="text-xl" />
              </button>

              {dropDown && (
                <OutsideTouchCloseComponent
                  toggleVisibility={toggleDropDown}
                  style="absolute top-10 right-0 font-normal w-44 bg-white rounded-lg shadow-2xl"
                >
                  <NavLink
                    to="/dashboard/"
                    className="navbar-drop-ul"
                    onClick={toggleDropDown}
                  >
                    <RiDashboardLine className="text-xl" /> Dashboard
                  </NavLink>
                  <NavLink
                    to="/dashboard/profile"
                    className="navbar-drop-ul"
                    onClick={toggleDropDown}
                  >
                    <AiOutlineUser className="text-xl" /> Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard/order-history"
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
                </OutsideTouchCloseComponent>
              )}
              {/* <button className="sm:hidden hover:text-blue-400 p-2">
              <GiHamburgerMenu />
            </button> */}
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
      {/* Mobile Screen side bar */}
      <div
        className={`side-navbar-admin fixed z-20 ${
          showSideNavbar ? "show" : ""
        }`}
        onClick={toggleSideNavbar}
      >
        <div className="h-screen w-fit bg-gray-100 px-5 py-3 flex-shrink-0 border-r border-r-gray-300 shadow-lg pt-5">
          {/* <SideNavbar /> */}
          <div className="w-7 flex items-center cursor-pointer opacity-70 hover:opacity-100">
            <ExIphoneLogo />
          </div>
          <div className="text-gray-600 font-semibold mt-5">
            <NavLink className="side-nav-link-sp" to="/dashboard/">
              <RiDashboardLine />
              Dashboard
            </NavLink>
            <NavLink className="side-nav-link-sp" to="/dashboard/profile">
              <BiUser />
              Account Details
            </NavLink>
            <NavLink className="side-nav-link-sp" to="/dashboard/order-history">
              <BiHistory />
              Order History
            </NavLink>
            <NavLink className="side-nav-link-sp" to="/dashboard/track-order">
              <MdTrackChanges />
              Track Order
            </NavLink>
            <NavLink className="side-nav-link-sp" to="/dashboard/wishlist">
              <AiOutlineHeart />
              Wishlist
            </NavLink>
            <NavLink className="side-nav-link-sp" to="/dashboard/addresses">
              <GiMailbox />
              Addresses
            </NavLink>
            <NavLink className="side-nav-link-sp" to="/dashboard/wallet">
              <AiOutlineWallet />
              Wallet
            </NavLink>
            <NavLink className="side-nav-link-sp" to="/dashboard/find-coupons">
              <TiTicket />
              Find Coupons
            </NavLink>

            <button
              className="side-nav-link-sp cursor-pointer w-full"
              onClick={handleLogout}
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
