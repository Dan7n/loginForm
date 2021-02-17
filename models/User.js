const mongoose = require("mongoose");

// const TokenSchema = new mongoose.Schema({
//   tokenID: {
//     type: String,
//     default: "some value",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now(),
//   },
//   expiration: {
//     type: Date,
//     default: Date.now(),
//   },
// });

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
  token: [
    {
      tokenID: { type: String, default: "some value" },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      expiration: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
