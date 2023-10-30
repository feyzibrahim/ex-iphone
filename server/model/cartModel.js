const mongoose = require("mongoose");
const User = require("./userModel");
const Product = require("./productModel");

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
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
