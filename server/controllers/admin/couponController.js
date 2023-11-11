const Coupon = require("../../model/couponModel");
const mongoose = require("mongoose");

// Getting all coupons
const getCoupons = async (req, res) => {
  try {
    const query = req.query;

    let coupons;
    if (Object.keys(query).length === 0) {
      coupons = await Coupon.find(
        {},
        { description: 0, minimumPurchaseAmount: 0, maximumUses: 0 }
      );
    } else {
      let { isActive } = query;
      coupons = await Coupon.find(
        { isActive },
        { description: 0, minimumPurchaseAmount: 0, maximumUses: 0 }
      );
    }

    return res.status(200).json({ coupons });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Getting one coupon with URL params
const getCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const coupon = await Coupon.findOne({ _id: id });

    return res.status(200).json({ coupon });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Creating new coupon
const addCoupon = async (req, res) => {
  try {
    const body = req.body;

    const coupon = await Coupon.create(body);

    return res.status(200).json({ coupon });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Editing existing coupons
const editCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    let formData = req.body;

    const coupon = await Coupon.findOneAndUpdate(
      { _id: id },
      { $set: { ...formData } },
      { new: true }
    );

    if (!coupon) {
      throw Error("No such Coupon");
    }

    res.status(200).json({ coupon });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deleting a coupon testing only
const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const coupon = await Coupon.findOneAndDelete({ _id: id });

    if (!coupon) {
      throw Error("No such Coupon");
    }

    res.status(200).json({ coupon });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCoupons,
  getCoupon,
  addCoupon,
  editCoupon,
  deleteCoupon,
};
