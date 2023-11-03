const jwt = require("jsonwebtoken");
const Cart = require("../../model/cartModel");
const mongoose = require("mongoose");
const Products = require("../../model/productModel");

const getCart = async (req, res) => {
  try {
    const token = req.cookies.user_token;

    const { _id } = jwt.verify(token, process.env.SECRET);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid ID!!!");
    }

    const cart = await Cart.findOne({ user: _id }).populate("items.product", {
      name: 1,
      imageURL: 1,
      price: 1,
    });

    res.status(200).json({ cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const token = req.cookies.user_token;
    const { _id } = jwt.verify(token, process.env.SECRET);
    const items = req.body;

    const product = await Products.findById(items.product);
    if (!product) {
      throw new Error("Product not found");
    }

    if (product.stockQuantity < items.quantity) {
      throw new Error("Insufficient stock Quantity");
    }

    let cart = {};
    const exists = await Cart.findOne({ user: _id });

    if (exists) {
      const existingProductIndex = exists.items.findIndex((item) =>
        item.product.equals(items.product)
      );

      if (existingProductIndex !== -1) {
        // If the product exists in the cart, update its quantity
        cart = await Cart.findOneAndUpdate(
          { "items.product": items.product, user: _id },
          {
            $inc: {
              "items.$.quantity": items.quantity,
            },
          },
          { new: true }
        );
      } else {
        // If the product doesn't exist in the cart, add it
        cart = await Cart.findOneAndUpdate(
          { user: _id },
          {
            $push: {
              items: {
                product: items.product,
                quantity: items.quantity,
              },
            },
          },
          { new: true }
        );
      }
    } else {
      // If the cart doesn't exist, create a new one with the item
      cart = await Cart.create({
        user: _id,
        items: [{ product: items.product, quantity: items.quantity }],
      });
    }

    res.status(200).json({ cart: cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const cartItem = await Cart.findOneAndDelete({ _id: id });
    if (!cartItem) {
      throw Error("No Such Cart");
    }

    res.status(200).json({ cartItem });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteOneProduct = async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw Error("Invalid Product !!!");
    }
    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      throw Error("Invalid Cart !!!");
    }

    const updatedCart = await Cart.findByIdAndUpdate(cartId, {
      $pull: {
        items: { product: productId },
      },
    });

    if (!updatedCart) {
      throw Error("Invalid Product");
    }

    console.log(updatedCart);

    res.status(200).json({ productId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  deleteCart,
  deleteOneProduct,
};
