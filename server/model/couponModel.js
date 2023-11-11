const mongoose = require("mongoose");

const { Schema } = mongoose;

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    value: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    minimumPurchaseAmount: {
      type: Number,
      default: 0,
    },
    used: {
      type: Number,
      default: 0,
    },
    maximumUses: {
      type: Number,
      default: null,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
