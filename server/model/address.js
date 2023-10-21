const mongoose = require("mongoose");

const { Schema } = mongoose;

const AddressSchema = new Schema({
  City: {
    type: String,
  },
  Country: {
    type: String,
  },
  PinCode: {
    type: Number,
  },
  AddressType: {
    type: String,
    enum: ["Shipping", "Communication"],
  },
  State: {
    type: String,
  },
  Street: {
    type: String,
  },
  User: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const Address = mongoose.model("Address", AddressSchema);

export default Address;
