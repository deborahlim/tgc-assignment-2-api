const express = require("express");

const enquiryController = require("./../controllers/chatsController");

const router = express.Router();

router.get("/", enquiryController.loadChats);
router.post("/", enquiryController.createChats);
router.patch("/", enquiryController.updateChats);
module.exports = router;
