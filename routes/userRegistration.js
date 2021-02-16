const express = require("express");
const userRegistration = express.Router();
const User = require("./../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const encryptor = require("./../middleware/encryptor.js");

userRegistration.post("/", async (req, res) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    }).save();
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
  res.send("done");
});

module.exports = userRegistration;
