import React, { useState } from "react";
import ForgotBG from "../assets/forgot.png";
import Logo from "../assets/logoGrey.png";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="py-20 bg-gray-100 lg:flex lg:items-center text-gray-500">
      <div className="lg:w-1/2">
        <img src={ForgotBG} alt="ForgotBG" />
      </div>

      <div className="lg:w-1/2 p-5 mx-10 lg:mx-20 lg:p-10 border border-gray-300 rounded-3xl">
        <div className="flex items-center justify-center">
          <img src={Logo} alt="ex.iphones. logo" className="lg:w-1/12 w-1/12" />
          <p className="text-3xl font-bold">ex.iphones.</p>
        </div>
        <h1 className="text-2xl my-5 font-bold">Reset the Password</h1>
        <div>
          <p>
            <label htmlFor="username">Email Address</label>
          </p>
          <div className="flex items-center gap-3 border bg-white border-gray-200 shadow-sm p-2 rounded-lg my-2">
            {/* <AiOutlineUser className="text-xl" /> */}
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              className="bg-transparent outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="my-2 text-red-400">{error}</p>}

        <div className="text-center">
          <button
            className="btn-blue text-white w-full"
            onClick={handleLoginSubmit}
            disabled={loading}
          >
            {loading ? "Loading..." : "Reset"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
