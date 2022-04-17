const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isFarmer: { type: Boolean, default: false },
  number: { type: Number}
});

module.exports = mongoose.model("User", UserSchema);