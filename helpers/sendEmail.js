const nodemailer = require("nodemailer");
require("dotenv").config();

const { UKRNET_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 2525,
  secure: true,
  auth: {
    user: "nazariitkach@ukr.net",
    pass: UKRNET_PASSWORD,
  },
};

const sendEmail = async (data) => {
  const email = { ...data, from: "nazariitkach@ukr.net" };
  const transport = nodemailer.createTransport(nodemailerConfig);
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;