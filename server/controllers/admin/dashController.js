const Order = require("../../model/orderModel");
const User = require("../../model/userModel");
const moment = require("moment");

// Reading the admin Dashboard sales chart data
const readRevenueData = async (req, res) => {
  try {
    const numberOfDates = req.query.numberOfDates || 7;

    const totalSales = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: moment().subtract(numberOfDates, "days").toDate(),
            $lte: new Date(),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    const eachDayData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: moment().subtract(numberOfDates, "days").toDate(),
            $lte: new Date(),
          },
        },
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            orderId: "$_id",
          },
          totalSum: { $sum: "$totalPrice" },
          totalMarkup: { $sum: "$products.markup" },
        },
      },
      {
        $group: {
          _id: "$_id.date",
          totalSum: { $sum: "$totalSum" },
          totalMarkup: { $sum: "$totalMarkup" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const salesSum = totalSales[0];

    return res.status(200).json({ salesSum, eachDayData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Reading the count of users
const readUserCount = async (req, res) => {
  try {
    const numberOfDates = req.query.numberOfDates || 7;

    const userCount = await User.find({ role: "user" }).count();

    const userCountsByDay = await User.aggregate([
      {
        $match: {
          role: "user",
          createdAt: {
            $gte: moment().subtract(numberOfDates, "days").toDate(),
            $lte: new Date(),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return res.status(200).json({ userCount, userCountsByDay });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Reading the total count of products sold, and products sold on each day
const readSalesData = async (req, res) => {
  try {
    const numberOfDates = req.query.numberOfDates || 7;
    const query = {};
    const startDate = new Date();

    if (numberOfDates !== null) {
      startDate.setDate(startDate.getDate() - numberOfDates);
      query.createdAt = { $gte: startDate };
    }

    const orders = await Order.find(query);
    let totalProductsCount = 0;

    orders.forEach((order) => {
      totalProductsCount += order.products.reduce(
        (acc, product) => acc + product.quantity,
        0
      );
    });

    const productsByDay = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          totalProductsCount: { $sum: "$products.quantity" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return res.status(200).json({ totalProductsCount, productsByDay });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Reading the total profits and profits made on each day
const readProfitData = async (req, res) => {
  try {
    const numberOfDates = req.query.numberOfDates || 7;
    const query = {};
    const startDate = new Date();

    if (numberOfDates !== null) {
      startDate.setDate(startDate.getDate() - numberOfDates);
      query.createdAt = { $gte: startDate };
    }

    const profit = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: null,
          totalMarkupSum: { $sum: "$products.markup" },
        },
      },
    ]);

    const profitByDay = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          dailyMarkupSum: { $sum: "$products.markup" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const totalProfit = profit[0];
    return res.status(200).json({ totalProfit, profitByDay });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Reading the best 5 most sold products
const readMostSoldProducts = async (req, res) => {
  try {
    const numberOfDates = req.query.numberOfDates || 7;
    const limit = req.query.limit || 5;
    const startDate = new Date();

    if (numberOfDates !== null) {
      startDate.setDate(startDate.getDate() - numberOfDates);
    }

    const mostSoldProducts = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: "$products.productId",
          totalQuantitySold: { $sum: "$products.quantity" },
        },
      },
      {
        $sort: {
          totalQuantitySold: -1,
        },
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $project: {
          _id: "$productDetails._id",
          name: "$productDetails.name",
          totalQuantitySold: "$totalQuantitySold",
        },
      },
    ]);

    return res.status(200).json({ mostSoldProducts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  readRevenueData,
  readUserCount,
  readSalesData,
  readProfitData,
  readMostSoldProducts,
};
