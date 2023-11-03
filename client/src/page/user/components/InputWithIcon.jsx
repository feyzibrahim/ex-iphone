import React from "react";

const InputWithIcon = ({ title, name, icon }) => {
  return (
    <div>
      <p>
        <label htmlFor="username">{title}</label>
      </p>
      <div className="flex items-center">
        <div className="sign-up-icon">{icon}</div>
        <p className="sign-up-input w-full">{name}</p>
      </div>
    </div>
  );
};

export default InputWithIcon;
