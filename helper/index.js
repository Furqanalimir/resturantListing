"use strict";

//npm pacage
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

//local package
import config from "../config/index.js";

/**
 * encrypts password so it's safe to save it
 * @param {string} password
 * @returns error or encrypted password
 */
async function encryptPassword(password) {
  return await bcrypt.hash(password, config.BCRYPT_SALT);
}

/**
 * This function compares password and hash
 * @param {string} password
 * @param {string} hash
 * @returns true or false
 */
async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

/**
 * This functin creates token with signed data id and role
 * @param {string} id
 * @param {string} role
 * @returns token or error
 */
function createToken(id, role) {
  return jwt.sign(
    {
      id,
      role,
    },
    config.JWT_PRIVATE_KEY,
    { expiresIn: "30d" }
  );
}

function verifyToken(token) {
  return jwt.verify(token, config.JWT_PRIVATE_KEY);
}

function decodeToken(token) {
  return jwt.decode(token);
}

function generateId() {
  return uuidv4();
}
export default {
  encryptPassword,
  comparePassword,
  createToken,
  verifyToken,
  decodeToken,
  generateId,
};
