const mongoose = require("mongoose");
const User = require("./userModel");
const Order = require("./orderModel");

const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: Order,
      required: true,
    },
    razorpay_payment_id: {
      type: String,
    },
    razorpay_order_id: {
      type: String,
    },
    razorpay_signature: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "success", "canceled", "refunded"],
      default: "pending",
    },
    paymentMode: {
      type: String,
      required: true,
      enum: ["cashOnDelivery", "razorPay", "myWallet"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
