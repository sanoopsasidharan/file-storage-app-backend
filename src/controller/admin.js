const User = require("../model/userModel");
var ObjectId = require("mongoose").ObjectId;
var mongoose = require("mongoose");
const { AccessToken, adminAccessToken } = require("../middleware/jwt");
const Files = require("../model/fileModel");
const createError = require("http-errors");
const Admin = require("../model/adminModel");

module.exports = {
  // lising all users
  usersListing: async (req, res, next) => {
    try {
      const users = await User.find();
      console.log(users);
      if (users.length > 0)
        res.status(200).json({ users, status: true, meg: "user list" });
      else res.status(404).json({ msg: "no users", status: false });
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

      console.log(user);
      if (!user) throw createError.NotFound("user not registered");

      // cheking password
      const isMatch = await passwordCheck(password, user.password);

      if (!isMatch)
        throw createError.Unauthorized("useremail/password not valid");

      console.log(isMatch);

      const accessToken = await AccessToken(user);

      res.json({ user, loggedIn: true, token: accessToken });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  //   admin login
  adminLogin: async (req, res, next) => {
    try {
      let { email, password } = req.body;
      const admin = await Admin.findOne({ email });
      // console.log(admin);
      if (!admin) throw createError.NotFound("email/password not valid");

      if (password === admin.password) {
        const accessToken = await adminAccessToken(admin);
        res
          .cookie("adminTocken", accessToken, { httpOnly: true })
          .json({ admin, loggedIn: true, token: accessToken });
      }
      createError.NotFound("email/password not valid");
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  // listing fils
  listingfiles: async (req, res, next) => {
    try {
      var userId = mongoose.Types.ObjectId(req.query.userId);
      const files = await Files.find({ userId });
      if (files.length > 0) res.status(200).json({ status: true, files });
      else res.status(200).json({ status: false, mesg: "no files " });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
