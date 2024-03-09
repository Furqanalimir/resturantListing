"use strict";

//npm packages

//local packages
import userValidator from "../helper/userValidator.js";
import userModels from "../models/users.js";
import helper from "../helper/index.js";

/**
 * This function creates user if it doesn't exists in system
 * @param   {Object}  req
 * @param   {Objec}   res
 * @throws  {error}   if validation fails or user email/phone alrady exists
 * @returns {Object}  with success response or error response
 */
async function addUser(req, res) {
  try {
    const user = req.body;

    userValidator.validateAddUser(user);

    const isUser = await userModels.findUserByEmailOrPhone(user.email, user.phone);
    if (Array.isArray(isUser.rows) && isUser.rows.length == 0) {
      await userModels.saveUser(user);

      return res.status(200).send({
        data: "User created!",
        error: null,
      });
    }

    // return error if user exists
    return res.status(400).send({
      data: "User already exists",
      error: null,
    });
  } catch (err) {
    console.log("ERR[controllers/user.js], func-addUser", err);
    return res.status(200).send({
      data: null,
      error: err.message || err,
    });
  }
}

/**
 * This function create token if user is found and password matches
 * @param   {Object}  req
 * @param   {Objec}   res
 * @throws  {error}   if validation fails or user email/phone doesn't exists/match
 * @returns {Object}  with success response or error response
 */
async function userLogin(req, res) {
  try {
    const user = req.body;
    userValidator.validateUserLogin(user);

    const userExists = await userModels.findUserByEmail(user.email);
    if (Array.isArray(userExists.rows) && userExists.rows.length == 0) {
      return res.status(400).send({
        data: null,
        error: "Invalid credentials",
      });
    }

    const pass = await helper.comparePassword(
      user.password,
      userExists.rows[0].password
    );
    if (!pass) {
      return res.status(400).send({
        data: null,
        error: "Invalid credentials",
      });
    }
    const token = helper.createToken(
      userExists.rows[0].id,
      userExists.rows[0].role
    );
    return res.status(200).send({
      data: {
        tokenType: "Bearer",
        token: token,
      },
      error: null,
    });
  } catch (err) {
    console.log("ERR[controllers/user.js], func-userLogin", err);
    return res.status(200).send({
      data: null,
      error: err.message || err,
    });
  }
}

export default {
  addUser,
  userLogin,
};
