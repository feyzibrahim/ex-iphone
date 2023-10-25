const Product = require("../../model/productModel");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      status: { $in: ["published", "out of stock", "low quantity"] },
    });

    res.status(200).json({ products });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProduct = (req, res) => {
  const { id } = req.params;

  console.log(id);

  res.status(200).json({ msg: `Product Number ${id}` });
};

module.exports = {
  getProducts,
  getProduct,
};
