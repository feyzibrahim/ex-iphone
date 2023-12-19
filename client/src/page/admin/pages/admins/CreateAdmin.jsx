import React from "react";
import {
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineClose,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewAdmin } from "../../../../redux/actions/superAdmin/adminAction";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputWithIcon from "../../../../components/InputWithIcon";
import PasswordInputWithIcon from "../../../../components/PasswordInputWithIcon";
import BreadCrumbs from "../../Components/BreadCrumbs";

const CreateAdmin = () => {
  const { loading, error } = useSelector((state) => state.admins);

  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordAgain: "",
    phoneNumber: "",
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

  const handleCreateAdmin = async (value) => {
    const formData = new FormData();

    formData.append("firstName", value.firstName);
    formData.append("lastName", value.lastName);
    formData.append("email", value.email);
    formData.append("password", value.password);
    formData.append("passwordAgain", value.passwordAgain);
    formData.append("phoneNumber", value.phoneNumber);

    dispatch(createNewAdmin(formData)).then(() => {
      navigate(-1);
    });
  };

  return (
    <div className="p-5 w-full overflow-y-auto text-sm">
      <div className="flex justify-between items-center text-sm font-semibold">
        <div>
          <h1 className="font-bold text-2xl">Manage Admins</h1>
          <BreadCrumbs
            list={["Dashboard", "Admins List", "Create new Admin"]}
          />
        </div>
        <div className="flex gap-3">
          <button
            className="admin-button-fl bg-gray-200 text-blue-700"
            onClick={() => navigate(-1)}
          >
            <AiOutlineClose />
            Cancel
          </button>
          {/* <button
            className="admin-button-fl bg-blue-700 text-white"
            onClick={() => navigate("create")}
          >
            <AiOutlinePlus />
            Create New Admin
          </button> */}
        </div>
      </div>
      <div className="w-2/5 mx-auto">
        <h1 className="text-2xl my-5 font-bold">Create a new Admin</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleCreateAdmin}
          validationSchema={validationSchema}
        >
          <Form className="w-full">
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
        </Formik>
      </div>
    </div>
  );
};

export default CreateAdmin;
