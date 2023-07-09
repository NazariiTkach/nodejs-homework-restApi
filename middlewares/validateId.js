const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../helpers");

const validateId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(RequestError(400, `${contactId} is not valid id`));
  }
  next();
};

module.exports = validateId;