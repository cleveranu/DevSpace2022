const mongoose = require("mongoose");

const CropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  farmer: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  image: { type: String, required: false },
  total: { type: Number, required: true },
  sold: { type: Number, default: 0 },
});
// marketplace
module.exports = mongoose.model("Buyer_Marketplace", CropSchema);