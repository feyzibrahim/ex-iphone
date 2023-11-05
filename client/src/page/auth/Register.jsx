import React, { useEffect } from "react";
import SignUpBG from "../../assets/SignUpBG.png";
import Logo from "../../assets/logoGrey.png";
import {
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../redux/actions/userActions";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "Yup";
import InputWithIcon from "../../components/InputWithIcon";
import PasswordInputWithIcon from "../../components/PasswordInputWithIcon";
import CustomSingleFileInput from "../../components/CustomSingleFileInput";

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

  const handleRegister = async (value) => {
    const formData = new FormData();

    formData.append("firstName", value.firstName);
    formData.append("lastName", value.lastName);
    formData.append("email", value.email);
    formData.append("password", value.password);
    formData.append("passwordAgain", value.passwordAgain);
    formData.append("phoneNumber", value.phoneNumber);
    formData.append("profileImgURL", value.profileImgURL);

    dispatch(signUpUser(formData));
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
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
              {error && <p className="my-2 text-red-400">{error}</p>}
            </Form>
          )}
        </Formik>
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
