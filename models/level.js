const mongoose = require("mongoose");

const myObject = mongoose.Schema(
  {
    timestamp: String,
    date: Date,
    symbol: String,
    levels: String,
    major: String,
    comment: String,
    trade_ideas: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("level", myObject);
