const Wallet = require("../../model/walletModel");

const getWalletTotal = async (req, res) => {
  try {
    const token = req.cookies.user_token;

    const { _id } = jwt.verify(token, process.env.SECRET);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid user Id!!!");
    }

    const wallet = await Wallet.findOne({ user: _id }, { balance: 1 });

    return res.status(200).jsn({ balance: wallet.balance });
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

    return res.status(200).jsn({ wallet });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getWalletTotal,
  getWallet,
};
