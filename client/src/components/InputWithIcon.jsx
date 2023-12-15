import React from "react";
import { Field, ErrorMessage } from "formik";

const InputWithIcon = ({ title, name, icon, placeholder, as }) => {
  return (
    <div>
      <p>
        <label htmlFor="username">{title}</label>
      </p>
      <div className="flex items-center">
        <div className="sign-up-icon">{icon}</div>
        <Field
          className="sign-up-input w-full"
          name={name}
          type={as}
          placeholder={placeholder}
        />
      </div>
      <ErrorMessage
        className="text-sm text-red-500"
        name={name}
        component="span"
      />
    </div>
  );
};

export default InputWithIcon;
