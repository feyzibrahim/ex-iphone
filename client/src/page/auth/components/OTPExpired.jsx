import React from "react";
import { TiCancel } from "react-icons/ti";
import { Link } from "react-router-dom";

const OTPExpired = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center text-9xl text-red-600 animate-pulse">
        <TiCancel />
      </div>

      <h1 className="my-5 text-red-500 text-center animate-pulse">
        OTP Expired try again Later
      </h1>
      <Link to="/" className="btn-blue text-white w-full">
        Go Home
      </Link>
    </div>
  );
};

export default OTPExpired;