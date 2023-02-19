const { Schema, model } = require("mongoose");

const launchesSchema = new Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  mission: { type: String, required: true },
  launchDate: { type: Date, required: true },
  rocket: {
    type: String,
    required: true,
  },
  target: {
    type: String,
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = model("Launch", launchesSchema);
