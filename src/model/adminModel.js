const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const adminSchema = new Schema({
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
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("admins", adminSchema);
module.exports = Admin;
