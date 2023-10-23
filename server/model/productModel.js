const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductsSchema = new Schema({
  Name: {
    type: String,
  },
  Description: {
    type: String,
  },
  StockQuantity: {
    type: Number,
  },
  Category: {
    type: Schema.Types.ObjectId,
  },
  ImageURL: {
    type: String,
  },
  Price: {
    type: Number,
  },
  Markup: {
    type: Number,
  },
  Status: {
    type: String,
    enum: ["draft", "published", "out of stock", "low quantity", "unpublished"],
  },
  Attributes: [
    {
      Name: {
        type: String,
      },
      Value: {
        type: String,
      },
    },
  ],
  MoreImageURL: [
    {
      type: String,
    },
  ],
  IsActive: {
    type: Boolean,
  },
});

const Products = mongoose.model("Products", ProductsSchema);

export default Products;
