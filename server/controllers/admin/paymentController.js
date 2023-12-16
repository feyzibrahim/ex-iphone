const Payment = require("../../model/paymentModel");

// Getting all Payments
const getPayments = async (req, res) => {
  try {
    const {
      status,
      search,
      page = 1,
      limit = 10,
      startingDate,
      endingDate,
    } = req.query;

    let filter = {};

    if (status) {
      filter.status = status;
    }
    if (search) {
      filter.payment_id = { $regex: new RegExp(search, "i") };
    }
    const skip = (page - 1) * limit;

    // Date
    if (startingDate) {
      const date = new Date(startingDate);
      filter.createdAt = { $gte: date };
    }
    if (endingDate) {
      const date = new Date(endingDate);
      filter.createdAt = { ...filter.createdAt, $lte: date };
    }

    const payments = await Payment.find(
      { ...filter },
      { order_id: 0, razorpay_signature: 0 }
    )
      .skip(skip)
      .limit(limit)
      .populate("user", { firstName: 1, lastName: 1 })
      .populate("order", { totalPrice: 1, orderId: 1 })
      .sort({ createdAt: -1 });
    const totalAvailablePayments = await Payment.countDocuments(filter);

    return res.status(200).json({ payments, totalAvailablePayments });
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
