const express = require("express");
const cors = require("cors");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
const MongoUtil = require("./MongoUtil");
const { Db } = require("mongodb");
const jwt = require("jsonwebtoken");
const mongoUri = process.env.MONGO_URI;

let app = express();

// !! ENABLE JSON
app.use(express.json());

// !! ENABLE CROSS ORIGIN RESOURCES SHARING
app.use(cors());

async function main() {
  await MongoUtil.connect(mongoUri, "special-connections");
}

main();

// ROUTES

app.get("/special-connections", (req, res, next) => {
  res.status(200).send();
  console.log("Root");
});

// CREATE A USER
app.post("/special-connections/signup", async (req, res, next) => {
  try {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let confirmPassword = req.body.password;
    let datetime = new Date(req.body.datetime) || new Date();
    let db = MongoUtil.getDB();
    // tell mongo to insert the document
    let result = await db.collection("users").insertOne({
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });
    console.log(result);
    const token = jwt.sign(
      { _id: ObjectId(result._id) },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(201).json({
      token,
      data: {
        user: result,
      },
    });
  } catch (e) {
    res.status(500);
    res.send({
      error: "Internal server error. Please contact administrator",
    });
    console.log(e);
  }
});

app.post("/special-connections/profile", async (req, res, next) => {
  try {
    let dob = req.body.dob;
    let gender = req.body.gender;
    let country = req.body.country;
    let disability = req.body.disability;
    let interestedIn = req.body.interestedIn;
    let genderPreference = req.body.genderPreference;
    let minAge = req.body.minAge;
    let maxAge = req.body.maxAge;
    let countryPreference = req.body.countryPreference;
    let disabilityPreference = req.body.disabilityPreference;
    let aboutMe = req.body.aboutMe;
    let interests = req.body.interests;

    let db = MongoUtil.getDB();
    // tell mongo to insert the document
    let result = await db.collection("users").insertOne({
      dob: dob,
      gender: gender,
      country: country,
      disability: disability,
      interestedIn: interestedIn,
      genderPreference: genderPreference,
      minAge: minAge,
      maxAge: maxAge,
      countryPreference: countryPreference,
      disabilityPreference: disabilityPreference,
      aboutMe: aboutMe,
      interests: interests,
    });
    res.status(200);
    res.send(result);
  } catch (e) {
    res.status(500);
    res.send({
      error: "Internal server error. Please contact administrator",
    });
    console.log(e);
  }
});

app.get("/special-connections/user/:id", async (req, res, next) => {
  let user_id = req.params.id;
  let db = MongoUtil.getDB();
  let criteria = {};
  console.log(user_id);
  let result = await db
    .collection("users")
    .find({
      _id: ObjectId(user_id),
    })
    .toArray();
  console.log(result);
  let matches = await db
    .collection("users")
    .find({
      country: result[0].country,
    })
    .toArray();

  res.status(200);
  res.send(matches);
});
// START SERVER
app.listen(3000, () => {
  console.log("Server has started");
});
