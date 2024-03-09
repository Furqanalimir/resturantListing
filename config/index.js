"use strict";

import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 8000, // default port is 8080
  ENV: process.env.ENV || "development",
  // encryption and toekn constants
  BCRYPT_SALT: 10,
  JWT_PRIVATE_KEY: "qawsedrftgyhujik",
  // database constants
  DATABASE_USER: process.env.DATABASE_USER || "ali",
  DATABASE_HOST: process.env.DATABASE_HOST || "localhost",
  DATABASE_NAME: process.env.DATABASE_NAME || "test",
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || "password",
  DATABASE_PORT: process.env.DATABASE_PORT || 5432,
};
