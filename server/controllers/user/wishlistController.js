const jwt = require("jsonwebtoken");
const Wishlist = require("../../model/wishlistModel");
const mongoose = require("mongoose");
const Products = require("../../model/productModel");

// Getting entire wishlist of corresponding user
const getWishlist = async (req, res) => {
  try {
    const token = req.cookies.user_token;

    const { _id } = jwt.verify(token, process.env.SECRET);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid ID!!!");
    }

    const wishlist = await Wishlist.findOne({ user: _id })
      .populate("items.product", {
        name: 1,
        imageURL: 1,
        price: 1,
        markup: 1,
        status: 1,
      })
      .sort({ createdAt: -1 });

    if (!wishlist) {
      throw Error("Wishlist is empty");
    }

    res.status(200).json({ wishlist });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add a product to wishlist. Also if the wishlist doesn't exists it creates a new one
const addToWishlist = async (req, res) => {
  try {
    const token = req.cookies.user_token;
    const { _id } = jwt.verify(token, process.env.SECRET);
    const item = req.body;

    const product = await Products.findById(item.product);
    if (!product) {
      throw new Error("Product not found");
    }

    let wishlist = await Wishlist.findOne({ user: _id });

    // If the wishlist doesn't exist, create a new one with the item
    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: _id,
        items: [{ product: item.product }],
      });
    } else {
      const isProductInWishlist = wishlist.items.some(
        (pro) => pro.product.toString() === item.product
      );

      // adding product only if the product doesn't exists in the wishlist
      if (!isProductInWishlist) {
        wishlist = await Wishlist.findOneAndUpdate(
          { _id: wishlist._id },
          {
            $push: {
              items: {
                product: item.product,
              },
            },
          },
          { new: true }
        );
      } else {
        // Sending an error if it already exists in the wishlist
        throw Error("Already in Wishlist");
      }
    }

    let newWishlist = await Wishlist.findOne({ _id: wishlist._id }).populate(
      "items.product",
      {
        name: 1,
        imageURL: 1,
        price: 1,
        markup: 1,
        status: 1,
      }
    );

    res.status(200).json({ wishlist: newWishlist });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deleting entire wishlist
const deleteWishlist = async (req, res) => {
  try {
    const token = req.cookies.user_token;

    const { _id } = jwt.verify(token, process.env.SECRET);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid user Id!!!");
    }

    const wishlistItem = await Wishlist.findOneAndDelete({ user: _id });
    if (!wishlistItem) {
      throw Error("No Such Wishlist");
    }

    res.status(200).json({ wishlistItem });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// removing one product at a time from wishlist
const deleteOneProductFromWishlist = async (req, res) => {
  try {
    const token = req.cookies.user_token;

    const { _id } = jwt.verify(token, process.env.SECRET);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid user Id!!!");
    }

    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw Error("Invalid Product !!!");
    }

    const wishlist = await Wishlist.findOne({ user: _id });

    if (!wishlist) {
      throw Error("Couldn't find the wallet");
    }

    const product = await Products.findOne({ _id: productId });
    if (!product) {
      throw Error("Cannot find the product");
    }

    const updatedWishlist = await Wishlist.findByIdAndUpdate(
      wishlist._id,
      {
        $pull: {
          items: { product: productId },
        },
      },
      { new: true }
    );

    if (!updatedWishlist) {
      throw Error("Invalid Product");
    }

    res.status(200).json({ productId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  deleteWishlist,
  deleteOneProductFromWishlist,
};
