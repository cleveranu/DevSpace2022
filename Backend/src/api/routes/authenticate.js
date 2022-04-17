const { join } = require("path");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const User = require(join(__dirname, "..", "models", "User"));
const secret = process.env.JWT_SECRET || "secret123";

router.post("/signup", 
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 5 characters long").isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }
    const { email, password, name, isFarmer } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) { return res.status(400).json({ message: "User already exists" }); }
      user = new User({ name, email, password, isFarmer });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = { user: { id: user.id }, isFarmer: user.isFarmer, name: user.name };
      jwt.sign(payload, secret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.status(201).json({ status: "ok", token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

router.post("/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) { return res.status(400).json({ errors: error.array() }); }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) { return res.status(400).json({ message: "User does not exist" }); }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) { return res.status(400).json({ message: "Invalid credentials" }); }
      const payload = { user: { id: user.id }, isFarmer: user.isFarmer, name: user.name };
      jwt.sign(payload, secret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.status(200).json({ status: "ok", token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

module.exports = router;