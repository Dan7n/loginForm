const jwt = require("jsonwebtoken");

function cookieChecker(req, res, next) {
  const userToken = req.cookies["validLogin"];

  //check if the client has this cookie set
  if (!userToken) {
    res.send("You're not logged in!");
  }

  //vertify that the cookie is valie
  const isValid = jwt.verify(userToken, process.env.PRIVATE_KEY);
  console.log(isValid);

  next();
}

module.exports = cookieChecker;
