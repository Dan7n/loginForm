const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  timeCreated: {
    type: Date,
    default: Date.now(),
  },
  token: {
    type: String,
  },
  expiration: {
    type: Date,
    default: Date.now(),
    expires: 3600,
  },
});

module.exports = mongoose.model("User", UserSchema);
