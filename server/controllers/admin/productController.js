const Product = require("../../model/productModel");
const mongoose = require("mongoose");

function isValidStatus(status) {
  const validStatusValues = [
    "draft",
    "published",
    "out of stock",
    "low quantity",
    "unpublished",
  ];

  return validStatusValues.includes(status);
}

// Getting all products to list on admin dashboard
const getProducts = async (req, res) => {
  try {
    const query = req.query;
    let products;
    if (Object.keys(query).length === 0) {
      products = await Product.find(
        {},
        { attributes: 0, moreImageURL: 0, category: 0 }
      );
    }

    let status = query.status;

    if (status) {
      if (!isValidStatus(status)) {
        throw Error("Not a valid query");
      }
      products = await Product.find(
        { status },
        { attributes: 0, moreImageURL: 0, category: 0 }
      );

      if (products.length === 0) {
        throw Error(`No ${status} products`);
      }
    }

    res.status(200).json({ products });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get single Product
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const product = await Product.findOne({ _id: id });

    if (!product) {
      throw Error("No Such Product");
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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

    const product = await Product.create(formData);

    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a Product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const formData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const files = req?.files;

    if (files && files.length > 0) {
      formData.moreImageURL = [];
      formData.imageURL = "";
      files.map((file) => {
        if (file.fieldname === "imageURL") {
          formData.imageURL = file.filename;
        } else {
          formData.moreImageURL.push(file.filename);
          console.log("SOmething here");
        }
      });

      if (formData.imageURL === "") {
        delete formData.imageURL;
      }

      if (formData.moreImageURL.length === 0 || formData.moreImageURL === "") {
        delete formData.moreImageURL;
      }
    }

    if (formData.moreImageURL === "") {
      formData.moreImageURL = [];
    }

    console.log(formData);

    if (formData.attributes) {
      const attributes = JSON.parse(formData.attributes);
      formData.attributes = attributes;
    }

    const product = await Product.findOneAndUpdate(
      { _id: id },
      { $set: { ...formData } },
      { new: true }
    );

    if (!product) {
      throw Error("No Such Product");
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deleting a Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const product = await Product.findOneAndDelete({ _id: id });

    if (!product) {
      throw Error("No Such Product");
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
};
