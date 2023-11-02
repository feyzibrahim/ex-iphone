const Order = require("../../model/orderModel");
const mongoose = require("mongoose");

function isValidStatus(status) {
  const validStatusValues = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
    "returned",
  ];

  return validStatusValues.includes(status);
}

// Get a single order details
const getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const order = await Order.findOne({ _id: id }).populate(
      "products.productId",
      { imageURL: 1, name: 1 }
    );

    if (!order) {
      throw Error("No Such Order");
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Orders List
const getOrders = async (req, res) => {
  try {
    const query = req.query;
    let orders;
    if (Object.keys(query).length === 0) {
      orders = await Order.find(
        {},
        {
          address: 0,
          products: { $slice: 1 },
        }
      )
        .populate("user", { firstName: 1, lastName: 1 })
        .populate("products.productId", { imageURL: 1, name: 1 });
    }

    let status = query.status;
    if (status) {
      if (!isValidStatus(status)) {
        throw Error("Not a valid status");
      }

      orders = await Order.find(
        { status: status },
        {
          address: 0,
          products: { $slice: 1 },
        }
      )
        .populate("user", { firstName: 1, lastName: 1 })
        .populate("products.productId", { imageURL: 1, name: 1 });
      if (orders.length === 0) {
        throw Error(`No ${status} orders`);
      }
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

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
  getOrder,
};
