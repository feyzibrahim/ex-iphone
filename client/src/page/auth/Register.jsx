import React, { useEffect, useState } from "react";
import SignUpBG from "../../assets/SignUpBG.png";
import Logo from "../../assets/logoGrey.png";
import {
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  googleLoginOrSignUp,
  signUpUser,
} from "../../redux/actions/userActions";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputWithIcon from "../../components/InputWithIcon";
import PasswordInputWithIcon from "../../components/PasswordInputWithIcon";
import CustomSingleFileInput from "../../components/CustomSingleFileInput";
import OTPEnterSection from "./Register/OTPEnterSection";
import OTPExpired from "./components/OTPExpired";
import toast from "react-hot-toast";
import { appJson } from "../../Common/configurations";
import { GoogleLogin } from "@react-oauth/google";
import { commonRequest } from "../../Common/api";
import { updateError } from "../../redux/reducers/userSlice";

const Register = () => {
  const { user, loading, error } = useSelector((state) => state.user);
  const [emailSec, setEmailSec] = useState(true);
  const [otpSec, setOTPSec] = useState(false);
  const [otpExpired, setOTPExpired] = useState(false);
  const [otpLoading, setOTPLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    return () => {
      dispatch(updateError(""));
    };
  }, [user]);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordAgain: "",
    phoneNumber: "",
    profileImgURL: null,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    passwordAgain: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password"), null], "Password must match"),
    phoneNumber: Yup.number()
      .typeError("Phone number should be digits")
      .moreThan(999999999, "Not valid phone number"),
  });

  const dispatch = useDispatch();

  const [data, setData] = useState({});

  const dispatchSignUp = () => {
    let formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("passwordAgain", data.passwordAgain);
    formData.append("phoneNumber", data.phoneNumber);
    if (data.profileImgURL) {
      formData.append("profileImgURL", data.profileImgURL);
    }

    dispatch(signUpUser(formData));
  };

  const handleRegister = async (value) => {
    // Display loading state
    setOTPLoading(true);
    setData(value);
    if (value.email.trim() === "") {
      toast.error("Enter an email to continue");
      return;
    }

    const res = await commonRequest(
      "POST",
      "/auth/send-otp",
      { email: value.email },
      appJson
    );

    if (res.success) {
      // Update state to show OTP section
      setEmailSec(false);
      setOTPSec(true);
      setOTPLoading(false);
      toast.success("OTP Sent successfully");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Handle OTP request failure
      toast.error(res.response.data.error);
      setOTPLoading(false);
    }
  };

  // Google Login
  const loginWithGoogle = async (data) => {
    dispatch(googleLoginOrSignUp(data));
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
        {emailSec && (
          <Formik
            initialValues={initialValues}
            onSubmit={handleRegister}
            validationSchema={validationSchema}
          >
            {({ values, setFieldValue }) => (
              <Form className="w-full">
                <div className="flex justify-center">
                  <CustomSingleFileInput
                    onChange={(file) => setFieldValue("profileImgURL", file)}
                  />
                  <ErrorMessage
                    className="text-sm text-red-500"
                    name="profileImgURL"
                    component="span"
                  />
                </div>
                <InputWithIcon
                  icon={<AiOutlineUser />}
                  title="First Name"
                  name="firstName"
                  placeholder="Enter your first name"
                />
                <InputWithIcon
                  icon={<AiOutlineUser />}
                  title="Last Name"
                  name="lastName"
                  placeholder="Enter your last name"
                />
                <InputWithIcon
                  icon={<AiOutlineMail />}
                  title="Email"
                  name="email"
                  placeholder="Enter your email"
                />
                <PasswordInputWithIcon
                  icon={<AiOutlineLock />}
                  title="Password"
                  name="password"
                  placeholder="Enter your password"
                />
                <PasswordInputWithIcon
                  icon={<AiOutlineLock />}
                  title="Confirm Password"
                  name="passwordAgain"
                  placeholder="Confirm your password"
                />
                <InputWithIcon
                  icon={<AiOutlinePhone />}
                  title="Phone Number"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                />
                <button
                  type="submit"
                  className="btn-blue text-white w-full my-3"
                  disabled={otpLoading}
                >
                  {otpLoading ? "Loading..." : "Sign Up"}
                </button>
                {error && <p className="my-2 text-red-400">{error}</p>}
              </Form>
            )}
          </Formik>
        )}
        {otpSec && (
          <OTPEnterSection
            email={data.email}
            setOTPExpired={setOTPExpired}
            setOTPSec={setOTPSec}
            dispatchSignUp={dispatchSignUp}
          />
        )}
        {otpExpired && <OTPExpired />}
        <div className="text-center">
          <p className="my-4">OR</p>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                loginWithGoogle(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
                toast.error("Something is wrong! Please try later");
              }}
            />
          </div>
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
