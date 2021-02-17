const express = require("express");
const newPasswordRouter = express.Router();
const User = require("./../models/User");

newPasswordRouter.get("/:token", async (req, res) => {
  const resetToken = req.params.token;
  //   console.log(resetToken);
  const user = await User.findOne({ email: "dan7.isaac@gmail.com" });
  //   console.log("the use is" + user);
  res.render("newPasswordForm", { resetToken: resetToken, user: user });
});

newPasswordRouter.post("/", async (req, res) => {
  const user = await User.findOne({ email });
});

module.exports = newPasswordRouter;
