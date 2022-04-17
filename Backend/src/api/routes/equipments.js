const { join } = require("path");
const router = require("express").Router();
const Equipments = require(join(__dirname, "..", "models", "Equipments"));
const { verifyUser } = require(join(__dirname, "..", "middleware", "auth"));

router.post("/new", verifyUser, async (req, res) => {
  const { title, completed } = req.body;
  if (!title) return res.status(400).json({ message: "Please provide title and completed" });
  const newEquipments = new Equipments({
    userID: req.user.user.id,
    title,
    completed,
  });
  try {
    const savedEquipments = await newEquipments.save();
    res.status(200).send(savedEquipments);
  } catch (error) {
    res.status(500).send(error);
  } 
});

router.put("/", verifyUser, async (req, res) => {
  const { id, title, completed } = req.body;
  if (!id) return res.status(400).json({ message: "Please provide id" });
  try {
    const updatedEquipments = await Equipments.findByIdAndUpdate(id, { $set: { title, completed } }, { new: true });
    res.status(200).send(updatedEquipments);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", verifyUser, async (req, res) => {
  const user = req.user.user.id;
  try {
    const equipments = await Equipments.find({ userID: user });
    res.status(200).send(equipments);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/", verifyUser, async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "Please provide id" });
  try {
    const deletedEquipments = await Equipments.findByIdAndDelete(id);
    res.status(200).send(deletedEquipments);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;