const MongoUtil = require("../MongoUtil");
let db = MongoUtil.getDB();
const ObjectId = require("mongodb").ObjectId;

exports.createProfile = async (req, res, next) => {
  try {
    let dob = new Date(req.body.dob);
    let month_diff = Date.now() - dob.getTime();
    let age_dt = new Date(month_diff);
    let year = age_dt.getUTCFullYear();
    let age = Math.abs(year - 1970);
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
    let photoURL = req.body.photoURL || "";
    let db = MongoUtil.getDB();
    // tell mongo to insert the document
    let result = await db.collection("users").updateOne(
      {
        _id: ObjectId(req.params.id),
      },
      {
        $set: {
          profile: {
            dob: req.body.dob,
            age: age,
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

    let result = await db.collection("users").findOne({
      _id: ObjectId(user_id),
    });

    if (!result.profile) {
      return errorResponse(res, "Create a profile to see your matches", 401);
    }
    const resultProfile = result.profile;
    let criteria = {
      _id: { $not: { $eq: ObjectId(user_id) } },
      "profile.age": { $gte: resultProfile.minAge },
      "profile.age": { $lt: resultProfile.maxAge },
      "profile.gender": { $in: resultProfile.genderPreference },
    };

    let matches = await db.collection("users").find(criteria).toArray();
    res.status(200).send(matches);
  } catch (e) {
    res.status(500);
    res.send({
      error: e.message || "Internal server error. Please contact administrator",
    });
    console.log(e);
  }
};

exports.browseAllUsers = async (req, res, next) => {
  try {
    let db = MongoUtil.getDB();
    let user_id = req.body["_id"];
    console.log(user_id);
    // const query = { _id: { $not: { $eq: ObjectId(user_id) } } };
    const query = { _id: { $ne: ObjectId(user_id) } };
    let result = await db.collection("users").find(query).toArray();
    const filteredResults = result.filter((user) => user.profile !== undefined);
    res.status(200);
    res.send(filteredResults);
  } catch (e) {
    res.status(500);
    res.send({
      error: "Internal server error. Please contact administrator",
    });
    console.log(e);
  }
};

exports.writeReview = async (req, res, next) => {
  try {
    let db = MongoUtil.getDB();
    let review = req.body.review;
    let result = await db.collection("users").updateOne(
      {
        _id: ObjectId(req.params.id),
      },
      {
        $set: {
          review: review,
        },
      }
    );

    res.status(201);
    res.send(result);
  } catch (e) {
    res.status(500);
    res.send({
      error: "Internal server error. Please contact administrator",
    });
    console.log(e);
  }
};

exports.loadReviews = async function (req, res) {
  try {
    let db = MongoUtil.getDB();
    let reviews = await db
      .collection("users")
      .find({
        review: { $exists: true },
      })
      .toArray();
    res.status(200).send(reviews);
  } catch (e) {
    res.status(500);
    res.send({
      error: "Internal server error. Please contact administrator",
    });
  }
};

exports.getProfile = async function (req, res) {
  try {
    let db = MongoUtil.getDB();
    let result = await db
      .collection("users")
      .find({ _id: ObjectId(req.params.id) })
      .toArray();
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

exports.updateProfile = async function (req, res) {
  try {
    let db = MongoUtil.getDB();
    let dob = new Date(req.body.dob);
    let month_diff = Date.now() - dob.getTime();
    let age_dt = new Date(month_diff);
    let year = age_dt.getUTCFullYear();
    let age = Math.abs(year - 1970);
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
    let photoURL = req.body.photoURL || "";
    let result = await db.collection("users").updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $set: {
          profile: {
            dob: req.body.dob,
            age: age,
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

exports.deleteProfile = async function (req, res) {
  try {
    let results = await db.collection("users").updateOne(
      {
        _id: ObjectId(req.params.id),
      },
      { $unset: { profile: "" } }
    );
    console.log(results);
    res.status(200);
    res.send({ message: "OK" });
  } catch (e) {
    res.status(500);
    res.send({
      error: "Internal server error. Please contact administrator",
    });
    console.log(e);
  }
};
