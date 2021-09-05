const jwt = require("jsonwebtoken");
const MongoUtil = require("./../MongoUtil");

const ObjectId = require("mongodb").ObjectId;
const { errorResponse } = require("./../utils/errorMiddleware");

const signToken = (id) => {
  return jwt.sign({ _id: ObjectId(id) }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.roots = async (req, res, next) => {
  console.log("Root");
  res.send();
};

// CREATE A USER
exports.joinUs = async (req, res, next) => {
  try {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let confirmPassword = req.body.password;
    let datetime = new Date();
    let db = MongoUtil.getDB();
    // tell mongo to insert the document
    let result = await db.collection("users").insertOne({
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      datetime: datetime,
    });
    const token = signToken(result._id);

    res.status(201).send({
      status: "success",
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
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let db = MongoUtil.getDB();
    //   Check if the email & password exists
    if (!email || !password) {
      return errorResponse(res, "Email and Password cannot be empty", 400);
    }

    // Check if email and password is valid
    const user = await db.collection("users").findOne({
      email,
      password,
    });
    console.log(user);
    if (!user) {
      return errorResponse(res, "Incorrect email or password", 401);
    }

    const token = signToken(user._id);

    res.status(200).send({
      status: "success",
      token,
      user,
    });
  } catch (e) {
    res.status(500);
    res.send({
      error: "Internal server error. Please contact administrator",
    });
    console.log(e);
  }
};
