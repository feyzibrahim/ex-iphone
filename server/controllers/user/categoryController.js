const Category = require("../../model/categoryModel");

const getCategories = async (req, res) => {
  try {
    let filter = {
      isActive: true,
    };

    const categories = await Category.find(filter);

    res.status(200).json({ categories });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getCategories };
