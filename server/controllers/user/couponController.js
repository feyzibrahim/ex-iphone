const Coupon = require("../../model/couponModel");

const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({ isActive: true });

    return res.status(200).json({ coupons });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCoupons,
};
