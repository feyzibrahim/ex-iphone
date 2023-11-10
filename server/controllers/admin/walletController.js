const Wallet = require("../../model/walletModel");

const clearWallet = async (req, res) => {
  try {
    const data = await Wallet.deleteMany({});

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  clearWallet,
};
