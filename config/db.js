"use strict";

import pg from "pg";
import config from './index.js';

let client;
async function connectDB() {
   client = new pg.Client({
    user: config.DATABASE_USER,
    host: config.DATABASE_HOST,
    database: config.DATABASE_NAME,
    password: config.DATABASE_PASSWORD,
    port: config.DATABASE_PORT,
  });

  try {
    await client.connect();
    console.log("Database connected!")
  } catch (err) {
    console.log("ERR[config/db.js], func-connectDB", err);
    process.exit(1); // terminate connection
  }
}
function getDB() {
  return client;
}
export default {
  connectDB,
  getDB,
};
