const express = require("express");

const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = express.Router();
router.get("/", authController.roots);
router.post("/joinUs", authController.joinUs);
router.post("/login", authController.login);
router.patch("/profile/:id", userController.createProfile);
router.get("/:id", userController.loadMatches);

module.exports = router;
