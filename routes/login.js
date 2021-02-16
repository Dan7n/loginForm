const express = require("express");
const logginRouter = express.Router();
const User = require("./../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

logginRouter.get("/", (req, res) => {
  res.render("login.ejs", { error: "" });
});

logginRouter.post("/", async (req, res) => {
  const logginAttempt = await User.findOne({
    email: req.body.email,
  });
  if (!logginAttempt)
    return res.render("login", {
      error: "Please enter valid login credentials",
    });
  const isCorrectPassword = await bcrypt.compare(
    req.body.password,
    logginAttempt.password
  );
  if (!isCorrectPassword) {
    return res.render("login", { error: "Please enter a correct password" });
  } else {
    const user = { name: logginAttempt };
    const validLogin = jwt.sign(user, process.env.PRIVATE_KEY);
    if (validLogin) {
      const userCookie = res.cookie.validLogin;

      if (!userCookie) {
        // res.cookie("validLogin", validLogin, { maxAge: 3000, httpOnly: true });
        console.log("this is working");
        res.cookie("validLogin", validLogin);
        res.render("content.ejs");
      }
    }
  }

  //   const user = { name: logginAttempt };
  //   console.log("this user is: " + logginAttempt);
  //   //   console.log(process.env.PRIVATE_KEY);
  //   if (isCorrectPassword) {
  //     console.log("correct password");
  //     jwt.sign(user, process.env.PRIVATE_KEY);
  //   }
});

module.exports = logginRouter;
