const mongoose = require("mongoose");
const User = require("./userModel");
const Product = require("./productModel");

const { Schema } = mongoose;

const WishListSchema = new Schema({
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
    },
  ],
});

const WishList = mongoose.model("WishList", WishListSchema);

module.exports = WishList;
