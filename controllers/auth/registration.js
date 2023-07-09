const bcrypt = require("bcrypt");

const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const registration = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "Email already exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201);
  res.json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = registration;