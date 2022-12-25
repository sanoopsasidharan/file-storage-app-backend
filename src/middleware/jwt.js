const jwt = require("jsonwebtoken");
const createError = require("http-errors");
// const { refreshToken } = require("../controller/userController");

module.exports = {
  AccessToken: (user) => {
    const id = user._id + "";
    const userNme = user.name;
    return new Promise((resolve, rejcet) => {
      const payload = {
        userNme,
        id,
      };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        issuer: "vehHope.sanoopsasidharan.tech",
        audience: id,
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          rejcet(createError.InternalServerError());
        } else {
          resolve(token);
        }
      });
    });
  },

  verifyAccessToken: (req, res, next) => {
    console.log("calling is loggedin ");
    // console.log(req.cookies.userTocken, "req.cookies.userTocken ....");
    // console.log(req.cookies, "req.cookies. MMMMMMMM ....");
    if (!req.cookies.userTocken) return res.json({ user: false });
    const userToken = req.cookies.userTocken;
    // console.log(userToken, "userToken");
    jwt.verify(userToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        return res.json({ user: false });
      } else {
        req.payload = payload;
        next();
      }
    });
  },

  // admin access token
  adminAccessToken: (admin) => {
    const id = admin._id + "";
    const adminNme = admin.name;
    return new Promise((resolve, rejcet) => {
      const payload = {
        adminNme,
        id,
      };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        issuer: "sanoopsasidharan.tech",
        audience: id,
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          rejcet(createError.InternalServerError());
        } else {
          resolve(token);
        }
      });
    });
  },
  verifyAdminToken: async (req, res, next) => {
    // console.log(req.cookies.adminTocken, "req.cookies.adminTocken");

    if (!req.cookies.adminTocken) return res.json({ admin: false });
    const { adminTocken } = req.cookies;
    jwt.verify(adminTocken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        return res.json({ admin: false });
      } else {
        req.payload = payload;
        next();
      }
    });
  },
};
