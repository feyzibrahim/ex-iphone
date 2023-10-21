import React from "react";
import SignUpBG from "../assets/SignUpBG.png";
import Logo from "../assets/logoGrey.png";
import {
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="py-20 bg-gray-100 lg:flex  text-gray-500">
      <div className="lg:w-1/2">
        <img src={SignUpBG} alt="SignUpBG" />
      </div>

      <div className="lg:w-1/2 p-5 mx-10 lg:mx-20 lg:p-10 border border-gray-300 rounded-3xl">
        <div className="flex items-center justify-center">
          <img src={Logo} alt="ex.iphones. logo" className="lg:w-1/12 w-1/12" />
          <p className="text-3xl font-bold ">ex.iphones.</p>
        </div>
        <h1 className="text-2xl my-5 font-bold">Sign Up</h1>
        <div>
          <p>
            <label htmlFor="username">Username</label>
          </p>
          <div className="flex items-center gap-3 border bg-white border-gray-200 shadow-sm p-2 rounded-lg mb-2">
            <AiOutlineUser />
            <input
              type="text"
              name="username"
              placeholder="Enter your Username"
              className="bg-transparent outline-none w-full"
            />
          </div>
        </div>
        <div>
          <p>
            <label htmlFor="email">Email</label>
          </p>
          <div className="flex items-center gap-3 bg-white border border-gray-200 shadow-sm p-2 rounded-lg mb-2">
            <AiOutlineMail />
            <input
              type="Email"
              name="email"
              placeholder="Enter your Email"
              className="bg-transparent outline-none w-full"
            />
          </div>
        </div>
        <div>
          <p>
            <label htmlFor="password">Password</label>
          </p>
          <div className="flex items-center gap-3 bg-white border border-gray-200 shadow-sm p-2 rounded-lg mb-2">
            <AiOutlineLock />
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              className="bg-transparent outline-none w-full"
            />
          </div>
        </div>
        <div>
          <p>
            <label htmlFor="password">Confirm Password</label>
          </p>
          <div className="flex items-center gap-3 bg-white border border-gray-200 shadow-sm p-2 rounded-lg mb-2">
            <AiOutlineLock />
            <input
              type="password"
              name="password"
              placeholder="Enter your Password again"
              className="bg-transparent outline-none w-full"
            />
          </div>
        </div>
        <div>
          <p>
            <label htmlFor="phoneNumber">Phone Number</label>
          </p>
          <div className="flex items-center gap-3 bg-white border border-gray-200 shadow-sm p-2 rounded-lg mb-2">
            <AiOutlinePhone />
            <input
              type="number"
              name="phoneNumber"
              placeholder="Enter your Phone Number"
              className="bg-transparent outline-none w-full"
            />
          </div>
        </div>
        <div className="text-center">
          <p className="my-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold cursor-pointer hover:text-blue-500"
            >
              Login now
            </Link>
          </p>
          <button className="btn-blue text-white w-full">Sign Up</button>
          <p className="my-4">OR</p>
          <button className="bg-gray-300 w-full rounded-full py-3 text-black flex justify-center items-center gap-5 hover:bg-gray-400">
            <span className="text-2xl">
              <FcGoogle />
            </span>
            <p>Continue with Google</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
