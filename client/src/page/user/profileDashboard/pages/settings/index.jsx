import React, { useRef, useState } from "react";
import PasswordInputWithIcon from "../../../../../components/PasswordInputWithIcon";
import { AiOutlineLock } from "react-icons/ai";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { commonRequest } from "../../../../../Common/api";
import { appJson } from "../../../../../Common/configurations";
import toast from "react-hot-toast";

const SettingsPage = () => {
  const [canEdit, setCanEdit] = useState(true);
  const formikRef = useRef(null);

  const initialValues = {
    currentPassword: "",
    password: "",
    passwordAgain: "",
  };

  const toggleEdit = () => {
    if (!canEdit) {
      formikRef.current.resetForm();
    }
    setCanEdit(!canEdit);
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Password is required"),
    password: Yup.string().required("Password is required"),
    passwordAgain: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password"), null], "Password must match"),
  });

  const handleLoginSubmit = async (value) => {
    const data = await commonRequest(
      "POST",
      "/user/change-password",
      { ...value },
      appJson
    );
    if (data.success) {
      toast.success("Password Updated");
      toggleEdit();
    } else {
      toast.error(data.response.data.error);
    }
  };

  return (
    <div className="bg-white w-full mx-5 lg:mx-0 rounded-lg">
      <div className="border-b px-5 flex justify-between items-center">
        <h1 className="uppercase text-lg font-semibold py-3 ">Settings</h1>
        <button
          className={`${
            canEdit ? "btn-blue-no-pad" : "btn-red-no-pad"
          } px-5 py-2 text-white`}
          onClick={toggleEdit}
        >
          {canEdit ? "Edit" : "Cancel"}
        </button>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleLoginSubmit}
        validationSchema={validationSchema}
        innerRef={formikRef}
      >
        <Form className="w-full p-5">
          <div className="mb-4">
            <PasswordInputWithIcon
              icon={
                <AiOutlineLock
                  className={canEdit ? "text-gray-500" : "to-black"}
                />
              }
              name="currentPassword"
              placeholder="Enter a your current password"
              title="Current Password"
              canEdit={canEdit}
            />
          </div>

          <div className="mb-4">
            <PasswordInputWithIcon
              icon={
                <AiOutlineLock
                  className={canEdit ? "text-gray-500" : "to-black"}
                />
              }
              name="password"
              placeholder="Enter a new password"
              title="New Password"
              canEdit={canEdit}
            />
          </div>

          <div className="mb-4">
            <PasswordInputWithIcon
              icon={
                <AiOutlineLock
                  className={canEdit ? "text-gray-500" : "to-black"}
                />
              }
              name="passwordAgain"
              placeholder="Confirm password"
              title="Confirm Password"
              canEdit={canEdit}
            />
          </div>

          <button
            type="submit"
            className={`${
              canEdit ? "bg-blue-300" : "bg-blue-500"
            } text-white p-2 rounded hover:bg-blue-600 transition duration-300`}
            disabled={canEdit}
          >
            Save Changes
          </button>
        </Form>
      </Formik>{" "}
    </div>
  );
};

export default SettingsPage;
