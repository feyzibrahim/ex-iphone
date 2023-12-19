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

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    // Sorting transactions in descending order based on createdAt
    wallet.transactions.sort((a, b) => b.createdAt - a.createdAt);

    // Pagination
    const page = parseInt(req.query.page) || 1; // Current page, default is 1
    const limit = parseInt(req.query.limit) || 10; // Number of transactions per page
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedTransactions = wallet.transactions.slice(
      startIndex,
      endIndex
    );

    return res.status(200).json({
      wallet: {
        ...wallet.toObject(),
        transactions: paginatedTransactions,
      },
      totalAvailableWalletTransactions: wallet.transactions.length,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getWalletTotal,
  getWallet,
};
