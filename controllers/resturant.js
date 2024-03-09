"use strict";

//npm packages

//local packages
import resturantValidator from "../helper/resturantValidator.js";
import models from "../models/resturants.js";
// import dataHelper from "../helper/dataHelper.js";


/**
 * This function adds resturant
 * @param   {Object}  req
 * @param   {object}  res
 * @throws  {Error}   if validation fails
 * @returns {Object}  with success response or error response
 */
async function addResturant(req, res) {
  try {
    const resturant = req.body;

    resturantValidator.validateResurantDetails(resturant);

    resturant.creatorId = req.userId;
    resturant.resturantPics = req?.file?.path || "";
    const newResturant = await models.saveResturant(resturant);
    return res.status(200).send({
      data: newResturant,
      error: null,
    });
  } catch (err) {
    console.log("ERR[controllers/resturant.js], func-addResturant", err);
    return res.status(500).send({
      data: null,
      error: err.message || err,
    });
  }
}

/**
 * This function update resturant for owner
 * @param   {Object}  req
 * @param   {Object}  res
 * @throws  {Error}   if validation fails or there is error in updaing resturant list
 * @returns {Object}  with success response or error response
 */
async function updateResturant(req, res) {
  try {
    const resturantId = req.params.id;
    const resturantDetails = req.body;

    resturantValidator.validateResturantUpdateDetails(resturantDetails);
    const newResturant = await models.updateResturantById(
      resturantId,
      resturantDetails
    );

    if (newResturant == null) {
      return res.status(400).send({
        data: "Could not find resturant, please make sure resturant is exists",
        error: null,
      });
    }

    return res.status(200).send({
      data: newResturant.rowCount,
      error: null,
    });
  } catch (err) {
    console.log("ERR[controllers/resturant.js], func-updateResturant", err);
    return res.status(500).send({
      data: null,
      error: err.message || err,
    });
  }
}

async function fetchAllResturants(req, res) {
  try {
    const resturants = await models.findAllResturants();
    if (Array.isArray(resturants.rows) && resturants.rows.length == 0) {
      return res.status(404).send({
        data: "List empty",
        error: null,
      });
    }

    return res.status(200).send({
      data: resturants.rows,
      error: null,
    });

  } catch (err) {
    console.log("ERR[controllers/resturant.js], func-fetchAllResturants", err);
    return res.status(500).send({
      data: null,
      error: err.message || err,
    });
  }
}

export default {
  addResturant,
  updateResturant,
  fetchAllResturants,
};
