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
    let formData = { ...req.body, isActive: true };
    const files = req?.files;

    const attributes = JSON.parse(formData.attributes);

    formData.attributes = attributes;

    if (files && files.length > 0) {
      formData.moreImageURL = [];
      formData.imageURL = "";
      files.map((file) => {
        if (file.fieldname === "imageURL") {
          formData.imageURL = file.filename;
        } else {
          formData.moreImageURL.push(file.filename);
        }
      });
    }

    console.log(formData);

    const product = await Product.create(formData);

    console.log(product);

    res.status(200).json({ product });
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
