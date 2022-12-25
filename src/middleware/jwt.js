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

  RefreshToken: (userId) => {
    return new Promise((resolve, rejcet) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        issuer: "vehHope.sanoopsasidharan.tech",
        audience: userId,
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          rejcet(createError.InternalServerError());
        } else {
          resolve(token);
        }
      });
    });
  },
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) return reject(createError.Unauthorized());
          const userId = payload.aud;
          resolve(userId);
        }
      );
    });
  },
  verifyAccessToken: (req, res, next) => {
    console.log("calling is loggedin ");
    console.log(req.cookies.userTocken, "req.cookies.userTocken ....");
    console.log(req.cookies, "req.cookies. MMMMMMMM ....");
    if (!req.cookies.userTocken) return res.json({ user: false });
    const userToken = req.cookies.userTocken;
    console.log(userToken, "userToken");
    jwt.verify(userToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        return res.json({ user: false });
      } else {
        req.payload = payload;
        next();
      }
    });
  },
  // admin access Token

  // shop access token
  shopAccessToken: (shop) => {
    const id = shop._id + "";
    const shopNme = shop.shopName;
    return new Promise((resolve, rejcet) => {
      const payload = {
        shopNme,
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
  verifyShopToken: async (req, res, next) => {
    if (!req.cookies.shopTocken) return res.json({ shop: false });
    const { shopTocken } = req.cookies;
    jwt.verify(shopTocken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        return res.json({ shop: false });
      } else {
        req.payload = payload;
        next();
      }
    });
  },
};
