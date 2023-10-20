import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";

const SocialMedia = () => {
  return (
    <div className="flex gap-2">
      <p className="navbar-span">
        <AiFillFacebook />
      </p>
      <p className="navbar-span">
        <AiFillInstagram />
      </p>
      <p className="navbar-span">
        <AiFillYoutube />
      </p>
      <p className="navbar-span">
        <AiOutlineTwitter />
      </p>
    </div>
  );
};

export default SocialMedia;
