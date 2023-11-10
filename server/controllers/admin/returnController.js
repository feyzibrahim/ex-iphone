const Order = require("../../model/orderModel");
const mongoose = require("mongoose");
const Payment = require("../../model/paymentModel");
const Wallet = require("../../model/walletModel");

function isValidStatus(status) {
  const validStatusValues = [
    "return request",
    "return approved",
    "return rejected",
    "pickup completed",
  ];

  return validStatusValues.includes(status);
}

// Return count of return orders
const getReturnCount = async (req, res) => {
  try {
    const count = await Order.find(
      {
        status: {
          $in: ["return request"],
        },
      },
      {}
    ).count();

    res.status(200).json({ count });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single return order details
const getReturnOrder = async (req, res) => {
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

// Get Return Orders List
const getReturnOrders = async (req, res) => {
  try {
    const query = req.query;
    let orders;

    // getting all return orders when there is no query
    if (Object.keys(query).length === 0) {
      orders = await Order.find(
        {
          status: {
            $in: [
              "return request",
              "return approved",
              "return rejected",
              "pickup completed",
            ],
          },
        },
        {
          address: 0,
          statusHistory: 0,
          products: { $slice: 1 },
        }
      )
        .populate("user", { firstName: 1, lastName: 1 })
        .populate("products.productId", { imageURL: 1, name: 1 })
        .sort({ createdAt: -1 });
    }

    // getting return orders with query
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
        .populate("products.productId", { imageURL: 1, name: 1 })
        .sort({ createdAt: -1 });
      if (orders.length === 0) {
        throw Error(`No ${status} orders`);
      }
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Updating the status of return orders
const updateReturnOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, description, date, reason, refund } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        $set: {
          status,
        },
        $push: {
          statusHistory: {
            status,
            description,
            date: new Date(date),
            ...(reason ? { reason } : {}),
          },
        },
      },
      { new: true }
    );

    if (!updatedOrder) {
      throw Error("Something went wrong");
    }

    // If refund is requested initiating a refund for the user
    if (refund === "yes") {
      // Existing payment is marking as refunded
      await Payment.findOneAndUpdate(
        { order: id },
        {
          $set: {
            status: "refunded",
          },
        }
      );

      // Adding the refund to wallet of user.
      let wallet = {};
      const exists = await Wallet.findOne({ user: updatedOrder.user });
      if (exists) {
        wallet = await Wallet.findByIdAndUpdate(exists._id, {
          $inc: {
            balance: updatedOrder.totalPrice,
          },
          $push: {
            transactions: {
              amount: updatedOrder.totalPrice,
              type: "credit",
              description,
              order: id,
            },
          },
        });
      } else {
        wallet = await Wallet.create({
          user: updatedOrder.user,
          balance: updatedOrder.totalPrice,
          transactions: [
            {
              amount: updatedOrder.totalPrice,
              type: "credit",
              description,
              order: id,
            },
          ],
        });
      }
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

module.exports = {
  getReturnCount,
  getReturnOrders,
  updateReturnOrderStatus,
  getReturnOrder,
};
