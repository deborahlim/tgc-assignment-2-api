const MongoUtil = require("../MongoUtil");
const { errorResponse } = require("./../utils/errorMiddleware");

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
    return errorResponse(res);
  }
};

exports.loadEnquiries = async (req, res, next) => {
  try {
    let db = MongoUtil.getDB();
    let enquires = await db.collection("enquiries").find().toArray();
    res.status(200).send(enquires);
  } catch (e) {
    return errorResponse(res);
  }
};
