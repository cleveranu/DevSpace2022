const { join } = require("path");
const router = require("express").Router();
const News = require(join(__dirname, "..", "models", "News"));
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  try {
    // needs to implement auth or cors
    const news = await News.find();
    const newsArray = news.map(news => {
      return {
        title: news.title,
        description: news.description,
        category: news.category,
        date: news.date
      };
    });
    return res.status(200).json(newsArray);
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
});

router.post("/", async (req, res) => {
  const { title, description, category } = req.body;
  try {
    const n = new News({
      title,
      description,
      category
    });
    n.save().
      then(() => {
        res.status(201).json({ message: "News added successfully" });
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
