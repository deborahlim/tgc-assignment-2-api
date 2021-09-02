const express = require("express");

const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/joinUs", authController.joinUs);
router.post("/login", authController.login);

// app.post("/profile", async (req, res, next) => {
//   try {
//     let dob = req.body.dob;
//     let gender = req.body.gender;
//     let country = req.body.country;
//     let disability = req.body.disability;
//     let interestedIn = req.body.interestedIn;
//     let genderPreference = req.body.genderPreference;
//     let minAge = req.body.minAge;
//     let maxAge = req.body.maxAge;
//     let countryPreference = req.body.countryPreference;
//     let disabilityPreference = req.body.disabilityPreference;
//     let aboutMe = req.body.aboutMe;
//     let interests = req.body.interests;

//     let db = MongoUtil.getDB();
//     // tell mongo to insert the document
//     let result = await db.collection("users").insertOne({
//       dob: dob,
//       gender: gender,
//       country: country,
//       disability: disability,
//       interestedIn: interestedIn,
//       genderPreference: genderPreference,
//       minAge: minAge,
//       maxAge: maxAge,
//       countryPreference: countryPreference,
//       disabilityPreference: disabilityPreference,
//       aboutMe: aboutMe,
//       interests: interests,
//     });
//     res.status(200);
//     res.send(result);
//   } catch (e) {
//     res.status(500);
//     res.send({
//       error: "Internal server error. Please contact administrator",
//     });
//     console.log(e);
//   }
// });

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
