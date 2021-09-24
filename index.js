const express = require("express");
const cors = require("cors");
require("dotenv").config();

const MongoUtil = require("./MongoUtil");
const { Db } = require("mongodb");
const mongoUri = process.env.MONGO_URI;
let db = MongoUtil.getDB();
let app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "https://main--nostalgic-cray-7a084a.netlify.app/",
  },
});
// !! ENABLE JSON
app.use(express.json());
// !! ENABLE CROSS ORIGIN RESOURCES SHARING
app.use(cors());
async function main() {
  await MongoUtil.connect(mongoUri, "special-connections");
  const userRouter = require("./routes/userRoutes");
  const enquiryRouter = require("./routes/enquiryRoutes");
  const chatsRouter = require("./routes/chatsRoutes");
  app.use("/special-connections/users", userRouter);
  app.use("/special-connections/enquiry", enquiryRouter);
  app.use("/special-connections/chats", chatsRouter);

  // Check API is working
  app.get("/", (req, res) => {
    res.status(200).send("tgc-assignment-2-api");
  });

  io.on("connection", (socket) => {
    console.log(`a user connected ${socket.id}`);

    // https://dev.to/chewypao/private-chat-using-socket-io-39o5
    // On receiving join event
    socket.on("join", async (room) => {
      let split = room.split("--with--"); // ['username2', 'username1']
      let unique = [...new Set(split)].sort((a, b) => (a < b ? -1 : 1)); // ['username1', 'username2']
      let updatedRoomName = `${unique[0]}--with--${unique[1]}`; // 'username1--with--username2'

      Array.from(socket.rooms)
        .filter((it) => it !== socket.id)
        .forEach((id) => {
          socket.leave(id);
          socket.removeAllListeners(`emitMessage`);
        });

      socket.join(updatedRoomName);
      socket.emit("joined", updatedRoomName);

      // On receving private message event
      socket.on("private message", ({ input, to, from }) => {
        console.log(input, to, from);
        Array.from(socket.rooms)
          .filter((it) => it !== socket.id)
          .forEach((id) => {
            socket.to(id).emit("receive message", {
              input,
              to,
              from,
            });
          });
      });

      // notify users upon disconnection
      socket.on("disconnect", () => {
        socket.removeAllListeners();
        console.log("user disconnected, ", socket.id);
      });
    });
  });
  // https://blog.idrisolubisi.com/global-error-handling-in-node-js
  // This should be the last route else any after it wont work
  app.use("*", (req, res) => {
    res.status(404).json({
      success: "false",
      message: "Page not found",
      error: {
        statusCode: 404,
        message: "You reached a route that is not defined on this server",
      },
    });
  });

  // START SERVER
  httpServer.listen(process.env.PORT, () => {
    console.log("Server has started");
  });
}

main();
