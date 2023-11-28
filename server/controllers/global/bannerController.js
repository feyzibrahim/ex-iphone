const Banner = require("../../model/bannerModel");

// Reading entire banners
const getBanners = async (req, res) => {
  try {
    const banners = await Banner.findOne();

    return res.status(200).json({ banners });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getBanners,
};
