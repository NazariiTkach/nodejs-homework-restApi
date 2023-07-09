const express = require("express");
const router = express.Router();

const controller = require("../../controllers/contacts");
const { validateBody, validateId, auth } = require("../../middlewares");
const { contactSchema, favoriteSchema } = require("../../schemas");

router.get("/",auth, controller.getAllContacts);

router.get("/:contactId",auth, validateId, controller.getContactById);

router.post("/",auth, validateBody(contactSchema), controller.addContact);

router.put(
  "/:contactId",
  auth,
  validateId,
  validateBody(contactSchema),
  controller.updateById
);

router.patch(
  "/:contactId/favorite",
  auth,
  validateId,
  validateBody(favoriteSchema),
  controller.updateStatus
);

router.delete("/:contactId", validateId, controller.removeById);

module.exports = router;