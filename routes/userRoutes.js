const express = require("express");

const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = express.Router();
router.get("/", authController.roots);
router.post("/joinUs", authController.joinUs);
router.post("/login", authController.login);
router.patch("/profile/:id", userController.createProfile);

// app.get("/user/:id", async (req, res, next) => {
//   let user_id = req.params.id;
//   let db = MongoUtil.getDB();
//   let criteria = {};
//   console.log(user_id);
//   let result = await db
//     .collection("users")
//     .find({
//       _id: ObjectId(user_id),
//     })
//     .toArray();
//   console.log(result);
//   let matches = await db
//     .collection("users")
//     .find({
//       country: result[0].country,
//     })
//     .toArray();

//   res.status(200);
//   res.send(matches);
// });

module.exports = router;
