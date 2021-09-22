const express = require("express");

const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = express.Router();

router.post("/joinUs", authController.joinUs);
router.post("/login", authController.login);
router.patch("/update-password/:id", authController.updatePassword);
router.delete("/:id", authController.deleteUser);

router.patch("/profile/:id", userController.createProfile);
router.get("/profile/:id", userController.getProfile);
router.delete("/profile/:id", userController.deleteProfile);

router.get("/", userController.browseAllUsers);
router.get("/reviews", userController.loadReviews);
router.get("/:id", userController.loadMatches);

router.patch("/review/:id", userController.writeReview);

module.exports = router;
