const bcrypt = require("bcrypt");

const hashing = async (password) => {
  const saltRound = 10;
  const newPassword = await bcrypt.hash(password, saltRound);
  //   console.log(newPassword);
  return newPassword;
};

const passwordCheck = async (password, hashPassword) => {
  const isMatch = await bcrypt.compare(password, hashPassword);
  return isMatch;
};

module.exports = { hashing, passwordCheck };
