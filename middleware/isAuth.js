const jwt = require("../utils/jwt");

const isAuth = (req, res, next) => {
  try {
    const cookie = req.cookies.token
    if (!cookie) {
      res.redirect("/auth/login")
      return
    }
    const user = jwt.verify(cookie, process.env.SECRET_API_KEY);
    if (!user) {
       res.redirect("/auth/login")
       return
    }
    req.user = user
    next()
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
};

module.exports = isAuth;
