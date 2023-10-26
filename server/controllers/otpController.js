const User = require("../model/userModel");
const OTP = require("../model/otpModel");
const jwt = require("jsonwebtoken");

const sendOTP = async (req, res) => {
  try {
    const token = req.cookies.user_token;

    const { _id } = jwt.verify(token, process.env.SECRET);

    const user = await User.findOne({ _id }, { password: 0 });

    let otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 10000;

    const email = user.email;

    const exists = await OTP.findOne({ email });

    if (exists) {
      return;
    }

    const otpData = await OTP.create({ email, otp });

    res.status(200).json({ success: true, message: "OTP sent Successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const validateOTP = async (req, res) => {
  const { otp } = req.body;

  try {
    const token = req.cookies.user_token;

    const { _id } = jwt.verify(token, process.env.SECRET);

    const user = await User.findOne({ _id }, { password: 0 });

    if (!user) {
      throw Error("Invalid Email");
    }

    const email = user.email;

    const data = await OTP.findOne({ email });

    if (!data) {
      throw Error("OTP expired");
    }

    if (otp !== data.otp) {
      throw Error("OTP is not matched");
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          isEmailVerified: true,
        },
      },
      { new: true, projection: { password: 0 } }
    );

    res.status(200).json({
      success: true,
      message: "OTP validation Success",
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  sendOTP,
  validateOTP,
};
