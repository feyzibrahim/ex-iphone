const mongoose = require("mongoose");
const User = require("./userModel");

const { Schema } = mongoose;

const AddressSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
  },
  address: {
    type: String,
  },
  country: {
    type: String,
  },
  regionState: {
    type: String,
  },
  city: {
    type: String,
  },
  pinCode: {
    type: Number,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
});

const Address = mongoose.model("Address", AddressSchema);

module.exports = Address;
