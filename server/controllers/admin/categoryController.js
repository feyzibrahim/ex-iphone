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
    // const files = req?.files;

    // if (files && files.length > 0) {
    //   formData.moreImageURL = [];
    //   formData.imageURL = "";
    //   files.map((file) => {
    //     if (file.fieldname === "imageURL") {
    //       formData.imageURL = file.filename;
    //     } else {
    //       formData.moreImageURL.push(file.filename);
    //     }
    //   });
    // }

    console.log(formData);

    const category = await Category.create(formData);

    console.log(category);

    res.status(200).json({ category });
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
