import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputWithIcon from "./components/InputWithIcon";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
  AiOutlineClose,
  AiOutlineWallet,
} from "react-icons/ai";
import { RiCalendarEventFill } from "react-icons/ri";
import { TiTick } from "react-icons/ti";
import Modal from "../../components/Modal";
import EditProfile from "./components/EditProfile";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.user);

  const [showEditProfile, setShowEditProfile] = useState(false);
  const toggleEditProfile = () => {
    setShowEditProfile(!showEditProfile);
  };

  return (
    <>
      {showEditProfile && (
        <Modal tab={<EditProfile closeToggle={toggleEditProfile} />} />
      )}
      <div className="bg-white rounded-lg w-full">
        <h1 className="uppercase text-lg font-semibold px-5 py-3 border-b">
          Profile Settings
        </h1>
        <div className="w-full">
          <div className="lg:flex items-start gap-5 p-5">
            {user?.profileImgURL && typeof user?.profileImgURL === "string" ? (
              <div className="h-56 w-56 rounded-full shrink-0 overflow-clip">
                <img
                  src={`http://localhost:4000/img/${user?.profileImgURL}`}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="w-56 h-56 bg-gray-100 rounded-full shrink-0"></div>
            )}
            <div className="w-full">
              <div className="lg:grid grid-cols-2 gap-5 ">
                <InputWithIcon
                  icon={<AiOutlineUser />}
                  title="First Name"
                  name={user?.firstName || "-"}
                />
                <InputWithIcon
                  icon={<AiOutlineUser />}
                  title="Last Name"
                  name={user?.lastName || "-"}
                />
                <InputWithIcon
                  icon={<AiOutlineMail />}
                  title="Email"
                  name={user?.email || "-"}
                />
                <InputWithIcon
                  icon={<AiOutlinePhone />}
                  title="Phone Number"
                  name={user?.phoneNumber || "-"}
                />
                <InputWithIcon
                  icon={<RiCalendarEventFill />}
                  title="Date of birth"
                  name={user?.dateOfBirth || "-"}
                />
                <InputWithIcon
                  icon={
                    user?.isEmailVerified ? (
                      <TiTick className="text-green-500" />
                    ) : (
                      <AiOutlineClose className="text-red-500" />
                    )
                  }
                  title="Email Verified?"
                  name={user?.isEmailVerified ? "Yes" : "No"}
                />
                <InputWithIcon
                  icon={<AiOutlineWallet />}
                  title="Wallet Balance"
                  name={user?.walletBalance || "-"}
                />
              </div>
              <button
                type="submit"
                className="btn-blue text-white w-full my-3"
                onClick={toggleEditProfile}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
