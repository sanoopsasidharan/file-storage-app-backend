const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fileSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  url: {
    type: String,
    required: true,
  },
  userId: {},
  fileName: {},
});

const Files = mongoose.model("files", fileSchema);
module.exports = Files;
