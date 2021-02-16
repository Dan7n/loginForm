const express = require("express");
const contentRouter = express.Router();
const User = require("../models/User");
const cookieChecker = require("./../middleware/cookieChecker");

contentRouter.get("/", cookieChecker, (req, res) => {
  res.render("content.ejs");
});

module.exports = contentRouter;
