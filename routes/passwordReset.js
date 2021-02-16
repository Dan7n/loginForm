const express = require("express");
const passwordResetRouter = express.Router();
const cookieChecker = require("./../middleware/cookieChecker");
const User = require("./../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendMail = require("./../middleware/sendMail.js");

passwordResetRouter.get("/", (req, res) => {
  res.render("passwordReset.ejs", { error: "" });
});

passwordResetRouter.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.render("register.ejs", {
      error:
        "We could not find a user with the provided email address in our database. Please register an account to continue.",
    });
  //TODO: check if user has a token, in which case delete it!
  const passwordResetToken = await crypto.randomBytes(32).toString("hex");
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(passwordResetToken, salt);

  user.token = passwordResetToken;
  user.expiration = Date.now() + 900000;
  await user.save();
  sendMail("dan7.isaac@gmail.com", passwordResetToken);
  res.send(passwordResetToken);
});

module.exports = passwordResetRouter;
