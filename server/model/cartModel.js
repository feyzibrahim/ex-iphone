const mongoose = require("mongoose");
const User = require("./userModel");
const Product = require("./productModel");
const Coupon = require("./couponModel");

const { Schema } = mongoose;

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: Product,
      },
      quantity: {
        type: Number,
      },
    },
  ],
  coupon: {
    type: Schema.Types.ObjectId,
    ref: Coupon,
  },
  couponCode: {
    type: String,
  },
  discount: {
    type: Number,
  },
  type: {
    type: String,
  },
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
