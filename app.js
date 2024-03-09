// doesn't allow
"use strict";

// npm packages
import express from "express";
const app = express();

// local packages
import db from "./config/db.js";
import tables from './config/tables.js'
import config from "./config/index.js";
import userRoutes from "./routers/users.js";
import resturantRoutes from "./routers/resturant.js";
import menuRoutes from './routers/menu.js';
import reviewRoutes from './routers/review.js';

// express middleware
app.use(express.json());

// test Server default route
app.get("/", (req, res) => {
  res.status(200).send("ok");
});

// register routes
app.use("/users", userRoutes);
app.use("/resturant", resturantRoutes);
app.use("/menu", menuRoutes);
app.use("/review", reviewRoutes);

// handle/cath any unhandled exception/rejection
process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });

app.listen(config.PORT, async () => {
  await db.connectDB();
  await tables.createTables();
  console.log(`Server running on port: ${config.PORT} in ${config.ENV} mode!`);
});
