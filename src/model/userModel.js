const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  number: {
    type: Number,
    required: true,
    length: 10,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
