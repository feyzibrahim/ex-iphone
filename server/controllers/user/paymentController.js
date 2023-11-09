const RazorPay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../../model/paymentModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createRazerPayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const instance = new RazorPay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    const options = {
      amount: amount,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        throw Error(error);
      }
      res.status(200).json({ order });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const token = req.cookies.user_token;

    const { _id } = jwt.verify(token, process.env.SECRET);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid user Id!!!");
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      throw Error("Invalid Signature sent");
    }

    const payment = await Payment.create({
      ...req.body,
      payment_id: razorpay_payment_id,
      user: _id,
      status: "success",
      paymentMode: "razorPay",
    });

    return res
      .status(200)
      .json({ message: "Payment verified successfully", payment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getKey = (req, res) => {
  return res.status(200).json({ key: process.env.KEY_ID });
};

module.exports = {
  createRazerPayOrder,
  verifyPayment,
  getKey,
};
