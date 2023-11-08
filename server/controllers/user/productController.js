const Product = require("../../model/productModel");
const mongoose = require("mongoose");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find(
      {
        status: { $in: ["published", "low quantity"] },
      },
      { name: 1, imageURL: 1, price: 1, markup: 1 }
    ).populate("category", { name: 1 });

    res.status(200).json({ products });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const product = await Product.findOne({ _id: id });

    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
};
