const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URL);
}

module.exports = {
  connectDB,
};
