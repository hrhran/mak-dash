const mongoose = require("mongoose");
const winston = require("winston");

module.exports = () => {
  mongoose
    .connect(
      "mongodb+srv://trademak:dWUCNpb68jxSKk0U@serverlessinstance1.ucout.mongodb.net/myFirstDatabase?loadBalanced=true&retryWrites=true&w=majority",
      {}
    )
    .then(() => console.log("MongoDb connected successfuly..."));
};
