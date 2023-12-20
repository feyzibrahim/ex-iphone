const Order = require("../../model/orderModel");
const mongoose = require("mongoose");
const Payment = require("../../model/paymentModel");
const uuid = require("uuid");
const { generateInvoicePDF } = require("../Common/invoicePDFGenFunctions");

// Function checking if the passed status is valid or not. Ensuring redundant searches are avoided
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

    let find = {};

    if (mongoose.Types.ObjectId.isValid(id)) {
      find._id = id;
    } else {
      find.orderId = id;
    }

    // console.log(find);

    const order = await Order.findOne(find).populate("products.productId", {
      imageURL: 1,
      name: 1,
    });

    // console.log(order);

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
    const {
      status,
      search,
      page = 1,
      limit = 10,
      startingDate,
      endingDate,
    } = req.query;

    let filter = {};

    // Date
    if (startingDate) {
      const date = new Date(startingDate);
      filter.createdAt = { $gte: date };
    }
    if (endingDate) {
      const date = new Date(endingDate);
      filter.createdAt = { ...filter.createdAt, $lte: date };
    }

    if (status) {
      if (!isValidStatus(status)) {
        throw Error("Not a valid status");
      }
      filter.status = status;
    } else {
      filter.status = {
        $in: [
          "pending",
          "processing",
          "shipped",
          "delivered",
          "cancelled",
          "returned",
        ],
      };
    }

    if (search) {
      if (mongoose.Types.ObjectId.isValid(search)) {
        filter._id = search;
      } else {
        const searchAsNumber = Number(search);
        if (!isNaN(searchAsNumber)) {
          filter.orderId = searchAsNumber;
        } else {
          throw new Error("Please search using order Id");
        }
      }
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

    const totalAvailableOrders = await Order.countDocuments(filter);

    res.status(200).json({ orders, totalAvailableOrders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Updating the status of orders.
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;

    let find = {};
    if (mongoose.Types.ObjectId.isValid(id)) {
      find._id = id;
    } else {
      find.orderId = id;
    }
    const { status, description, date, paymentStatus } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const statusExists = await Order.findOne({
      ...find,
      "statusHistory.status": status,
    });

    let updateOptions = {
      $set: {
        status,
      },
    };

    if (!statusExists) {
      updateOptions.$push = {
        statusHistory: {
          status,
          description,
          date: new Date(date),
        },
      };
    }

    const updated = await Order.findOneAndUpdate(find, updateOptions, {
      new: true,
    });

    if (!updated) {
      throw Error("Something went wrong");
    }

    if (paymentStatus === "yes") {
      await Payment.create({
        order: updated._id,
        payment_id: `cod_${uuid.v4()}`,
        user: updated.user,
        status: "success",
        paymentMode: "cashOnDelivery",
      });
    }

    if (paymentStatus === "no") {
      await Payment.create({
        order: updated._id,
        user: updated.user,
        status: "pending",
        paymentMode: "cashOnDelivery",
      });
    }

    const order = await Order.findOne(find, {
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

// Generating pdf invoices
const generateOrderInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate("products.productId");

    const pdfBuffer = await generateInvoicePDF(order);

    // Set headers for the response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");

    res.status(200).end(pdfBuffer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Clearing all orders only for testing
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
  generateOrderInvoice,
};
