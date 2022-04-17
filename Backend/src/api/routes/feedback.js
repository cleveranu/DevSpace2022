const { join } = require("path");
const router = require("express").Router();

const Feedback = require(join(__dirname, "..", "models", "Feedback"));

router.post("/add", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const feedback = new Feedback({
      name,
      email,
      message
    });
    await feedback.save();
    return res.status(201).json({ message: "Feedback created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;