const User = require("../model/userModel");
const OTP = require("../model/otpModel");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const mailSender = require("../util/mailSender");
const bcrypt = require("bcrypt");

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

    await OTP.create({ email, otp });

    res.status(200).json({ success: true, message: "OTP sent Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    res.status(400).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw Error("Provide an Email");
    }

    if (!validator.isEmail(email)) {
      throw Error("Invalid Email");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw Error("Email is not Registered");
    }

    const otpExists = await OTP.findOne({ email });

    if (otpExists) {
      throw Error("OTP is already send to your email");
    }

    let otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 10000;

    await OTP.create({ email, otp });

    res
      .status(200)
      .json({ msg: "OTP is send to your email Address", success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const validateForgotOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      throw Error("All fields are required");
    }

    if (!validator.isEmail(email)) {
      throw Error("Invalid Email");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw Error("Email is not Registered");
    }

    const validOTP = await OTP.findOne({ email });

    if (otp !== validOTP.otp) {
      throw Error("Wrong OTP. Please Check again");
    }

    res.status(200).json({ success: true, message: "OTP validation Success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const newPassword = async (req, res) => {
  try {
    const { email, password, passwordAgain } = req.body;

    if (!email || !password || !passwordAgain) {
      throw Error("All fields are required");
    }

    if (!validator.isEmail(email)) {
      throw Error("Invalid Email");
    }

    if (!validator.isStrongPassword(password)) {
      throw Error("Password is not Strong enough");
    }

    if (password !== passwordAgain) {
      throw Error("Passwords are not same");
    }

    const oldUserData = await User.findOne({ email });

    const match = await bcrypt.compare(password, oldUserData.password);

    if (match) {
      throw Error("Provide new Password");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          password: hash,
        },
      }
    );

    if (user) {
      try {
        const mailResponse = await mailSender(
          email,
          "Email Authentication Notification",
          `<h1>Your password has been changed</h1>
           <p>If it is not done by you please contact customer care</p>`
        );
        console.log("Email sent successfully: ", mailResponse);
      } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
      }
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  sendOTP,
  validateOTP,
  forgotPassword,
  validateForgotOTP,
  newPassword,
};
