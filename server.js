const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");
const PORT = process.env.PORT || 5000;
const sass = require("node-sass");
const UserSchema = require("./models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const cookieParser = require("cookie-parser");
// const ejsLint = require("ejs-lint");

app.use(bodyParser.urlencoded({ extended: false }));

//express middleware
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(cookieParser()); //used to read and handle cookies

//express routers
const userRegistration = require("./routes/userRegistration.js");
app.use("/register", userRegistration);

const contentRouter = require("./routes/contentRouter");
app.use("/content", contentRouter);

const passwordResetRouter = require("./routes/passwordReset");
app.use("/reset-password", passwordResetRouter);

//express routers
const login = require("./routes/login.js");
app.use("/login", login);

app.get("/", (req, res) => {
  res.render("register.ejs", { error: "" });
});

const mongooseSettings = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.DB_CONNECTION, mongooseSettings, (err) => {
  if (err) {
    return;
  } else {
    app.listen(PORT, () => {
      console.log(`App is now live on port http://localhost:${PORT}/`);
    });
  }
});
