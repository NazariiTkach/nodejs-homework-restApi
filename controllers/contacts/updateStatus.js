const Contact = require("../../models");
const { RequestError } = require("../../helpers");

const updateStatus = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, `Contact with id = ${contactId} not found`);
  }
  res.status(200).json(result);
};

module.exports = updateStatus;