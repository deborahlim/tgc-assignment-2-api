const MongoUtil = require("../MongoUtil");
let db = MongoUtil.getDB();
const ObjectId = require("mongodb").ObjectId;

exports.createProfile = async (req, res, next) => {
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
    let photoURL = req.body.photoURL;
    let db = MongoUtil.getDB();
    // tell mongo to insert the document
    let result = await db.collection("users").updateOne(
      {
        _id: ObjectId(req.params.id),
      },
      {
        $set: {
          profile: {
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
            photoURL: photoURL,
          },
        },
      }
    );
    res.status(200);
    res.send(result);
  } catch (e) {
    res.status(500);
    res.send({
      error: "Internal server error. Please contact administrator",
    });
    console.log(e);
  }
};

exports.loadMatches = async function (req, res, next) {
  try {
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
    // Match on disability preference, disability, country, country preference, min and max age, interests
    // Exclude the current user
    let matches = await db
      .collection("users")
      .find({
        "profile.disabilityPreference": result[0].profile.disability,
      })
      .toArray();
    res.status(200);
    res.send(matches);
  } catch (e) {
    res.status(500);
    res.send({
      error: "Internal server error. Please contact administrator",
    });
    console.log(e);
  }
};

exports.browseAllUsers = async (req, res, next) => {
  try {
    let db = MongoUtil.getDB();
    let result = await db.collection("users").find({}).toArray();

    res.status(200);
    res.send(result);
  } catch (e) {
    res.status(500);
    res.send({
      error: "Internal server error. Please contact administrator",
    });
    console.log(e);
  }
};
