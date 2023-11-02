const jwt = require("jsonwebtoken");
const Cart = require("../../model/cartModel");
const mongoose = require("mongoose");
const Address = require("../../model/addressModel");
const Order = require("../../model/orderModel");

const createOrder = async (req, res) => {
  try {
    const token = req.cookies.user_token;

    const { _id } = jwt.verify(token, process.env.SECRET);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid ID!!!");
    }

    const { address, paymentMode } = req.body;

    const addressData = await Address.findOne({ _id: address });

    const cart = await Cart.findOne({ user: _id }).populate("items.product", {
      name: 1,
      price: 1,
      markup: 1,
    });

    let sum = 0;
    let totalQuantity = 0;

    cart.items.map((item) => {
      sum = sum + item.product.price * item.quantity;
      totalQuantity = totalQuantity + item.quantity;
    });

    const sumWithTax = sum + sum * 0.08;

    const products = cart.items.map((item) => ({
      productId: item.product._id,
      quantity: item.quantity,
      price: item.product.price + item.product.markup,
    }));

    let orderData = {
      user: _id,
      address: addressData,
      products: products,
      totalPrice: sumWithTax,
      paymentMode,
      totalQuantity,
    };

    const order = await Order.create(orderData);

    if (order) {
      await Cart.findByIdAndDelete(cart._id);
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const token = req.cookies.user_token;

    const { _id } = jwt.verify(token, process.env.SECRET);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid ID!!!");
    }

    const orders = await Order.find(
      { user: _id },
      {
        address: 0,
        paymentMode: 0,
        totalQuantity: 0,
        deliveryDate: 0,
        user: 0,
        products: { $slice: 1 },
      }
    ).populate("products.productId", { name: 1 });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single order details
const getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const order = await Order.findOne({ _id: id }).populate(
      "products.productId",
      { imageURL: 1, name: 1, description: 1 }
    );

    if (!order) {
      throw Error("No Such Order");
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }
    const order = await Order.findByIdAndUpdate(
      id,
      {
        $set: {
          reason,
          status: "cancelled",
        },
      },
      { new: true }
    );
    res.status(200).json({ order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  cancelOrder,
};
