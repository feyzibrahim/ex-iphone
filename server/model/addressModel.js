const mongoose = require("mongoose");

const { Schema } = mongoose;

const AddressSchema = new Schema({
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  pinCode: {
    type: Number,
  },
  addressType: {
    type: String,
    enum: ["Shipping", "Communication"],
  },
  state: {
    type: String,
  },
  street: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const Address = mongoose.model("Address", AddressSchema);

module.exports = Address;
