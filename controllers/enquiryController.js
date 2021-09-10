const MongoUtil = require("../MongoUtil");
let db = MongoUtil.getDB();

exports.sendEnquiry = async (req, res, next) => {
  try {
    let { name, email, enquiry } = req.body;
    let db = MongoUtil.getDB();

    let result = await db.collection("enquiries").insertOne({
      name: name,
      email: email,
      enquiry: enquiry,
    });

    res.status(201).send({
      status: "success",
      id: result.insertedId,
    });
  } catch (e) {
    res.status(500);
    res.send({
      error: "Internal server error. Please contact administrator",
    });
    console.log(e);
  }
};

exports.loadEnquiries = async (req, res, next) => {
  try {
    let db = MongoUtil.getDB();
    let enquires = await db.collection("enquiries").find().toArray();
    res.status(200).send(enquires);
  } catch (e) {
    res.status(500);
    res.send({
      error: "Internal server error. Please contact administrator",
    });
    console.log(e);
  }
};
