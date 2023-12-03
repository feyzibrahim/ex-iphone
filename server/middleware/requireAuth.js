const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.user_token;

    const { _id } = jwt.verify(token, process.env.SECRET);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid ID!!!");
    }
    const user = await User.findOne({ _id });

    if (!user.isActive) {
      throw Error("User is blocked by admin");
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
};

module.exports = requireAuth;
