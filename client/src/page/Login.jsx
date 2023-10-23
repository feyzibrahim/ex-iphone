import React, { useEffect, useState } from "react";
import LoginBG from "../assets/LoginBG.png";
import Logo from "../assets/logoGrey.png";
import {
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const Login = () => {
  const { user, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const togglePass = () => setShowPass(!showPass);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      return;
    }

    let userCredentials = {
      email,
      password,
    };
    dispatch(loginUser(userCredentials));
  };

  return (
    <div className="py-20 bg-gray-100 lg:flex lg:items-center text-gray-500">
      <div className="lg:w-1/2">
        <img src={LoginBG} alt="LoginBG" />
      </div>

      <div className="lg:w-1/2 p-5 mx-10 lg:mx-20 lg:p-10 border border-gray-300 rounded-3xl">
        <div className="flex items-center justify-center">
          <img src={Logo} alt="ex.iphones. logo" className="lg:w-1/12 w-1/12" />
          <p className="text-3xl font-bold">ex.iphones.</p>
        </div>
        <h1 className="text-2xl my-5 font-bold">Login</h1>
        <div>
          <p>
            <label htmlFor="username">Username</label>
          </p>
          <div className="flex items-center gap-3 border bg-white border-gray-200 shadow-sm p-2 rounded-lg mb-2">
            <AiOutlineUser className="text-xl" />
            <input
              type="text"
              name="username"
              placeholder="Enter your Username"
              className="bg-transparent outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div>
          <p>
            <label htmlFor="password">Password</label>
          </p>
          <div className="flex items-center gap-3 bg-white border border-gray-200 shadow-sm p-2 rounded-lg mb-2">
            <AiOutlineLock className="text-xl" />
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Enter your Password"
              className="bg-transparent outline-none w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPass ? (
              <AiOutlineEyeInvisible
                className="mr-2 cursor-pointer text-xl"
                onClick={togglePass}
              />
            ) : (
              <AiOutlineEye
                className="mr-2 cursor-pointer text-xl"
                onClick={togglePass}
              />
            )}
          </div>
        </div>

        {error && <p className="my-2 text-red-400">{error}</p>}

        <div className="text-center">
          <button
            className="btn-blue text-white w-full"
            onClick={handleLoginSubmit}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <p className="my-5 text-blue-600 font-bold cursor-pointer hover:text-blue-500">
            Forgot Password?
          </p>
          <p className="my-4">OR</p>
          <button className="bg-gray-300 w-full rounded-full py-3 text-black flex justify-center items-center gap-5 hover:bg-gray-400">
            <span className="text-2xl">
              <FcGoogle />
            </span>
            <p>Continue with Google</p>
          </button>
          <p className="my-5">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold cursor-pointer hover:text-blue-500"
            >
              Sign Up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
