const jwt = require("jsonwebtoken");
const MongoUtil = require("./../MongoUtil");

const ObjectId = require("mongodb").ObjectId;
const { errorResponse } = require("./../utils/errorMiddleware");

const signToken = (id) => {
  return jwt.sign({ _id: ObjectId(id) }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
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
    let checkValidEmail = await db.collection("users").findOne({
      email: email,
    });
    let checkValidUsername = await db.collection("users").findOne({
      username: username,
    });
    if (checkValidEmail !== null && checkValidUsername !== null) {
      return errorResponse(
        res,
        "The email and username provided already exists",
        401
      );
    } else if (checkValidEmail !== null) {
      return errorResponse(res, "The email provided already exists", 406);
    } else if (checkValidUsername !== null) {
      return errorResponse(res, "The username provided already exists", 409);
    }

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
    return errorResponse(res);
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
    return errorResponse(res);
  }
};

// UPDATE PASSWORD
exports.updatePassword = async (req, res) => {
  try {
    let db = MongoUtil.getDB();
    let { password, confirmPassword, currentPassword } = req.body;
    let user = await db.collection("users").findOne({
      password: currentPassword,
    });
    if (!user) {
      return errorResponse(res, "Your current password is wrong", 401);
    }
    let response = await db.collection("users").updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $set: {
          password: password,
          confirmPassword: confirmPassword,
        },
      }
    );
    res.status(201).send(response);
  } catch (err) {
    return errorResponse(res);
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    let db = MongoUtil.getDB();

    db.collection("users").deleteOne({
      _id: ObjectId(req.params.id),
    });

    res.status(200);
    res.send({ message: "OK" });
  } catch (err) {
    return errorResponse(res);
  }
};
