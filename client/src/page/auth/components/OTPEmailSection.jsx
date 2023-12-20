import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import axios from "axios";
import { config } from "../../../Common/configurations";
import { URL } from "../../../Common/api";
import toast from "react-hot-toast";

const OTPEmailSection = ({ email, setEmail, setEmailSec, setOTPSec }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      setError("Enter an email to continue");
      return;
    }
    setLoading(true);
    axios
      .post(`${URL}/auth/forget-password`, { email }, config)
      .then(({ data }) => {
        if (data.success) {
          setEmailSec(false);
          setOTPSec(true);
          setLoading(false);
          toast.success(data.msg);
        }
      })
      .catch(({ response }) => {
        setError(response.data.error);
        setLoading(false);
      });
  };

  return (
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
          className="bg-transparent outline-none w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {error && <p className="my-2 text-red-400">{error}</p>}

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
  );
};

export default OTPEmailSection;
