const Order = require("../../model/orderModel");
const mongoose = require("mongoose");

// Get Orders List
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find(
      {},
      {
        address: 0,
        products: { $slice: 1 },
      }
    )
      .populate("user", { firstName: 1, lastName: 1 })
      .populate("products.productId", { imageURL: 1, name: 1 });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const { status } = req.body;
    console.log(req.body);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const updated = await Order.findByIdAndUpdate(
      id,
      {
        $set: {
          status,
        },
      },
      { new: true }
    );

    if (!updated) {
      throw Error("Something went wrong");
    }

    const order = await Order.findById(id, {
      address: 0,
      products: { $slice: 1 },
    })
      .populate("user", { firstName: 1, lastName: 1 })
      .populate("products.productId", { imageURL: 1, name: 1 });

    res.status(200).json({ order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const clearOrder = async (req, res) => {
  try {
    const data = await Order.deleteMany({});

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getOrders,
  clearOrder,
  updateOrderStatus,
};
