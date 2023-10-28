const Category = require("../../model/categoryModel");

// Getting all Categories to list on admin dashboard
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({ categories });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCategory = (req, res) => {
  const { id } = req.params;

  console.log(id);

  res.status(200).json({ msg: `Category id ${id}` });
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

const updateCategory = (req, res) => {
  const { id } = req.params;

  console.log(id);

  res.status(200).json({ msg: `Category Number ${id} - updated` });
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
