const express = require("express");
const cors = require("cors");
require("dotenv").config();

const MongoUtil = require("./MongoUtil");
const { Db } = require("mongodb");
const mongoUri = process.env.MONGO_URI;

let app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:8080",
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
  app.use("/special-connections/users", userRouter);
  app.use("/special-connections/enquiry", enquiryRouter);

  // io.use((socket, next) => {
  //   const id = socket.handshake.auth.id;
  //   console.log(id);
  //   if (!id) {
  //     return next(new Error("invalid id"));
  //   }
  //   socket.id = id;
  //   next();
  // });

  io.on("connection", (socket) => {
    console.log(`a user connected ${socket.id}`);
    // socket.join("gem");
    // console.log(socket.rooms);

    // https://dev.to/chewypao/private-chat-using-socket-io-39o5
    socket.on("join", (room) => {
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
      console.log(socket.rooms);
      socket.on("private message", ({ input, to, from }) => {
        console.log(input, to, from);
        Array.from(socket.rooms)
          .filter((it) => it !== socket.id)
          .forEach((id) => {
            socket.to(id).emit("receive message", {
              input,
              to,
              from,
              fromSelf: false,
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
  // app.use("*", (req, res) => {
  //   res.status(404).json({
  //     success: "false",
  //     message: "Page not found",
  //     error: {
  //       statusCode: 404,
  //       message: "You reached a route that is not defined on this server",
  //     },
  //   });
  // });

  // START SERVER
  httpServer.listen(3000, () => {
    console.log("Server has started");
  });
}

main();
