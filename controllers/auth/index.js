const registration = require("./registration");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logOut = require("./logOut");

const { controllerWrapper } = require("../../helpers");

module.exports = {
  registration: controllerWrapper(registration),
  login: controllerWrapper(login),
  getCurrent: controllerWrapper(getCurrent),
  logOut: controllerWrapper(logOut),
};