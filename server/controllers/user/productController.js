const Product = require("../../model/productModel");
const mongoose = require("mongoose");

const getProducts = async (req, res) => {
  try {
    const { category, price, search, sort, page = 1, limit = 4 } = req.query;

    let filter = {};
    if (category) filter.category = { $in: category.split(",") };
    if (search) {
      filter.name = { $regex: new RegExp(search, "i") };
    }
    if (price) {
      if (price === "Under 25000") {
        filter.price = { $lte: 25000 };
      }
      if (price === "25000-50000") {
        filter.price = { $gte: 25000, $lte: 50000 };
      }
      if (price === "50000-100000") {
        filter.price = { $gte: 50000, $lte: 100000 };
      }
      if (price === "100000-150000") {
        filter.price = { $gte: 100000, $lte: 150000 };
      }
      if (price === "200000-300000") {
        filter.price = { $gte: 200000, $lte: 300000 };
      }
      if (price === "Above 300000") {
        filter.price = { $gte: 300000 };
      }
    }

    let sortOptions = {};

    if (sort === "created-desc") {
      sortOptions.createdAt = 1;
    }

    if (sort === "price-asc") {
      sortOptions.price = 1;
    }
    if (sort === "price-desc") {
      sortOptions.price = -1;
    }
    if (!sort) {
      sortOptions.createdAt = -1;
    }

    const skip = (page - 1) * limit;
    const products = await Product.find(
      {
        status: { $in: ["published", "low quantity"] },
        ...filter,
      },
      {
        name: 1,
        imageURL: 1,
        price: 1,
        markup: 1,
        numberOfReviews: 1,
        rating: 1,
        offer: 1,
      }
    )
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("category", { name: 1 });

    const totalAvailableProducts = await Product.countDocuments({
      status: { $in: ["published", "low quantity"] },
      ...filter,
    });

    res.status(200).json({ products, totalAvailableProducts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const product = await Product.findOne({ _id: id }).populate("category", {
      name: 1,
    });

    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAvailableQuantity = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const stockQuantity = await Product.findOne(
      { _id: id },
      { stockQuantity: 1 }
    );

    res.status(200).json({ stockQuantity: stockQuantity.stockQuantity });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  getAvailableQuantity,
};
