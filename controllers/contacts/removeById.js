const Contact = require("../../models");
const { RequestError } = require("../../helpers");

const removeById = async (req, res) => {
  const contactId = req.params.contactId;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw RequestError(404, `Contact with id = ${contactId} not found`);
  }
  res.json({ message: "contact deleted", contactId });
};

module.exports = removeById;