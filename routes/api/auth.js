const express = require("express");
const router = express.Router();

const controller = require("../../controllers/auth");
const { validateBody, auth } = require("../../middlewares");
const { loginSchema, registerSchema } = require("../../schemas");

router.post("/register", validateBody(registerSchema), controller.registration);
router.post("/login", validateBody(loginSchema), controller.login);
router.get("/current", auth, controller.getCurrent);
router.post("/logout", auth, controller.logOut);

module.exports = router;