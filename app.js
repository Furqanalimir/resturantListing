// doesn't allow
"use strict";

// npm packages
import express from "express";
const server = express();

// local packages
import db from "./config/db.js";
import tables from './config/tables.js'
import config from "./config/index.js";
import userRoutes from "./routers/users.js";
import resturantRoutes from "./routers/resturant.js";
import menuRoutes from './routers/menu.js';
import reviewRoutes from './routers/review.js';

// express middleware
server.use(express.json());

// test server
server.get("/", (req, res) => {
  res.status(200).send("ok");
});

// register routes
server.use("/users", userRoutes);
server.use("/resturant", resturantRoutes);
server.use("/menu", menuRoutes);
server.use("/review", reviewRoutes);

// handle/cath any unhandled exception/rejection
process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });

server.listen(config.PORT, async () => {
  await db.connectDB();
  await tables.createTables();
  console.log(`Server running on port: ${config.PORT} in ${config.ENV} mode!`);
});
