const MongoUtil = require("../MongoUtil");
const { errorResponse } = require("../utils/errorMiddleware");

exports.loadChats = async function (req, res) {
  try {
    let { room } = req.query;
    console.log(room);
    let db = MongoUtil.getDB();

    let result = await db.collection("chats").findOne({
      room: room,
    });
    res.status(200).send(result);
  } catch (e) {
    return errorResponse(res);
  }
};

exports.createChats = async function (req, res) {
  try {
    let { room, messages } = req.body;
    let db = MongoUtil.getDB();
    let response = await db.collection("chats").findOne({ room: room });
    if (!response) {
      let result = await db.collection("chats").insertOne({
        room: room,
        messages: messages,
      });

      res.status(200).send(results);
    }
    return errorResponse(res, "this room already exists", 400);
  } catch (e) {
    return errorResponse(res);
  }
};

exports.updateChats = async function (req, res) {
  try {
    let { room, message } = req.body;
    let db = MongoUtil.getDB();

    let result = await db.collection("chats").findOne({
      room: room,
    });

    if (result.messages.length >= 20) {
      await db
        .collection("chats")
        .updateOne({ room: room }, { $pop: { messages: -1 } });
    }
    let response = await db
      .collection("chats")
      .updateOne({ room: room }, { $push: { messages: message } });

    res.status(200).send(response);
  } catch (e) {
    return errorResponse(res);
  }
};
