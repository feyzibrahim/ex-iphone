const Products = require("../../model/productModel");

// Reading entire banners
const getIphone = async (req, res) => {
  try {
    const iphone = await Products.find(
      {
        category: "653cd76485d84b451a7729f2",
        isActive: true,
      },
      { imageURL: 1, price: 1, markup: 1, name: 1 }
    )
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({ iphone });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getIphone,
};
