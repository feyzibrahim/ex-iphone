const Order = require("../../model/orderModel");
const mongoose = require("mongoose");
const Payment = require("../../model/paymentModel");
const uuid = require("uuid");
const ExcelJS = require("exceljs");

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
        {
          status: {
            $in: [
              "pending",
              "processing",
              "shipped",
              "delivered",
              "canceled",
              "returned",
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

// Updating the status of orders.
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, description, date, paymentStatus } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const updated = await Order.findByIdAndUpdate(
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
          },
        },
      },
      { new: true }
    );

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

// Clearing all orders only for testing
const clearOrder = async (req, res) => {
  try {
    const data = await Order.deleteMany({});

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Generating Excel sheet for orders.
const generateOrderExcel = async (req, res) => {
  const { startingDate, endingDate } = req.query;

  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Orders");

    worksheet.columns = [
      { header: "Order ID", key: "_id", width: 20 },
      { header: "User ID", key: "user._id", width: 20 },
      { header: "User Name", key: "user.firstName" },
      { header: "User Email", key: "user.email" },
      { header: "Status", key: "status" },
      { header: "Address", key: "address.address", width: 35 },
      { header: "City", key: "address.city" },
      { header: "Products", key: "products", width: 40 },
      { header: "Subtotal", key: "subTotal" },
      { header: "Shipping", key: "shipping" },
      { header: "Tax", key: "tax" },
      { header: "Total Price", key: "totalPrice" },
    ];

    // Filtering based on dates. If they are provided along the URL as query
    const filter = {};
    if (startingDate) {
      const date = new Date(startingDate);
      filter.createdAt = { $gte: date };
    }
    if (endingDate) {
      const date = new Date(endingDate);
      filter.createdAt = { ...filter.createdAt, $lte: date };
    }

    // Fetching all the orders
    const orders = await Order.find(filter).populate([
      "user",
      "address",
      "statusHistory",
      "products",
      "products.productId",
    ]);

    orders.map((item) => {
      const productsDetails = item.products
        .map((product) => {
          return `${product.productId.name} (${product.quantity} units, ₹${product.price} each)`;
        })
        .join("\n");

      const row = {
        _id: item._id.toString(),
        "user._id": item.user._id.toString(),
        "user.firstName": item.user.firstName + " " + item.user.lastName,
        "user.email": item.user.email,
        status: item.status,
        "address.address": item.address.address,
        "address.city": item.address.city,
        products: productsDetails,
        subTotal: item.subTotal,
        shipping: item.shipping,
        tax: item.tax,
        totalPrice: item.totalPrice,
      };

      worksheet.addRow(row);
    });

    // Set headers for the response
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=orders.xlsx");

    const buffer = await workbook.xlsx.writeBuffer();

    res.send(buffer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getOrders,
  clearOrder,
  updateOrderStatus,
  getOrder,
  generateOrderExcel,
};
