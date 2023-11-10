const Wallet = require("../../model/walletModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const getWalletTotal = async (req, res) => {
  try {
    const token = req.cookies.user_token;

    const { _id } = jwt.verify(token, process.env.SECRET);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid user Id!!!");
    }

    const wallet = await Wallet.findOne({ user: _id }, { balance: 1 });

    if (!wallet) {
      throw Error("Wallet is not found");
    }

    return res.status(200).json({ balance: wallet.balance });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getWallet = async (req, res) => {
  try {
    const token = req.cookies.user_token;

    const { _id } = jwt.verify(token, process.env.SECRET);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid user Id!!!");
    }

    const wallet = await Wallet.findOne({ user: _id });

    return res.status(200).json({ wallet });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getWalletTotal,
  getWallet,
};
