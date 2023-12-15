import React, { useEffect, useState } from "react";
import { BsShieldLockFill } from "react-icons/bs";
import { TiTick } from "react-icons/ti";

const EditProfileOTPComponent = ({ otp, isOTPVerified, setOTP, verifyOTP }) => {
  // OTP time
  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(59);
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
          toast.error("OTP Expired");
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

  return (
    <div>
      <p>
        An OTP is send to Email{" "}
        {!isOTPVerified && (
          <span className="px-2 border border-gray-500 rounded">
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </span>
        )}
      </p>
      <div className="flex items-center">
        <div className="sign-up-icon">
          {isOTPVerified ? <TiTick /> : <BsShieldLockFill />}
        </div>
        <input
          className="sign-up-input w-full"
          type="number"
          name="otp"
          id="otp"
          placeholder="Enter OTP here"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
          disabled={isOTPVerified}
        />
        <button
          className="btn-red-no-pad px-2 py-2 text-white ml-2"
          onClick={verifyOTP}
          type="button"
          disabled={isOTPVerified}
        >
          {isOTPVerified ? "Verified" : "Verify"}
        </button>
      </div>
    </div>
  );
};

export default EditProfileOTPComponent;
