const Review = require("../../model/reviewModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Product = require("../../model/productModel");
const Order = require("../../model/orderModel");

// Creating a new review for each product
const createNewReview = async (req, res) => {
  try {
    const token = req.cookies.user_token;

    const { _id } = jwt.verify(token, process.env.SECRET);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid user Id!!!");
    }

    const body = req.body;

    if (!mongoose.Types.ObjectId.isValid(body.order)) {
      const order = await Order.findOne({ orderId: body.order });
      body.order = order._id;
    }

    const reviewExists = await Review.findOne({
      user: _id,
      product: body.product,
      order: body.order,
    });

    if (reviewExists) {
      throw Error("You have already reviewed. Please go to end of page");
    }

    const product = await Product.findOne({ _id: body.product });
    if (!product) {
      throw Error("Product not found");
    }

    let newRating = body.rating;
    let newNumberOfReviews = 1;

    if (product.rating !== undefined && product.numberOfReviews !== undefined) {
      newRating =
        (product.rating * product.numberOfReviews + body.rating) /
        (product.numberOfReviews + 1);
      newNumberOfReviews = product.numberOfReviews + 1;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      body.product,
      {
        $set: {
          rating: newRating,
          numberOfReviews: newNumberOfReviews,
        },
      },
      { new: true }
    );

    const review = await Review.create({ ...body, user: _id });

    res.status(200).json({ review, updatedProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Reading all the review from product details page
const readProductReviews = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const reviews = await Review.find({ product: id }).populate("user", {
      firstName: 1,
      lastName: 1,
      profileImgURL: 1,
    });
    if (!reviews || reviews.length < 1) {
      throw Error("No reviews so far");
    }
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// General Review Reading
const readProductReview = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const token = req.cookies.user_token;

    const { _id } = jwt.verify(token, process.env.SECRET);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid user Id!!!");
    }

    const review = await Review.findOne({ product: id, user: _id });
    if (!review) {
      throw Error("No Review Found");
    }

    res.status(200).json({ review });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read user reviews on order history page
const readOrderReview = async (req, res) => {
  try {
    const token = req.cookies.user_token;

    const { _id } = jwt.verify(token, process.env.SECRET);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid user Id!!!");
    }

    // Fetching order Id
    const { id } = req.params;
    let find = {};
    if (mongoose.Types.ObjectId.isValid(id)) {
      find._id = id;
    } else {
      find.orderId = id;
    }
    const order = await Order.findOne(find);

    const reviews = await Review.find({ order: order._id, user: _id }).populate(
      "user",
      {
        firstName: 1,
        lastName: 1,
        profileImgURL: 1,
      }
    );
    if (!reviews) {
      throw Error("No Review Found");
    }

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deleting a review
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      throw Error("No review found");
    }

    res.status(200).json({ review });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Editing the review
const editReview = async (req, res) => {
  try {
    const { id } = req.params;

    const body = req.body;

    const existingReview = await Review.findOne({
      _id: id,
    });

    if (!existingReview) {
      throw Error("Review not found");
    }

    const product = await Product.findOne({ _id: body.product });
    if (!product) {
      throw Error("Product not found");
    }

    // Calculate the change in rating
    const ratingChange = body.rating - existingReview.rating;

    // Update the product rating and number of reviews
    const newRating =
      (product.rating * product.numberOfReviews + ratingChange) /
      product.numberOfReviews;

    await Product.findByIdAndUpdate(
      body.product,
      {
        $set: {
          rating: newRating,
        },
      },
      { new: true }
    );

    // Update the review
    const updatedReview = await Review.findByIdAndUpdate(
      existingReview._id,
      {
        $set: {
          ...body,
        },
      },
      { new: true }
    ).populate("user", {
      firstName: 1,
      lastName: 1,
      profileImgURL: 1,
    });

    res.status(200).json({ review: updatedReview });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createNewReview,
  readProductReviews,
  readProductReview,
  deleteReview,
  editReview,
  readOrderReview,
};
