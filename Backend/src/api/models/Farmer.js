const mongoose = require("mongoose");

const FarmerSchema =  new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  crops: [{
    name: { type: String },
    description: { type: String },
    details: {
      howOld: { type: String },
      estimatedTime: { type: String }, //
    },
    location: {
      city: { type: String },
      state: { type: String },
      district: { type: String },
    },
  }],
  openToContractFarming: { type: Boolean, default: false },
});

module.exports = mongoose.model("Farmer", FarmerSchema);

// done 