const mongoose = require("mongoose");

const myObject = mongoose.Schema(
  {
    timestamp: String,
    email: String,
    discord_id: String,
    discord_name: String,
    status: String,
    twitter: String,
    cust_id: String,
    channel: String,
  },
  { versionKey: false }
);

const subscriber = mongoose.model("subscriber", myObject);

module.exports.subscriber = subscriber;
