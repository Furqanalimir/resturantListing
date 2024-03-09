"use strict"

//local package
import helper from '../helper/index.js'
import db from '../config/db.js'

/**
 * This function addes user to user
 * @param {Object} user 
 * @returns 
 */
async function addReview(review) {
    review.id = helper.generateId()
    const insertQuery = `INSERT INTO reviews (id, user_id, restaurant_id, rating, comment) VALUES 
        ('${review.id}', '${review.userId}', '${review.restaurant_id}', '${review.rating}', '${review.comment}')`;
    return await db.getDB().query(insertQuery)
};

/**
 * This function fetches all records with mentioned field from reviews table
 * @param {String} resturantId 
 * @param {String} fields 
 * @returns database response
 */

async function findAllReviewsByResturantId(resturantId, fields = `id, user_id, restaurant_id, rating, comment, response, updatedBy, created_at, updated_at`) {

    const queryOpts = {
        text: `SELECT ${fields} from reviews where restaurant_id = '${resturantId}'`,
    }
    return await db.getDB().query(queryOpts);
}

/**
 * This function adds response to already existing review
 * @param {String} resturantId 
 * @param {Object} review
 * @returns response or error from database 
 */
async function addReviewResponse(id, cols){
    // Setup static beginning of query
    let query = ['UPDATE reviews SET'];
    let { set, values } = queryBuilderHelper.createUpdateDBQuery(cols);
    set.push("updated_at =  NOW()");

    query.push(`WHERE id = '${id}'`);
    const updateQuery = query.join(" ");
    const queryOpts = {
        text: updateQuery,
        values: values
      }
      return await db.getDB().query(queryOpts);
}

// /**
//  * This function finds user by phone
//  * @param {string} phone 
//  * @returns matched user or null
//  */
// async function findUserByPhone(phone, fields = "id, fullName, email, phone, password, role") {
//     const queryOpts = {
//         text: `SELECT ${fields} FROM users WHERE phone = $1`,
//         values: [phone]
//     }
//     return await db.getDB().query(queryOpts);
// }

// /**
//  * This function finds user by email or phone
//  * @param {string} email, phone
//  * @returns matched user or null
//  */
// async function findUserByEmailOrPhone(email, phone, fields = "id, fullName, email, phone, password, role, created_at") {
//     const queryOpts = {
//         text: `SELECT ${fields} FROM users WHERE phone = $1 OR email = $2`,
//         values: [phone, email]
//     }
//     return await db.getDB().query(queryOpts);
// }


export default {
    addReview,
    findAllReviewsByResturantId,
    addReviewResponse,
    // findUserByEmailOrPhone,
    // findUserByEmail,
    // findUserByPhone,
}