"use strict"

//local package
import helper from '../helper/index.js'
import db from '../config/db.js'
import queryBuilderHelper from '../helper/dbQueryHelper.js'

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

async function findAllReviewsByResturantId(resturantId, fields = `id, user_id, restaurant_id, rating, comment, response, responseBy, created_at, updated_at`) {

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
async function addReviewResponse(id, respondedBy, cols) {
    // Setup static beginning of query
    let query = ['UPDATE reviews SET'];
    let { set, values } = queryBuilderHelper.createUpdateDBQuery(cols);

    set.push("updated_at =  NOW()");
    set.push(`responseBy = '${respondedBy}'`)

    query.push(set.join(', '));
    query.push(`WHERE id = '${id}'`);

    const updateQuery = query.join(" ");
    const queryOpts = {
        text: updateQuery,
        values: values
    }
    return await db.getDB().query(queryOpts);
}


export default {
    addReview,
    findAllReviewsByResturantId,
    addReviewResponse,
}