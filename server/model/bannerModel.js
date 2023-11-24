const mongoose = require("mongoose");

const { Schema } = mongoose;

const BannerSchema = new Schema({
  images: [String],
});

const Banner = mongoose.model("Banner", BannerSchema);

module.exports = Banner;
