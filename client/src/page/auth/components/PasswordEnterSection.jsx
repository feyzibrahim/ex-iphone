import React, { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import axios from "axios";
import { config } from "../../../Common/configurations";
import { URL } from "../../../Common/api";

const PasswordEnterSection = ({ email, setPasswordSec, setFinalMessage }) => {
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        `${URL}/auth/set-new-password`,
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

      {error && <p className="my-2 text-red-400">{error}</p>}

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
  );
};

export default PasswordEnterSection;
