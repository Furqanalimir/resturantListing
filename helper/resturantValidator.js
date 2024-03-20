"use strict";

import joi from "joi";

/**
 * This function validates resturant infrmation upon registering
 * @param {Object} resturantInfo
 * @throws {error} if validation fails
 * @returns null
 */
function validateResurantDetails(resturantInfo = {}) {
  const param = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    category: joi.string().required(),
    address: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    country: joi.string().required(),
    zipCode: joi.string().required(),
    phone: joi.number().required(),
    email: joi.string().email().required(),
    website: joi.string(),
    socialMedia: joi.object(),
    tags: joi.array(),
    orderContact: joi.number().required(),
    bookingContact: joi.number().required(),
    openTime: joi
      .string()
      .required()
      .error(() => new Error("openTime should be string (e.g, 9am - 11pm")),
    daysOfOperation: joi
      .string()
      .required()
      .error(
        () => new Error("daysOfOperation should be string (e.g, Mon to Fri")
      )
  });

  const valid = param.validate(resturantInfo, {
    allowUnknown: false,
    default: false,
  });

  if (valid.error) {
    console.log("ERR[helper/resturantValidator.js], func-validateResurantDetails", valid.error.details);
    throw new Error(valid.error);
  }
  return;
}

/**
 * This function validates resturant information fields befor updating data
 * @param {Object} resturantInfo
 * @throws {error} if validation fails
 * @returns null
 */
function validateResturantUpdateDetails(resturantInfo = {}) {
  const param = joi.object({
    name: joi.string(),
    description: joi.string(),
    category: joi.string(),
    address: joi.string(),
    city: joi.string(),
    state: joi.string(),
    country: joi.string(),
    zipCode: joi.string(),
    phone: joi.number(),
    email: joi.string().email(),
    website: joi.string(),
    socialMedia: joi.array(),
    tags: joi.array(),
    openTime: joi
      .string()

      .error(() => new Error("openTime should be string (e.g, 9am - 11pm")),
    daysOfOperation: joi
      .string()

      .error(
        () => new Error("daysOfOperation should be string (e.g, Mon to Fri")
      ),
    resturantPics: joi.string(),
  });

  const valid = param.validate(resturantInfo, {
    allowUnknown: false,
    default: false,
  });

  if (valid.error) {
    console.log("ERR[helper/resturantValidator.js], func-validateResurantDetails", valid.error.details);
    throw new Error(valid.error);
  }
  return;
}

function validateParamsId(id) {
  const param = joi.object({
    id: joi.string().required(),
  });

  const valid = param.validate({ id }, {
    allowUnknown: false,
    default: false,
  });

  if (valid.error) {
    console.log("ERR[helper/validator.js], func-validateParamsId", valid.error.details);
    throw new Error(valid.error);
  }
  return;
}

export default {
  validateResurantDetails,
  validateResturantUpdateDetails,
  validateParamsId,
};
