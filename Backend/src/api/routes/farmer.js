const { join } = require("path");
const router = require("express").Router();
const Farmer = require(join(__dirname, "..", "models", "Farmer"));
const { verifyFarmer } = require(join(__dirname, "..", "middleware", "auth"));
/* eslint-disable no-unused-vars */
// this is for farmer dashboard
router.post("/opentocontract", verifyFarmer, async (req, res) => {
  const { openToContractFarming } = req.body;
  try {
    const farmer = await Farmer.findById(req.user.user.id);
    if (!farmer) {
      return res.status(400).json({ message: "User does not exist" });
    }
    if (!openToContractFarming !== "true" && !openToContractFarming !== "false") return res.status(400).json({ message: "Invalid input" });
    farmer.openToContractFarming = openToContractFarming;
    await farmer.save();
    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});
router.post("/crop", verifyFarmer, async (req, res) => {
  const { name, description, details, location } = req.body;
  if (!details.howOld) {
    return res.status(400).json({ message: "Details must be in this format: { howOld: String, estimatedTime: String }" });
  }
  if (!location.city || !location.state || !location.disctrict) 
    return res.status(400).json({ message: "Location must be in this format: { city: String, state: String, disctrict: String }" });
  if (!name || !description || !details || !location )
    return res.status(400).json({ message: "All fields are required" });

  try {
    const farmer = await Farmer.findOne({ _id: req.user.user.id });
    if (!farmer) {
      const newFarmer = new Farmer({
        _id: req.user.user.id,
        crops: [{
          name,
          description,
          details: {
            howOld: details.howOld,
            estimatedTime: details.estimatedTime
          },
          location: {
            city: location.city,
            state: location.state,
            disctrict: location.disctrict
          }
        }],
      });
      await newFarmer.save();
    }
    
    const cropExists = farmer.crops.find(crop => crop.name === name);
    console.log(cropExists);
    if (cropExists) {
      return res.status(400).json({ message: "Crop already exists" });
    }
    const updatedFarmer = await Farmer.findOneAndUpdate(
      { _id: req.user.user.id },
      { $push: { crops: [{ name, description, details, location }] } },
      { new: true }
    );

    return res.status(201).json({ message: "Farmer updated successfully" });
  
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }

});

router.get("/crop", verifyFarmer, async (req, res) => { // works
  await Farmer.findOne({ farmer: req.user.user.id })
    .then(farmer => {
      return res.status(200).json({ name: req.user.name, farmer });
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    });
});

router.put("/crop", verifyFarmer, async (req, res) => {
    
  const { name, description, details, location, openToContractFarming } = req.body;
  if (!details.howOld || !details.estimatedTime) {
    return res.status(400).json({ message: "Details must be in this format: { howOld: String, estimatedTime: String }" });
  }
  if (!location.city || !location.state || !location.disctrict) 
    return res.status(400).json({ message: "Location must be in this format: { city: String, state: String, disctrict: String }" });

  Farmer.findOneAndUpdate({
    farmer: req.user.user.id,
    "crops.name": name
  }, {
    $set: {
      "crops.$.name": name,
      "crops.$.description": description,
      "crops.$.details": details,
      "crops.$.location": location,
      "crops.$.openToContractFarming": openToContractFarming
    }
  }, { new: true })
    .then(farmer => { 
      return res.status(201).json({ message: "Crop updated successfully" });
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    });
});

router.delete("/crop", verifyFarmer, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });

  Farmer.findOneAndUpdate({
    farmer: req.user.user.id,
    "crops.name": name
  }, {
    $pull: {
      "crops": {
        name
      }
    }
  }, { new: true })
    .then(farmer => {
      return res.status(201).json({ message: "Crop deleted successfully" });
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    });
});

module.exports = router;