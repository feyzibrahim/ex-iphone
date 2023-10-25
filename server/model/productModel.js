const mongoose = require("mongoose");

const { Schema } = mongoose;

const productsSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    stockQuantity: {
      type: Number,
    },
    category: {
      type: String,
      // type: Schema.Types.ObjectId,
    },
    imageURL: {
      type: String,
    },
    price: {
      type: Number,
    },
    markup: {
      type: Number,
    },
    status: {
      type: String,
      enum: [
        "draft",
        "published",
        "out of stock",
        "low quantity",
        "unpublished",
      ],
    },
    attributes: [
      {
        name: {
          type: String,
        },
        value: {
          type: String,
        },
        isHighlight: {
          type: Boolean,
        },
      },
    ],
    moreImageURL: [
      {
        type: String,
      },
    ],
    isActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productsSchema);

module.exports = Products;
