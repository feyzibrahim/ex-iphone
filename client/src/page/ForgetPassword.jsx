import React, { useState } from "react";
import ForgotBG from "../assets/forgot.png";
import Logo from "../assets/logoGrey.png";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [emailSec, setEmailSec] = useState(true);
  const [otpSec, setOTPSec] = useState(false);
  const [passwordSec, setPasswordSec] = useState(false);
  const [finalMessage, setFinalMessage] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = e.target.value;

    if (e.target.value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    setOtp(updatedOtp);
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      setError("Enter an email to continue");
      return;
    }
    setLoading(true);
    axios
      .post("http://localhost:4000/user/forget-password", { email }, config)
      .then(({ data }) => {
        console.log(data);
        if (data.success) {
          setEmailSec(false);
          setOTPSec(true);
          setLoading(false);
        }
      })
      .catch(({ response }) => {
        console.log(response);
        setError(response.data.error);
        setLoading(false);
      });
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    let otpNumber = parseInt(otp.join(""));
    if (otpNumber.toString().split("").length < 6) {
      setError("OTP is not valid");
      return;
    } else {
      setError("");
    }

    setLoading(true);

    await axios
      .post(
        "http://localhost:4000/user/forget-password-validate-otp",
        {
          email,
          otp: otpNumber,
        },
        config
      )
      .then(({ data }) => {
        console.log(data);
        if (data.success) {
          setPasswordSec(true);
          setOTPSec(false);
          setLoading(false);
        }
      })
      .catch(({ response }) => {
        console.log(response);
        setError(response.data.error);
        setLoading(false);
      });
  };

  const handlePasswordSubmit = async () => {
    if (password.trim() === "" || passwordAgain.trim() === "") {
      setError("All field are required");
    }
    if (password !== passwordAgain) {
      setError("Password doesn't match");
    }

    setLoading(true);

    await axios
      .post(
        "http://localhost:4000/user/set-new-password",
        {
          email,
          password,
          passwordAgain,
        },
        config
      )
      .then(({ data }) => {
        console.log(data);
        if (data.success) {
          setPasswordSec(false);
          setFinalMessage(true);
          setLoading(false);
          setError("");
        }
      })
      .catch(({ response }) => {
        console.log(response);
        setError(response.data.error);
        setLoading(false);
      });
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
        <h1 className="text-2xl my-5 font-bold">Reset your Password</h1>
        {emailSec && (
          <>
            <p>
              <label htmlFor="username">Email Address</label>
            </p>
            <div className="flex items-center gap-3 border bg-white border-gray-200 shadow-sm p-2 rounded-lg my-2">
              <AiOutlineMail className="text-xl" />
              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                className="bg-transparent outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="text-center">
              <button
                className="btn-blue text-white w-full"
                onClick={handleEmailSubmit}
                disabled={loading}
              >
                {loading ? "Loading..." : "Reset"}
              </button>
            </div>
          </>
        )}
        {otpSec && (
          <>
            <p className="mb-5">An OTP is sent to your email</p>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter OTP:
            </label>
            <div className="flex justify-center my-5">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  className="appearance-none border w-12 py-2 px-3 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-1"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                />
              ))}
            </div>
            <div className="text-center">
              <button
                className="btn-blue text-white w-full"
                onClick={handleOTPSubmit}
                disabled={loading}
              >
                {loading ? "Loading..." : "Reset"}
              </button>
            </div>
          </>
        )}
        {passwordSec && (
          <>
            <div className="flex items-center gap-3 border bg-white border-gray-200 shadow-sm p-2 rounded-lg my-2">
              <AiOutlineLock className="text-xl" />
              <input
                type="password"
                name="password"
                placeholder="Enter your new password"
                className="bg-transparent outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3 border bg-white border-gray-200 shadow-sm p-2 rounded-lg my-5">
              <AiOutlineLock className="text-xl" />
              <input
                type="password"
                name="passwordAgain"
                placeholder="Enter your new password again"
                className="bg-transparent outline-none"
                value={passwordAgain}
                onChange={(e) => setPasswordAgain(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button
                className="btn-blue text-white w-full"
                onClick={handlePasswordSubmit}
                disabled={loading}
              >
                {loading ? "Loading..." : "Reset"}
              </button>
            </div>
          </>
        )}
        {finalMessage && (
          <div>
            <h1>Your password has been reset please login again</h1>
            <button
              className="btn-blue text-white w-full"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </button>
          </div>
        )}
        {error && <p className="my-2 text-red-400">{error}</p>}
      </div>
    </div>
  );
};

export default ForgetPassword;
