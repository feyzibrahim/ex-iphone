const Payment = require("../../model/paymentModel");

// Getting all Payments
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find(
      {},
      { order_id: 0, razorpay_signature: 0 }
    )
      .populate("user", { firstName: 1, lastName: 1 })
      .populate("order", { totalPrice: 1 });

    return res.status(200).json({ payments });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Clearing all payments only for testing
const clearPayments = async (req, res) => {
  try {
    const data = await Payment.deleteMany({});

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPayments,
  clearPayments,
};
