const MongoUtil = require("../MongoUtil");

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
    res.status(500);
    res.send({
      error: "Internal server error. Please contact administrator",
    });
    console.log(e);
  }
};

exports.createChats = async function (req, res) {
  try {
    let { room, messages } = req.body;
    let db = MongoUtil.getDB();

    let result = await db.collection("chats").insertOne({
      room: room,
      messages: messages,
    });

    res.status(200).send(result);
  } catch (e) {
    res.status(500);
    res.send({
      error: "Internal server error. Please contact administrator",
    });
    console.log(e);
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
    res.status(500);
    res.send({
      error: "Internal server error. Please contact administrator",
    });
    console.log(e);
  }
};
