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
    const { status, search, page = 1, limit = 10 } = req.query;

    let filter = {};

    if (status) {
      if (!isValidStatus(status)) {
        throw Error("Not a valid status");
      }
      filter.status = status;
    } else {
      filter.status = {
        $in: [
          "return request",
          "return approved",
          "return rejected",
          "pickup completed",
        ],
      };
    }

    if (search) {
      filter._id = search;
    }

    const skip = (page - 1) * limit;

    const orders = await Order.find(filter, {
      address: 0,
      statusHistory: 0,
      products: { $slice: 1 },
    })
      .skip(skip)
      .limit(limit)
      .populate("user", { firstName: 1, lastName: 1 })
      .populate("products.productId", { imageURL: 1, name: 1 })
      .sort({ createdAt: -1 });

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
