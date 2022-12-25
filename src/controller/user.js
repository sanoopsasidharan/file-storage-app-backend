const User = require("../model/userModel");
var ObjectId = require("mongoose").ObjectId;
var mongoose = require("mongoose");
const { hashing, passwordCheck } = require("../config/passwordHashing");
const { AccessToken } = require("../middleware/jwt");
const Files = require("../model/fileModel");
// const query  = {"_id":ObjectId(req.params.productId)}

module.exports = {
  // creating the user
  registerUser: async (req, res, next) => {
    try {
      console.log("createing user");
      let { email, name, number, password } = req.body;
      const doesExist = await User.findOne({ email });
      if (doesExist)
        return res.json({ user: false, msg: `${email} is already registered` });
      // hashing password
      password = await hashing(password);

      const user = new User({ email, name, number, password });
      const saveUser = await user.save();
      res.status(200).json({ saveUser, user: true, msg: "" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  // lising all users
  usersList: async (req, res, next) => {
    try {
      const users = await User.find();
      console.log(users);
      if (users.length > 0) res.json({ users, meg: "user list" });
      else res.json({ msg: "no users" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  // deleting the user
  deleteTheUser: async (req, res, next) => {
    try {
      let id = req.params;
      id = mongoose.Types.ObjectId(id);
      console.log(id);
      const user = await User.deleteOne({ _id: id });
      if (user.deletedCount === 1) {
        res.json({ msg: "user deleted", status: true });
      }
      res.json({ msg: "user not deleted", status: false });
      console.log(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  //   login user
  loginUser: async (req, res, next) => {
    try {
      let { email, password } = req.body;
      const user = await User.findOne({ email });
      console.log(user);

      if (!user) throw createError.NotFound("user not registered");

      // cheking password
      const isMatch = await passwordCheck(password, user.password);

      if (!isMatch)
        throw createError.Unauthorized("username/password not valid");

      console.log(isMatch);

      const accessToken = await AccessToken(user);

      res.status(200).json({ user, loggedIn: true, token: accessToken });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  // add pdf into db
  addingPdf: async (req, res, next) => {
    try {
      console.log(req.payload);
      const { id, userNme } = req.payload;
      const { url, fileName } = req.body;
      console.log(req.body);
      var userId = mongoose.Types.ObjectId(id);
      console.log(userId);

      const file = new Files({ name: userNme, url, userId, fileName });
      const saveFile = await file.save();
      res.status(200).json({ status: true, data: saveFile });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  // listing fils
  getfiles: async (req, res, next) => {
    try {
      const { id, userNme } = req.payload;
      var userId = mongoose.Types.ObjectId(id);
      const files = await Files.find({ userId });
      console.log(files.length > 0);
      if (files.length > 0) res.status(200).json({ status: true, files });
      else res.status(200).json({ status: false, mesg: "no files " });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
