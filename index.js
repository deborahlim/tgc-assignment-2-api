const express = require("express");
const cors = require("cors");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
const MongoUtil = require("./MongoUtil");
const { Db } = require("mongodb");

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

app.get("/special-connections", (req, res, next) => {
  res.status(200).send();
  console.log("Root");
});

app.post("/special-connections/signup", async (req, res, next) => {

  try {
    let name = req.body.name;
    let email = req.body.email;
    let gender = req.body.gender;
    let datetime = new Date(req.body.datetime) || new Date();
    let db = MongoUtil.getDB();
    // tell mongo to insert the document
    let result = await db.collection("users").insertOne({
      name: name,
      email: email,
      gender: gender,
      datetime: datetime,
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

// START SERVER
app.listen(3000, () => {
  console.log("Server has started");
});
