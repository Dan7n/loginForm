const bcrypt = require("bcrypt");
const saltRounds = 10;

function passwordEncryptor() {
  return async (req, res, next) => {
    try {
      const salt = await bcrypt.getSalt(saltRounds);
      const hash = await bcrypt.hash(req.body.password);
      req.headers = {
        salt: salt,
        hash: hash,
      };
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
    next();
  };
}

module.exports = passwordEncryptor;
