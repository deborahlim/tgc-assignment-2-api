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
    socket.join(socket.id);
    socket.on("private message", ({ input, to, from }) => {
      console.log(input, to, from);
      socket.broadcast.emit("receive message", {
        input,
        to,
        from,
        fromSelf: false,
      });
    });
    // notify users upon disconnection
    socket.on("disconnect", () => {
      socket.to(socket.id).emit("user disconnected", socket.id);
      console.log("a user disconnected");
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
