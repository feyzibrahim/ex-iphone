const Category = require("../../model/categoryModel");

const getCategories = async (req, res) => {
  try {
    let filter = {};
    filter.isActive = true;

    const categories = await Category.find(filter, {
      name: 1,
      imgURL: 1,
      _id: 0,
    }).limit(7);

    res.status(200).json({ categories });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getCategories };
