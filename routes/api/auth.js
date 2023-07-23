const express = require("express");
const router = express.Router();

const controller = require("../../controllers/auth");
const { validateBody, auth, upload } = require("../../middlewares");
const { loginSchema, registerSchema, emailSchema } = require("../../schemas");

router.post("/register", validateBody(registerSchema), controller.registration);

router.get("/verify/:verificationCode", controller.verifyEmail);

router.post("/verify", validateBody(emailSchema), controller.resendVerifyEmail);

router.post("/login", validateBody(loginSchema), controller.login);

router.get("/current", auth, controller.getCurrent);

router.post("/logout", auth, controller.logOut);

router.patch("/avatars", auth, upload.single("avatar"),controller.updateAvatar);


module.exports = router;