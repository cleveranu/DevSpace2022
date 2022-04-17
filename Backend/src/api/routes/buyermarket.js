const { join } = require("path");
const router = require("express").Router();
const BuyerMarketPlace = require(join(__dirname, "..", "models", "BuyerMarketplace"));
const { verifyFarmer } = require(join(__dirname, "..", "middleware", "auth"));

router.post("/add", verifyFarmer, async (req, res) => {
  const {name, description, price, total} = req.body;
  const crop = await BuyerMarketPlace.findOne({ farmer: req.user.user.id, name });
  if (crop) {
    return res.status(400).json({ message: "Crop already exists" });
  }

  try {
    const crop = new BuyerMarketPlace({
      name,
      description,
      price,
      farmer: req.user.user.id,
      total
    });
    
    await crop.save();
    return res.status(201).json({ message: "Crop created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/farmer", verifyFarmer, async (req, res) => {
  try {
    const crops = await BuyerMarketPlace.find({ farmer: req.user.user.id });
    return res.status(200).json({ crops });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/", async (req, res) => {
  try {
    const crops = await BuyerMarketPlace.find({});
    return res.status(200).json({ crops });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.put("/update", verifyFarmer, async (req, res) => {
  const {name, description, price, total} = req.body;
  const crop = await BuyerMarketPlace.findOne({ farmer: req.user.user.id, name });
  if (!crop) {
    return res.status(400).json({ message: "Crop does not exist", "suggestion": "Do a POST Requesr" });
  }

  try {
    await BuyerMarketPlace.findOneAndUpdate({ farmer: req.user.user.id, name }, {
      name,
      description,
      price,
      total
    });
    return res.status(200).json({ message: "Crop updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.delete("/delete", verifyFarmer, async (req, res) => {
  const {name} = req.body;
  const crop = await BuyerMarketPlace.findOne({ farmer: req.user.user.id, name });
  if (!crop) {
    return res.status(400).json({ message: "Crop does not exist" });
  }
  try {
    await BuyerMarketPlace.findOneAndDelete({ farmer: req.user.user.id, name });
    return res.status(200).json({ message: "Crop deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;

