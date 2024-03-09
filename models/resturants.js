"use strict";

//local package
import helper from "../helper/index.js";
import db from "../config/db.js";
import queryBuilderHelper from '../helper/dbQueryHelper.js'

/**
 * This function adds resturant to resturant
 * @param {Object} resturant
 * @returns database response or error
 */
async function saveResturant(resturant) {
  let socialMedia = '{';
  let tags = '';

  if (resturant.socialMedia) {
    socialMedia += Object.keys(resturant.socialMedia).map((key) => `"${key}": "${resturant.socialMedia[key]}"`)
    socialMedia += '}'
  }

  if (resturant.tags) {
    tags = "{" + resturant.tags.map((tag) => `${tag}`).join(" ") + "}"
  }
  resturant.id = helper.generateId();

  const insertQuery = `INSERT INTO resturants (id, creatorId, name, description, category, address, city, state, country, zipCode,
    phone, email, website, socialMedia, tags, openTime, daysOfOperation, resturantPic, orderContact, bookingContact) VALUES
        ('${resturant.id}', '${resturant.creatorId}', '${resturant.name}', '${resturant.description}', '${resturant.category}',
        '${resturant.address}', '${resturant.city}', '${resturant.state}', '${resturant.country}', '${resturant.zipCode}',
        '${resturant.phone}', '${resturant.email}', '${resturant.website}', '${socialMedia}','${tags}', '${resturant.openTime}', 
        '${resturant.daysOfOperation}', '${resturant.resturantPics}', ${resturant.orderContact}, ${resturant.bookingContact})`;

  await db.getDB().query(insertQuery);
  return resturant
}

/**
 * This function finds resturant by id
 * @param {string} id
 * @returns resturant or null
 */
async function findResturantById(id,
  fields = `id, creatorId, name, description, category, address, city, state, 
  country, zipCode, phone, email, website, socialMedia, tags, openTime, daysOfOperation, resturantPics, orderContact, created_at, updated_at`) {

  const queryOpts = {
    text: `SELECT ${fields} FROM resturants WHERE id = $1`,
    values: [id],
  };
  return await db.getDB().query(queryOpts);
}


/**
 * This function updates resturant by id
 * @param {string} id
 * @returns resturant or null
 */
async function updateResturantById(id, cols) {

  // Setup static beginning of query
  let query = ['UPDATE resturants SET'];

  // Create another array storing each set command
  // and assigning a number value for parameterized query
  let { set, values } = queryBuilderHelper.createUpdateDBQuery(cols);
  set.push("updated_at =  NOW()");
  query.push(set.join(', '));

  // Add the WHERE statement to look up by id
  query.push(`WHERE id = '${id}'`);
  const updateQuery = query.join(' ')
  const queryOpts = {
    text: updateQuery,
    values: values
  }
  return await db.getDB().query(queryOpts);
}

/**
 * This function fetches all records with mentioned field from resturants table
 * @param {String} fields 
 * @returns database response
 */
async function findAllResturants(fields = `id, creatorId, name, description, category, address, city, state, 
                country, zipCode, phone, email, website, socialMedia, tags, openTime, daysOfOperation, resturantPics, created_at, updated_at`) {

  const queryOpts = {
    text: `SELECT ${fields} from resturants`,
  }
  return await db.getDB().query(queryOpts);
}

export default {
  saveResturant,
  findResturantById,
  updateResturantById,
  findAllResturants,
};
