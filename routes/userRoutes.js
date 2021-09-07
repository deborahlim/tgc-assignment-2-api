const express = require("express");

const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = express.Router();

router.post("/joinUs", authController.joinUs);
router.post("/login", authController.login);

router.patch("/profile/:id", userController.createProfile);
router.get("/profile/:id", userController.getProfile);
router.put("/profile/:id", userController.updateProfile);
router.delete("/profile/:id", userController.deleteProfile);

router.get("/", userController.browseAllUsers);
router.get("/:id", userController.loadMatches);
router.get("/reviews/:id", userController.writeReview);

module.exports = router;
