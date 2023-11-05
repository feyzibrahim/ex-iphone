const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

const cookieConfig = {
  secure: true,
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24,
};

// To get user data on initial page load.
const getUserDataFirst = async (req, res) => {
  if (!req.cookies.user_token) {
    return res.status(401).json({ error: "No token found" });
  }

  const token = req.cookies.user_token;

  const { _id } = jwt.verify(token, process.env.SECRET);

  const user = await User.findOne({ _id }, { password: 0 });

  res.status(200).json(user);
};

const signUpUser = async (req, res) => {
  try {
    let userCredentials = req.body;

    const profileImgURL = req?.file?.filename;
    console.log(profileImgURL);

    if (profileImgURL) {
      userCredentials = { ...userCredentials, profileImgURL: profileImgURL };
    }

    const user = await User.signup(userCredentials, "user", false);

    const token = createToken(user._id);

    res.cookie("user_token", token, cookieConfig);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.cookie("user_token", token, cookieConfig);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("user_token");

  res.status(200).json({ msg: "Logged out Successfully" });
};

const editUser = async (req, res) => {
  try {
    const token = req.cookies.user_token;

    const { _id } = jwt.verify(token, process.env.SECRET);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid ID!!!");
    }

    let formData = req.body;

    const profileImgURL = req?.file?.filename;

    if (profileImgURL) {
      formData = { ...formData, profileImgURL: profileImgURL };
    }

    const user = await User.findOneAndUpdate(
      { _id },
      { $set: { ...formData } },
      { new: true }
    );

    if (!user) {
      throw Error("No such User");
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUserDataFirst,
  signUpUser,
  loginUser,
  logoutUser,
  editUser,
};
