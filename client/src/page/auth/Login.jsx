import React, { useEffect, useState } from "react";
import LoginBG from "../../assets/LoginBG.png";
import Logo from "../../assets/logoGrey.png";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";

import { Formik, Form } from "formik";
import * as Yup from "Yup";
import InputWithIcon from "./InputWithIcon";
import PasswordInputWithIcon from "./PasswordInputWithIcon";

const Login = () => {
  const { user, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  useEffect(() => {
    if (user) {
      if (!user.isEmailVerified) {
        navigate("/otp");
      } else {
        navigate("/");
      }
    }
  }, [user]);

  const handleLoginSubmit = (value) => {
    console.log(value);
    dispatch(loginUser(value));
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

        <Formik
          initialValues={initialValues}
          onSubmit={handleLoginSubmit}
          validationSchema={validationSchema}
        >
          <Form className="w-full">
            <InputWithIcon
              name="email"
              title="Email"
              placeholder="Enter your email"
              icon={<AiOutlineUser />}
            />
            <PasswordInputWithIcon
              name="password"
              title="Password"
              placeholder="Enter your password"
              icon={<AiOutlineLock />}
            />
            {error && <p className="my-2 text-red-400">{error}</p>}
            <button
              type="submit"
              className="btn-blue text-white w-full mt-5"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </Form>
        </Formik>

        {/* <div>
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

        {error && <p className="my-2 text-red-400">{error}</p>} */}

        <div className="text-center">
          <Link to="/forgot-password">
            <div className="my-5 text-blue-600 font-bold cursor-pointer hover:text-blue-500">
              Forgot Password?
            </div>
          </Link>
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
