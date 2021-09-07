const express = require("express");
const cors = require("cors");
require("dotenv").config();

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
  const userRouter = require("./routes/userRoutes");
  const enquiryRouter = require("./routes/enquiryRoutes");
  app.use("/special-connections/users", userRouter);
  app.use("/special-connections/enquiry", enquiryRouter);
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
  app.listen(3000, () => {
    console.log("Server has started");
  });
}

main();
