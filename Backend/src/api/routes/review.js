const { join } = require("path");
const router = require("express").Router();
const Review = require(join(__dirname, "..", "models", "Review"));
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  try {
    // needs to implement auth or cors
    const reviews = await Review.find();
    const reviewArray = reviews.map(review => {
      return {
        name: review.name,
        review: review.review
      };
    });
    return res.status(200).json(reviewArray);
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
});

router.post("/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("review", "Review is required").not().isEmpty()
  ],
  async (req, res) => {
    // needs to implement auth or cors
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }
    const { name, review } = req.body;
    try {
      const r = new Review({
        name,
        review
      });
      r.save().
        then(() => {
          res.status(201).json({ message: "Review added successfully" });
        }).
        catch(err => {
          console.error(err.message);
          res.status(500).json({ message: "Server error" });
        });
    } catch (err) {
      return res.status(500).json({
        message: err.message
      });
    }
  });

module.exports = router;
