require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "secret123";

const verifyToken = (req, res, next) => {
  const token = req.header("token");
  if (token) {
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid token"
        });
      }
      req.user = user;
      next();
    });
  }
  else {
    return res.status(401).json({
      message: "No token provided"
    });
  }
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }
  });
};

const verifyFarmer = (req, res, next) => { 
  verifyToken(req, res, () => {
    if (req.user.isFarmer) {
      next();
    } else {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }
  });
};

module.exports = {
  verifyToken,
  verifyUser,
  verifyFarmer
};