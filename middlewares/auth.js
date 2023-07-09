const jwt = require("jsonwebtoken");

const { User } = require("../models");
const { RequestError } = require("../helpers");

const { JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  console.log(req.headers.authorization);
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(RequestError(401));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(RequestError(401));
    }
    req.user = user;
    next();
  } catch {
    next(RequestError(401));
  }
};

module.exports = auth;