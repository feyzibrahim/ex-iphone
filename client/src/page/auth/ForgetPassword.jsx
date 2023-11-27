import React, { useState } from "react";
import ForgotBG from "../../assets/forgot.png";
import Logo from "../../assets/logoGrey.png";

import OTPEmailSection from "./components/OTPEmailSection";
import OTPEnterSection from "./components/OTPEnterSection";
import PasswordEnterSection from "./components/PasswordEnterSection";
import { Link } from "react-router-dom";
import OTPExpired from "./components/OTPExpired";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const [emailSec, setEmailSec] = useState(true);
  const [otpSec, setOTPSec] = useState(false);
  const [passwordSec, setPasswordSec] = useState(false);
  const [finalMessage, setFinalMessage] = useState(false);
  const [otpExpired, setOTPExpired] = useState(false);

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
        <h1 className="text-2xl my-5 font-bold">Reset your Password</h1>
        {emailSec && (
          <OTPEmailSection
            setEmailSec={setEmailSec}
            setOTPSec={setOTPSec}
            email={email}
            setEmail={setEmail}
          />
        )}
        {otpSec && (
          <OTPEnterSection
            email={email}
            setOTPSec={setOTPSec}
            setPasswordSec={setPasswordSec}
            setOTPExpired={setOTPExpired}
          />
        )}
        {passwordSec && (
          <PasswordEnterSection
            email={email}
            setFinalMessage={setFinalMessage}
            setPasswordSec={setPasswordSec}
          />
        )}
        {finalMessage && (
          <div>
            <h1 className="my-4">
              Your password has been reset please login again
            </h1>
            <Link className="btn-blue text-white w-full" to="/login">
              Go to Login
            </Link>
          </div>
        )}
        {otpExpired && <OTPExpired />}
      </div>
    </div>
  );
};

export default ForgetPassword;
