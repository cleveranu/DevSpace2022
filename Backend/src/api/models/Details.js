const mongoose = require("mongoose");

const DetailSchema = new mongoose.Schema({
  crop: { type: String, required: true },
  maxTemp: { type: Number, required: true },
  minTemp: { type: Number, required: true },
  avgTemp: { type: Number, required: true },
  avghumidity: { type: Number, required: true },
  howOld: { type: String, required: true },
  estimatedTime: { type: String, required: true },
});

module.exports = mongoose.model("Detail", DetailSchema);