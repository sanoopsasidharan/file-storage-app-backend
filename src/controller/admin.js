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
      const users = await User.find().sort({ _id: -1 });
      console.log(users);
      if (users.length > 0)
        res.status(200).json({ users, status: true, meg: "user list" });
      else res.status(404).json({ msg: "no users", status: false });
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
      const files = await Files.find({ userId }).sort({ _id: -1 });
      if (files.length > 0) res.status(200).json({ status: true, files });
      else res.status(200).json({ status: false, mesg: "no files " });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  // admin logout
  LogoutAdmin: async (req, res, next) => {
    try {
      console.log("this is user logged out");
      res
        .cookie("adminTocken", "", {
          httpOnly: true,
          expires: new Date(0),
        })
        .json({ logout: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
