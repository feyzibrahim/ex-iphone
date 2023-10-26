import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ValidateOTP = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = e.target.value;

    if (e.target.value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    setOtp(updatedOtp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let ooo = parseInt(otp.join(""));
    if (ooo.toString().split("").length < 6) {
      setError("OTP is not valid");
      return;
    } else {
      setError("");
    }

    setLoading(true);

    await axios
      .post(
        "http://localhost:4000/user/validate-otp",
        {
          otp: ooo,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((data) => {
        console.log(data);
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    const generateOTP = async () => {
      const data = await axios.get("http://localhost:4000/user/send-otp", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(data);
    };

    if (user) {
      if (user.isEmailVerified) {
        navigate("/");
      } else {
        generateOTP();
      }
    } else {
      generateOTP();
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <h1 className="text-lg font-semibold">
            Please verify email to continue
          </h1>
          <p className="mb-5">A OTP is sent to your email</p>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Enter OTP:
          </label>
          <div className="flex justify-center">
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
        </div>
        {error && <p>{error}</p>}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Loading..." : " Verify OTP"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ValidateOTP;
