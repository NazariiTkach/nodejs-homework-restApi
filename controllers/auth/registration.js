const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models");
const { RequestError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const registration = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "Email already exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationCode = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationCode,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}api/auth/verify/${verificationCode}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201);
  res.json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = registration;