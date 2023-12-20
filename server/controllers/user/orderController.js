const jwt = require("jsonwebtoken");
const Cart = require("../../model/cartModel");
const mongoose = require("mongoose");
const Address = require("../../model/addressModel");
const Order = require("../../model/orderModel");
const Products = require("../../model/productModel");
const Payment = require("../../model/paymentModel");
const uuid = require("uuid");
const Wallet = require("../../model/walletModel");
const Coupon = require("../../model/couponModel");
const { generateInvoicePDF } = require("../Common/invoicePDFGenFunctions");
const Counter = require("../../model/counterModel");

// Just the function increment or decrement product count
const updateProductList = async (id, count) => {
  const product = await Products.findOne({ _id: id });

  if (count < 0) {
    if (product.stockQuantity - count * -1 < 0) {
      throw Error(`${product.name} doesn\'t have ${count} stock`);
    }
  }

  const updateProduct = await Products.findByIdAndUpdate(
    id,
    {
      $inc: { stockQuantity: count },
    },
    { new: true }
  );

  if (
    parseInt(updateProduct.stockQuantity) < 5 &&
    parseInt(updateProduct.stockQuantity) > 0
  ) {
    await Products.findByIdAndUpdate(id, {
      $set: { status: "low quantity" },
    });
  }

  if (parseInt(updateProduct.stockQuantity) === 0) {
    await Products.findByIdAndUpdate(id, {
      $set: { status: "out of stock" },
    });
  }

  if (parseInt(updateProduct.stockQuantity) > 5) {
    await Products.findByIdAndUpdate(id, {
      $set: { status: "published" },
    });
  }
};

// Creating an order
const createOrder = async (req, res) => {
  try {
    const token = req.cookies.user_token;

    const { _id } = jwt.verify(token, process.env.SECRET);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid ID!!!");
    }

    const { address, paymentMode, notes } = req.body;

    const addressData = await Address.findOne({ _id: address });

    const cart = await Cart.findOne({ user: _id }).populate("items.product", {
      name: 1,
      price: 1,
      markup: 1,
    });

    let sum = 0;
    let totalQuantity = 0;

    cart.items.map((item) => {
      sum = sum + (item.product.price + item.product.markup) * item.quantity;
      totalQuantity = totalQuantity + item.quantity;
    });

    let sumWithTax = parseInt(sum + sum * 0.08);
    if (cart.discount && cart.type === "percentage") {
      const discountAmount = (sum * cart.discount) / 100;
      sumWithTax -= discountAmount;
    } else if (cart.discount && cart.type === "fixed") {
      sumWithTax -= cart.discount;
    }

    const products = cart.items.map((item) => ({
      productId: item.product._id,
      quantity: item.quantity,
      totalPrice: item.product.price + item.product.markup,
      price: item.product.price,
      markup: item.product.markup,
    }));

    let orderData = {
      user: _id,
      address: addressData,
      products: products,
      subTotal: sum,
      tax: parseInt(sum * 0.08),
      totalPrice: sumWithTax,
      paymentMode,
      totalQuantity,
      statusHistory: [
        {
          status: "pending",
        },
      ],
      ...(notes ? notes : {}),
      ...(cart.coupon ? { coupon: cart.coupon } : {}),
      ...(cart.couponCode ? { couponCode: cart.couponCode } : {}),
      ...(cart.discount ? { discount: cart.discount } : {}),
      ...(cart.type ? { couponType: cart.type } : {}),
    };

    const updateProductPromises = products.map((item) => {
      return updateProductList(item.productId, -item.quantity);
    });

    await Promise.all(updateProductPromises);

    const order = await Order.create(orderData);

    if (order) {
      await Cart.findByIdAndDelete(cart._id);
    }

    // When payment is done using wallet reducing the wallet and creating payment
    if (paymentMode === "myWallet") {
      let counter = await Counter.findOne({
        model: "Wallet",
        field: "transaction_id",
      });

      // Checking if order counter already exist
      if (counter) {
        counter.count += 1;
        await counter.save();
      } else {
        counter = await Counter.create({
          model: "Wallet",
          field: "transaction_id",
        });
      }

      const exists = await Wallet.findOne({ user: _id });
      if (!exists) {
        throw Error("No Wallet where found");
      }

      await Payment.create({
        order: order._id,
        payment_id: `wallet_${uuid.v4()}`,
        user: _id,
        status: "success",
        paymentMode: "myWallet",
      });

      let wallet = {};
      if (exists) {
        wallet = await Wallet.findByIdAndUpdate(exists._id, {
          $inc: {
            balance: -sumWithTax,
          },
          $push: {
            transactions: {
              transaction_id: counter.count + 1,
              amount: sumWithTax,
              type: "debit",
              description: "Product Ordered",
              order: order._id,
            },
          },
        });
      }
    }

    if (cart.coupon) {
      await Coupon.findOneAndUpdate(
        { _id: cart.coupon },
        {
          $inc: { used: 1 },
        }
      );
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all order details
const getOrders = async (req, res) => {
  try {
    const token = req.cookies.user_token;

    const { _id } = jwt.verify(token, process.env.SECRET);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid ID!!!");
    }

    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const orders = await Order.find(
      { user: _id },
      {
        address: 0,
        paymentMode: 0,
        deliveryDate: 0,
        user: 0,
        statusHistory: 0,
        products: { $slice: 1 },
      }
    )
      .skip(skip)
      .limit(limit)
      .populate("products.productId", { name: 1 })
      .sort({ createdAt: -1 });

    const totalAvailableOrders = await Order.countDocuments({ user: _id });

    res.status(200).json({ orders, totalAvailableOrders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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

    const order = await Order.findOne(find).populate("products.productId", {
      imageURL: 1,
      name: 1,
      description: 1,
    });

    if (!order) {
      throw Error("No Such Order");
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Cancelling order
const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    let find = {};

    if (mongoose.Types.ObjectId.isValid(id)) {
      find._id = id;
    } else {
      find.orderId = id;
    }

    const orderDetails = await Order.findOne(find).populate(
      "products.productId"
    );

    const products = orderDetails.products.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
    }));

    const updateProductPromises = products.map((item) => {
      return updateProductList(item.productId, item.quantity);
    });

    await Promise.all(updateProductPromises);

    const order = await Order.findOneAndUpdate(
      find,
      {
        $set: {
          status: "cancelled",
        },
        $push: {
          statusHistory: {
            status: "cancelled",
            date: Date.now(),
            reason: reason,
          },
        },
      },
      { new: true }
    );

    if (order.paymentMode !== "cashOnDelivery") {
      const token = req.cookies.user_token;

      const { _id } = jwt.verify(token, process.env.SECRET);

      if (!mongoose.Types.ObjectId.isValid(_id)) {
        throw Error("Invalid ID!!!");
      }
      // Adding the refund to wallet of user.

      await Payment.findOneAndUpdate(
        { order: order._id },
        {
          $set: {
            status: "refunded",
          },
        }
      );

      let counter = await Counter.findOne({
        model: "Wallet",
        field: "transaction_id",
      });

      // Checking if order counter already exist
      if (counter) {
        counter.count += 1;
        await counter.save();
      } else {
        counter = await Counter.create({
          model: "Wallet",
          field: "transaction_id",
        });
      }

      let wallet = {};
      const exists = await Wallet.findOne({ user: _id });
      if (exists) {
        wallet = await Wallet.findByIdAndUpdate(exists._id, {
          $inc: {
            balance: order.totalPrice,
          },
          $push: {
            transactions: {
              transaction_id: counter.count + 1,
              amount: order.totalPrice,
              type: "credit",
              description: "Order Cancellation Refund",
              order: order._id,
            },
          },
        });
      } else {
        wallet = await Wallet.create({
          user: _id,
          balance: order.totalPrice,
          transactions: [
            {
              transaction_id: counter.count + 1,
              amount: order.totalPrice,
              type: "credit",
              description: "Order Cancellation Refund",
              order: order._id,
            },
          ],
        });
      }
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Requesting for returning an order
const requestReturn = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    let find = {};

    if (mongoose.Types.ObjectId.isValid(id)) {
      find._id = id;
    } else {
      find.orderId = id;
    }

    const order = await Order.findOneAndUpdate(
      find,
      {
        $set: {
          status: "return request",
        },
        $push: {
          statusHistory: {
            status: "return request",
            date: Date.now(),
            reason: reason,
          },
        },
      },
      { new: true }
    );
    res.status(200).json({ order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Generating pdf invoices
const generateOrderInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    let find = {};

    if (mongoose.Types.ObjectId.isValid(id)) {
      find._id = id;
    } else {
      find.orderId = id;
    }

    const order = await Order.findOne(find).populate("products.productId");

    const pdfBuffer = await generateInvoicePDF(order);

    // Set headers for the response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");

    res.status(200).end(pdfBuffer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const orderCount = async (req, res) => {
  try {
    const token = req.cookies.user_token;

    const { _id } = jwt.verify(token, process.env.SECRET);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid ID!!!");
    }

    const totalOrders = await Order.countDocuments({ user: _id });
    const pendingOrders = await Order.countDocuments({
      user: _id,
      status: "pending",
    });
    const completedOrders = await Order.countDocuments({
      user: _id,
      status: "delivered",
    });

    res.status(200).json({ totalOrders, pendingOrders, completedOrders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Buy Now function

const buyNow = async (req, res) => {
  try {
    const { address, paymentMode, notes, quantity } = req.body;

    // User Id
    const token = req.cookies.user_token;

    const { _id } = jwt.verify(token, process.env.SECRET);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid ID!!!");
    }
    // Product ID
    const { id } = req.params;

    const product = await Products.findOne({ _id: id });
    if (!product) {
      throw Error("No product were found with this id");
    }

    if (quantity > product.stockQuantity) {
      throw Error("Insufficient Quantity");
    }

    const sum = product.price + product.markup;
    const sumWithTax = parseInt(sum + sum * 0.08);

    // Request Body

    const addressData = await Address.findOne({ _id: address });
    if (!addressData) {
      throw Error("Address cannot be found");
    }

    let products = [];

    products.push({
      productId: product._id,
      quantity: quantity,
      totalPrice: product.price + product.markup,
      price: product.price,
      markup: product.markup,
    });

    let orderData = {
      user: _id,
      address: addressData,
      products: products,
      subTotal: sum,
      tax: parseInt(sum * 0.08),
      totalPrice: sumWithTax,
      paymentMode,
      totalQuantity: quantity,
      statusHistory: [
        {
          status: "pending",
        },
      ],
      ...(notes ? notes : {}),
      // ...(cart.coupon ? { coupon: cart.coupon } : {}),
      // ...(cart.couponCode ? { couponCode: cart.couponCode } : {}),
      // ...(cart.discount ? { discount: cart.discount } : {}),
      // ...(cart.type ? { couponType: cart.type } : {}),
    };

    await updateProductList(id, -quantity);

    const order = await Order.create(orderData);

    // When payment is done using wallet reducing the wallet and creating payment
    if (paymentMode === "myWallet") {
      const exists = await Wallet.findOne({ user: _id });
      if (!exists) {
        throw Error("No Wallet where found");
      }

      await Payment.create({
        order: order._id,
        payment_id: `wallet_${uuid.v4()}`,
        user: _id,
        status: "success",
        paymentMode: "myWallet",
      });

      let counter = await Counter.findOne({
        model: "Wallet",
        field: "transaction_id",
      });

      // Checking if order counter already exist
      if (counter) {
        counter.count += 1;
        await counter.save();
      } else {
        counter = await Counter.create({
          model: "Wallet",
          field: "transaction_id",
        });
      }

      let wallet = {};
      if (exists) {
        wallet = await Wallet.findByIdAndUpdate(exists._id, {
          $inc: {
            balance: -sumWithTax,
          },
          $push: {
            transactions: {
              transaction_id: counter.count + 1,
              amount: sumWithTax,
              type: "debit",
              description: "Product Ordered",
              order: order._id,
            },
          },
        });
      }
    }

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
  requestReturn,
  generateOrderInvoice,
  orderCount,
  buyNow,
};
