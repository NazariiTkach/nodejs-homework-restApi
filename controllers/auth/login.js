const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/users");
const { RequestError } = require("../../helpers");

const { JWT_SECRET } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!user && !passwordCompare) {
    throw RequestError(401, "Incorrect login or password");
  }
  if (!user.verify) {
    throw next(RequestError(401, "Email not verified"));
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1w" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
  });
};

module.exports = login;