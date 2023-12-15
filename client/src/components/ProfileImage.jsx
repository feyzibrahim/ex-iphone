import React from "react";
import { URL } from "../Common/api";

const ProfileImage = ({ user }) => {
  if (user.profileImgURL) {
    return (
      <div className="h-full w-full rounded-full shrink-0 overflow-clip">
        <img
          src={`${URL}/img/${user.profileImgURL}`}
          alt="profile"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  if (user.profileImageURL) {
    return (
      <div className="h-full w-full rounded-full shrink-0 overflow-clip">
        <img
          src={`${user.profileImageURL}`}
          alt="profile"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }
  return (
    <div className="w-full h-full bg-gray-100 rounded-full shrink-0"></div>
  );
};

export default ProfileImage;
