import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "Yup";

import {
  AiOutlineClose,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
} from "react-icons/ai";
import { BsShieldLockFill } from "react-icons/bs";
import { RiCalendarEventFill } from "react-icons/ri";
import { TiTick } from "react-icons/ti";

import InputWithIcon from "../../../components/InputWithIcon";
import CustomSingleFileInput from "../../admin/Components/CustomSingleFileInput";
import { editUserProfile } from "../../../redux/actions/userActions";
import { URL } from "../../../Common/links";
import { config } from "../../../Common/configurations";
import axios from "axios";
import toast from "react-hot-toast";

const EditProfile = ({ closeToggle }) => {
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.user);

  // If user changes email there should be OTP validation
  const [emailChanged, setEmailChanged] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [otp, setOTP] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const initialValues = {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || "",
    dateOfBirth: user.dateOfBirth || "",
    profileImgURL: user.profileImgURL || "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email().required("Email is required"),
    phoneNumber: Yup.number()
      .typeError("Phone number should be digits")
      .moreThan(999999999, "Not valid phone number"),
    dateOfBirth: Yup.date(),
    profileImgURL: Yup.mixed().required("File is required"),
  });

  const handleSubmit = async (value) => {
    if (user.email !== value.email) {
      if (!isOTPVerified) {
        setEmailChanged(true);
        setNewEmail(value.email);
        const response = await axios.post(
          `${URL}/user/send-otp`,
          { email: value.email },
          config
        );

        // Check if OTP request was successful
        if (response.data.success) {
          // Update state to show OTP section
          toast.success("OTP Sent successfully");
        } else {
          // Handle OTP request failure
          toast.error(response.data.response.data.error);
        }
      } else {
        const formData = new FormData();
        formData.append("firstName", value.firstName);
        formData.append("lastName", value.lastName);
        formData.append("phoneNumber", value.phoneNumber);
        formData.append("dateOfBirth", value.dateOfBirth);
        formData.append("email", value.email);
        formData.append("profileImgURL", value.profileImgURL);

        dispatch(editUserProfile(formData));
        closeToggle();
      }
    } else {
      const formData = new FormData();
      formData.append("firstName", value.firstName);
      formData.append("lastName", value.lastName);
      formData.append("phoneNumber", value.phoneNumber);
      formData.append("dateOfBirth", value.dateOfBirth);
      formData.append("email", value.email);
      formData.append("profileImgURL", value.profileImgURL);

      dispatch(editUserProfile(formData));
      closeToggle();
    }
  };

  const verifyOTP = async () => {
    // setLoading(true);

    const response = await axios.post(
      `${URL}/user/validate-otp`,
      {
        email: newEmail,
        otp: parseInt(otp),
      },
      config
    );

    if (response) {
      if (response.data.success) {
        setIsOTPVerified(true);
        toast.success("OTP Verified");
        return;
      }
    } else {
      setError(response.data.error);
      toast.error(response.data.error);
      // setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 w-4/6 shadow-2xl overflow-y-auto h-screen lg:h-auto rounded-lg">
      <div className="bg-white pt-5 pb-3 px-5 flex items-center justify-between">
        <h1 className="font-bold text-lg ">Edit Address</h1>
        <AiOutlineClose
          className="text-xl cursor-pointer"
          onClick={closeToggle}
        />
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form className="lg:flex items-start gap-5 p-5">
            <div>
              {values.profileImgURL &&
              typeof values.profileImgURL === "string" ? (
                <div className="bg-gray-100 py-5 rounded-lg text-center border-dashed border-2 h-80">
                  <div className="h-56 w-56">
                    <img
                      src={`http://localhost:4000/img/${values.profileImgURL}`}
                      alt="profile"
                      className="h-full w-full object-cover rounded-full"
                    />
                    <button
                      className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded"
                      onClick={() => setFieldValue("profileImgURL", null)}
                    >
                      Delete this
                    </button>
                  </div>
                </div>
              ) : (
                <CustomSingleFileInput
                  onChange={(file) => {
                    setFieldValue("profileImgURL", file);
                  }}
                />
              )}
              <ErrorMessage
                className="text-sm text-red-500"
                name="profileImgURL"
                component="span"
              />
            </div>

            <div className="w-full">
              <div className="lg:grid grid-cols-2 gap-5 ">
                <InputWithIcon
                  icon={<AiOutlineUser />}
                  title="First Name"
                  name="firstName"
                  placeholder="Enter here"
                />
                <InputWithIcon
                  icon={<AiOutlineUser />}
                  title="Last Name"
                  name="lastName"
                  placeholder="Enter here"
                />

                <InputWithIcon
                  icon={<AiOutlinePhone />}
                  title="Phone Number"
                  name="phoneNumber"
                  placeholder="Enter here"
                />
                <InputWithIcon
                  icon={<RiCalendarEventFill />}
                  title="Date of birth"
                  name="dateOfBirth"
                  placeholder="Enter here"
                />
                <InputWithIcon
                  icon={<AiOutlineMail />}
                  title="Email"
                  name="email"
                  placeholder="Enter here"
                />
                {emailChanged && (
                  <div>
                    <p>OTP is send to Email Please enter below</p>
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
                )}
              </div>
              <button
                type="submit"
                className="btn-blue text-white w-full my-3"
                disabled={loading}
              >
                {loading ? "Loading..." : "Edit Profile"}
              </button>
              {error && <p className="my-2 text-red-400">{error}</p>}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfile;
