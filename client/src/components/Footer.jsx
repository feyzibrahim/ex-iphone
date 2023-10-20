import React from "react";
import Logo from "../assets/logoGrey.png";

import { FiMail } from "react-icons/fi";
import SocialMedia from "./SocialMedia";

const Footer = () => {
  return (
    <div className="bg-color-rev lg:h-screen text-white lg:flex pt-20 lg:pt-0">
      <div className="bg-zinc-900 mx-10 lg:mx-20 lg:my-16 lg:w-1/3 flex flex-col px-5 py-10 lg:p-10 rounded-3xl">
        <p className="navbar-p">Feedback</p>
        <h1 className="text-xl lg:text-3xl font-bold mb-5">
          <span className="text-gray-500">Seeking personalized support? </span>
          Request a call from our team
        </h1>
        <label htmlFor="email" className="text-gray-500 mb-2">
          Email
        </label>
        <div className="flex items-center gap-3 border border-gray-400 p-2 rounded-lg mb-2">
          <FiMail />
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            className="bg-transparent outline-none"
          />
        </div>
        <label htmlFor="username" className="text-gray-500 mb-2">
          Username
        </label>
        <div className="flex items-center gap-3 border border-gray-400 p-2 rounded-lg mb-2">
          <FiMail />
          <input
            type="text"
            name="Username"
            placeholder="Feyz Ibrahim"
            className="bg-transparent outline-none"
          />
        </div>
        <div className="mt-2">
          <button className="btn-blue ">Send Request</button>
        </div>
        <p className="mt-8 text-sm text-gray-500">Privacy</p>
      </div>
      <div className="lg:w-2/3 p-10 lg:my-20">
        <div className="lg:flex  mb-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-20 lg:w-3/4 mb-5">
            <ul>
              <li className="navbar-p">Info</li>
              <li className="navbar-li">Company</li>
              <li className="navbar-li">Products</li>
              <li className="navbar-li">Engineering</li>
              <li className="navbar-li">Services</li>
              <li className="navbar-li">Productions</li>
            </ul>
            <ul>
              <li className="navbar-p mt-4 lg:mt-0">About Us</li>
              <li className="navbar-li">Gallery</li>
              <li className="navbar-li">Technologies</li>
              <li className="navbar-li">Contacts</li>
            </ul>
            <ul>
              <li className="navbar-p mt-4">Contact Us</li>
              <li className="navbar-li">+91 7356983827</li>
              <li className="navbar-li">help@exiphones.com</li>
              <li className="navbar-li">Calicut, KL, INDIA</li>
            </ul>
          </div>
          <div className="lg:w-1/4">
            <img src={Logo} alt="ex.iphones." className="w-1/3 lg:mx-auto" />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <SocialMedia />
          <p className="text-xs font-bold text-gray-500 lg:mr-14">
            © 2023 — ex.iphones.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
