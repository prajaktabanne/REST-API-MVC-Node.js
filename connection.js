const mongoose = require("mongoose");

async function connectMongoDB(url) {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to reciBlogAppDB");
    })
    .catch((err) => console.log("Opps! you have some problem", err));
}

module.exports = {
  connectMongoDB,
};
