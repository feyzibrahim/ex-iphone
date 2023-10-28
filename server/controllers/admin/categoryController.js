const Category = require("../../model/categoryModel");
const mongoose = require("mongoose");

// Getting all Categories to list on admin dashboard
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({ categories });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const category = await Category.findOne({ _id: id });

    if (!category) {
      throw Error("No Such Category");
    }

    res.status(200).json({ category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Creating new Category if needed for admin
const createCategory = async (req, res) => {
  try {
    // Will be update later
    let formData = req.body;
    const imgURL = req?.file?.filename;

    if (imgURL) {
      formData = { ...formData, imgURL: imgURL };
    }

    const category = await Category.create(formData);

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    let formData = req.body;
    console.log(formData);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const imgURL = req?.file?.filename;

    if (imgURL) {
      formData = { ...formData, imgURL: imgURL };
    }

    console.log(formData);

    const category = await Category.findOneAndUpdate(
      { _id: id },
      { $set: { ...formData } },
      { new: true }
    );

    if (!category) {
      throw Error("No such Category");
    }

    console.log(category);

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCategory = (req, res) => {
  const { id } = req.params;

  console.log(id);

  res.status(200).json({ msg: `Category Number ${id} - Deleted` });
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};
