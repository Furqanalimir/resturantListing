"use strict";

// local package
import helper from "../helper/index.js";

/**
 * This middleware function authenticates request
 * @param {Array} role
 * @returns error if error occurs other wise calls next function
 */
function authenticate(req, res, next) {
  const tokenString = req.headers["authorization"];
  if (!tokenString) {
    return res.status(401).send({
      error: "invalid cred",
    });
  }

  try {
    const token = tokenString.split(" ")[1];
    helper.verifyToken(token);
    const data = helper.decodeToken(token);
    req.userId = data.id;
    req.role = data.role;
    next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
}

/**
 * This middleware function authenticates request and roles provided
 * @param {Array} role
 * @returns error if error occurs other wise calls next function
 */
function authenticateByRoles(role = []) {
  return function (req, res, next) {
    const tokenString = req.headers["authorization"];
    if (!tokenString) {
      return res.status(401).send({
        error: "invalid cred",
      });
    }

    try {
      const token = tokenString.split(" ")[1];
      helper.verifyToken(token);
      const data = helper.decodeToken(token);

      if (!role.includes(data.role)) {
        return res.status(401).send({
          data: null,
          error: "You don't have necessary permissions for this action",
        });
      }
      req.userId = data.id;
      req.role = data.role;
      next();
    } catch (err) {
      return res.status(401).send({
        data: null,
        error: "Invalid credentials",
      });
    }
  };
}

export default {
  authenticate,
  authenticateByRoles,
};
