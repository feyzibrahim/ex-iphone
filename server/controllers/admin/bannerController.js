const Banner = require("../../model/bannerModel");

// Creating Banner collection for first time. if already existing just pushing the banners to existing array.
const addBanners = async (req, res) => {
  try {
    const files = req?.files;

    let filesNames = [];

    if (files && files.length > 0) {
      files.forEach((file) => filesNames.push(file.filename));
    } else {
      throw Error("No files are uploaded");
    }

    const exists = await Banner.findOne();

    let banners = "";
    if (!exists) {
      banners = await Banner.create({ images: filesNames });
    } else {
      banners = await Banner.findByIdAndUpdate(
        exists._id,
        {
          $push: {
            images: filesNames,
          },
        },
        { new: true }
      );
    }

    return res.status(200).json({ banners });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Reading entire banners
const readBanners = async (req, res) => {
  try {
    const banners = await Banner.findOne();

    return res.status(200).json({ banners });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deleting one banner
const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const exists = await Banner.findOne();

    const banners = await Banner.findByIdAndUpdate(
      exists._id,
      {
        $pull: {
          images: id,
        },
      },
      { new: true }
    );

    return res.status(200).json({ banners });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Updating the listing order
const updateBannerOrder = async (req, res) => {
  try {
    const { images } = req.body;

    const exists = await Banner.findOne();

    if (!exists) {
      throw Error("No Banner Collection in the DB");
    }

    const banners = await Banner.findByIdAndUpdate(
      exists._id,
      {
        $set: {
          images: images,
        },
      },
      { new: true }
    );

    return res.status(200).json({ banners });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addBanners,
  readBanners,
  deleteBanner,
  updateBannerOrder,
};
