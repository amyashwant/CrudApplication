const mongoose = require("mongoose");

const plusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      max: 50,
      required: true,
    },
    number: {
      type: String,
      // max: 300000000,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plus", plusSchema);
