const mongoose = require("mongoose");

const myObject = mongoose.Schema(
  {
    timestamp: String,
    date: Date,
    symbol: String,
    levels: String,
    comment: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("level", myObject);
