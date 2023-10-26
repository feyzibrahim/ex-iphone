import React, { useEffect, useState } from "react";
import SignUpBG from "../assets/SignUpBG.png";
import Logo from "../assets/logoGrey.png";
import {
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../redux/actions/userActions";

const Register = () => {
  const { user, loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (!user.isEmailVerified) {
        navigate("/otp");
      } else {
        navigate("/");
      }
    }
  }, [user]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("passwordAgain", passwordAgain);
    formData.append("phoneNumber", phoneNumber);

    dispatch(signUpUser(formData));
    // if (!res.payload.isEmailVerified) {
    //   navigate("/otp");
    // }
  };

  return (
    <div className="py-20 bg-gray-100 lg:flex  text-gray-500">
      <div className="lg:w-1/2">
        <img src={SignUpBG} alt="SignUpBG" />
      </div>

      <div className="lg:w-1/2 p-5 mx-10 lg:mx-20 lg:p-10 border border-gray-300 rounded-3xl">
        <div className="flex items-center justify-center">
          <img src={Logo} alt="ex.iphones. logo" className="lg:w-1/12 w-1/12" />
          <p className="text-3xl font-bold ">ex.iphones.</p>
        </div>
        <h1 className="text-2xl my-5 font-bold">Sign Up</h1>
        <form>
          <p>
            <label htmlFor="username">First Name</label>
          </p>
          <div className="flex items-center gap-3 border bg-white border-gray-200 shadow-sm p-2 rounded-lg mb-2">
            <AiOutlineUser />
            <input
              type="text"
              name="username"
              placeholder="Enter your Username"
              className="bg-transparent outline-none w-full"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <>
            <p>
              <label htmlFor="username">Second Name</label>
            </p>
            <div className="flex items-center gap-3 border bg-white border-gray-200 shadow-sm p-2 rounded-lg mb-2">
              <AiOutlineUser />
              <input
                type="text"
                name="username"
                placeholder="Enter your Username"
                className="bg-transparent outline-none w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </>
          <>
            <p>
              <label htmlFor="email">Email</label>
            </p>
            <div className="flex items-center gap-3 bg-white border border-gray-200 shadow-sm p-2 rounded-lg mb-2">
              <AiOutlineMail />
              <input
                type="Email"
                name="email"
                placeholder="Enter your Email"
                className="bg-transparent outline-none w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </>
          <>
            <p>
              <label htmlFor="password">Password</label>
            </p>
            <div className="flex items-center gap-3 bg-white border border-gray-200 shadow-sm p-2 rounded-lg mb-2">
              <AiOutlineLock />
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                className="bg-transparent outline-none w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </>
          <>
            <p>
              <label htmlFor="password">Confirm Password</label>
            </p>
            <div className="flex items-center gap-3 bg-white border border-gray-200 shadow-sm p-2 rounded-lg mb-2">
              <AiOutlineLock />
              <input
                type="password"
                name="password"
                placeholder="Enter your Password again"
                className="bg-transparent outline-none w-full"
                value={passwordAgain}
                onChange={(e) => setPasswordAgain(e.target.value)}
              />
            </div>
          </>
          <>
            <p>
              <label htmlFor="phoneNumber">Phone Number</label>
            </p>
            <div className="flex items-center gap-3 bg-white border border-gray-200 shadow-sm p-2 rounded-lg mb-2">
              <AiOutlinePhone />
              <input
                type="number"
                name="phoneNumber"
                placeholder="Enter your Phone Number"
                className="bg-transparent outline-none w-full"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </>
          {error && <p className="my-2 text-red-400">{error}</p>}
          <button
            onClick={handleRegister}
            className="btn-blue text-white w-full my-3"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <div className="text-center">
          <p className="my-4">OR</p>
          <button className="bg-gray-300 w-full rounded-full py-3 text-black flex justify-center items-center gap-5 hover:bg-gray-400">
            <span className="text-2xl">
              <FcGoogle />
            </span>
            <p>Continue with Google</p>
          </button>
          <p className="my-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold cursor-pointer hover:text-blue-500"
            >
              Login now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
