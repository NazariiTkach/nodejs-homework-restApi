const express = require("express");
const router = express.Router();

const controller = require("../../controllers/contacts");
const { validateBody, validateId } = require("../../middlewares");
const { contactSchema, favoriteSchema } = require("../../schemas");

router.get("/", controller.getAllContacts);

router.get("/:contactId", validateId, controller.getContactById);

router.post("/", validateBody(contactSchema), controller.addContact);

router.put(
  "/:contactId",
  validateId,
  validateBody(contactSchema),
  controller.updateById
);

router.patch(
  "/:contactId/favorite",
  validateId,
  validateBody(favoriteSchema),
  controller.updateStatus
);

router.delete("/:contactId", validateId, controller.removeById);

module.exports = router;