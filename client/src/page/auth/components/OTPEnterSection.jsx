import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { config } from "../../../Common/configurations";
import { URL } from "../../../Common/api";

const OTPEnterSection = ({
  email,
  setPasswordSec,
  setOTPSec,
  setOTPExpired,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(59);

  const [resendSeconds, setResendSeconds] = useState(30);
  const [resendLoading, setResendLoading] = useState(false);
  // Saving OTP to otp variable on change
  const handleChange = (e, index) => {
    const updatedOtp = [...otp];
    const value = e.target.value;

    if (value === "") {
      // If backspace is pressed, remove the number and move back to the previous box
      updatedOtp[index] = "";
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    } else if (!isNaN(value) && value.length <= 1) {
      // Check if the input is a number
      updatedOtp[index] = value;

      if (index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }

    setOtp(updatedOtp);
  };

  // Copy pasting otp
  // Handle paste event
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text/plain");

    // Distribute the pasted content across input boxes
    for (let i = 0; i < otp.length; i++) {
      if (pastedData[i] && !isNaN(pastedData[i])) {
        document.getElementById(`otp-input-${i}`).value = pastedData[i];
        setOtp((prevOtp) => {
          const newOtp = [...prevOtp];
          newOtp[i] = pastedData[i];
          return newOtp;
        });
      }
    }

    // Set focus on the last input box
    document.getElementById(`otp-input-${otp.length - 1}`).focus();

    e.preventDefault();
  };

  // OTP Submission function
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
        `${URL}/auth/forget-password-validate-otp`,
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

  // OTP 5 Minute Timer function
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
          toast.error("OTP Expired");
          setOTPExpired(true);
          setOTPSec(false);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  // OTP Resend timer starting on component load
  useEffect(() => {
    const resendTimerInterval = setInterval(() => {
      if (resendSeconds > 0) {
        setResendSeconds(resendSeconds - 1);
      }
    }, 1000);

    return () => {
      clearInterval(resendTimerInterval);
    };
  }, [resendSeconds]);

  const handleResending = async () => {
    if (resendSeconds === 0) {
      setResendLoading(true);
      await axios
        .post(
          `${URL}/auth/resend-otp`,
          {
            email,
          },
          config
        )
        .then(({ data }) => {
          if (data.success) {
            toast.success(data.message);
            setResendLoading(false);
          }
        })
        .catch(({ response }) => {
          setError(response.data.error);
          toast.error(response.data.error);
          setResendLoading(false);
        });

      setResendSeconds(30);
    } else {
      toast.error(`Please wait ${resendSeconds} seconds before resending OTP`);
    }
  };

  return (
    <>
      <p className="mb-5">An OTP is sent to your email</p>
      <label className="block text-gray-700 text-sm font-bold mb-2 text-center">
        Enter OTP
      </label>
      <div className="flex justify-center my-5">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            className="appearance-none border border-gray-400 rounded-lg w-12 py-4 px-3 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-1"
            maxLength="1"
            value={digit}
            placeholder="-"
            onChange={(e) => handleChange(e, index)}
            onPaste={(e) => handlePaste(e)}
          />
        ))}
      </div>
      <div className="my-5 flex justify-between">
        {resendLoading ? (
          <p>loading...</p>
        ) : (
          <button
            className={
              resendSeconds === 0
                ? "text-blue-500 hover:underline cursor-pointer "
                : "text-gray-500"
            }
            disabled={resendSeconds !== 0}
            onClick={handleResending}
          >
            {resendSeconds === 0
              ? "Resend OTP?"
              : `Resend OTP in ${resendSeconds}s`}
          </button>
        )}
        <p>
          OTP will expire in{" "}
          <span className="px-2 border border-gray-500 rounded">
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </p>
      </div>
      {error && <p className="my-2 text-red-400">{error}</p>}

      <div className="text-center">
        <button
          className="btn-blue text-white w-full"
          onClick={handleOTPSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "Validate OTP"}
        </button>
      </div>
    </>
  );
};

export default OTPEnterSection;
