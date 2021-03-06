const express = require("express");

const enquiryController = require("./../controllers/enquiryController");

const router = express.Router();

router.post("/", enquiryController.sendEnquiry);
router.get("/load", enquiryController.loadEnquiries);
module.exports = router;
