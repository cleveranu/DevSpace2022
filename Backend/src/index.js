require("dotenv").config();
const { join } = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
var morgan = require("morgan");
require(join(__dirname, "database"));

const app = express();
app.use(morgan("combined"));
mongoose.Promise = global.Promise;
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// routes
app.use("/api/v1/authenticate", require(join(__dirname, "api", "routes", "authenticate")));
app.use("/api/v1/review", require(join(__dirname, "api", "routes", "review")));
app.use("/api/v1/farmer", require(join(__dirname, "api", "routes", "farmer")));
app.use("/api/v1/buyermarket", require(join(__dirname, "api", "routes", "buyermarket")));
app.use("/api/v1/cart", require(join(__dirname, "api", "routes", "cart")));
app.use("/api/v1/news", require(join(__dirname, "api", "routes", "news")));
app.use("/api/v1/feedback", require(join(__dirname, "api", "routes", "feedback")));
app.use("/api/v1/weather", require(join(__dirname, "api", "routes", "weather")));
app.use("/api/v1/equipments", require(join(__dirname, "api", "routes", "equipments")));
const port = process.env.PORT || 3000;

//Start the server
app.listen(port, () => {
  console.log("Server is up at " + port);
});