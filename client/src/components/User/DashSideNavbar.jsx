import React from "react";
import { NavLink } from "react-router-dom";
// import { logout } from "../../redux/actions/userActions";
import { RiDashboardLine } from "react-icons/ri";
import {
  AiOutlineHeart,
  AiOutlineWallet,
  AiOutlineLogout,
} from "react-icons/ai";
import { TiTicket } from "react-icons/ti";
import { MdTrackChanges } from "react-icons/md";
import { BiUser, BiHistory } from "react-icons/bi";
import { GiMailbox } from "react-icons/gi";

const DashSideNavbar = () => {
  return (
    <div className="w-1/5 bg-white h-fit shrink-0 rounded hidden lg:block">
      <NavLink className="side-nav-link-sp" to="/dashboard/">
        <RiDashboardLine />
        Dashboard
      </NavLink>
      <NavLink className="side-nav-link-sp" to="profile">
        <BiUser />
        Account Details
      </NavLink>
      <NavLink className="side-nav-link-sp" to="order-history">
        <BiHistory />
        Order History
      </NavLink>
      <NavLink className="side-nav-link-sp" to="track-order">
        <MdTrackChanges />
        Track Order
      </NavLink>
      <NavLink className="side-nav-link-sp" to="wishlist">
        <AiOutlineHeart />
        Wishlist
      </NavLink>
      <NavLink className="side-nav-link-sp" to="addresses">
        <GiMailbox />
        Addresses
      </NavLink>
      <NavLink className="side-nav-link-sp" to="wallet">
        <AiOutlineWallet />
        Wallet
      </NavLink>
      <NavLink className="side-nav-link-sp" to="find-coupons">
        <TiTicket />
        Find Coupons
      </NavLink>
      <NavLink className="side-nav-link-sp" to="/">
        <AiOutlineLogout />
        Logout
      </NavLink>
    </div>
  );
};

export default DashSideNavbar;
