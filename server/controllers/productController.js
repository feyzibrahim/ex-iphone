const Product = require("../model/productModel");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

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

// Creating new Product
const addProduct = async (req, res) => {
  try {
    let formData = { ...req.body };
    const files = req?.files;

    if (files.length > 0) {
      formData.moreImageURL = [];
      console.log("first");
      files.map((file) => formData.moreImageURL.push(file.filename));
    }

    // const product = await Product.create({ ...req.body });

    res.status(200).json({ product: formData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProduct = (req, res) => {
  const { id } = req.params;

  console.log(id);

  res.status(200).json({ msg: `Product Number ${id} - updated` });
};

const deleteProduct = (req, res) => {
  const { id } = req.params;

  console.log(id);

  res.status(200).json({ msg: `Product Number ${id} - Deleted` });
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
};
