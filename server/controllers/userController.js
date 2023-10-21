const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

const cookieConfig = {
  secure: true,
  httpOnly: true,
  // maxAge: 1000 * 60 * 60 * 24,
  maxAge: 10000,
};

const signUpUser = async (req, res) => {
  try {
    const userCredentials = req.body;

    const user = await User.signup(userCredentials, "user");

    const token = createToken(user._id);

    res.cookie("user_token", token, cookieConfig);

    res.status(200).json({ user });
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

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signUpUser,
  loginUser,
};
