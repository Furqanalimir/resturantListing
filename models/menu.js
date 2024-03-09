"use strict";

// local packages
import helper from "../helper/index.js";
import db from "../config/db.js";


/**
 * This function saves menu to database
 * @param {Object} menu 
 * @returns database response or error
 */
async function saveMenu(menu) {
    menu.id = helper.generateId();
    const insertQuery = `INSERT INTO menu (id, resturantId, menuCategories, itemName, image, ingredients, description, price) VALUES
          ('${menu.id}', '${menu.resturantId}', '${menu.menuCategories}', '${menu.itemName}', '${menu.image}',
          '${menu.ingredients}', '${menu.description}', '${menu.price}')`;

    return await db.getDB().query(insertQuery);
}

/**
* This function finds meny by resturantIdsI
* @param {string} resturantId
* @returns resturant or null
*/
async function findMenuByResturantId(resturantId,
    fields = `id, resturantId, menuCategories, itemName, image, ingredients, description, 
    price`) {

    const queryOpts = {
        text: `SELECT ${fields} FROM menu WHERE resturantId = $1`,
        values: [resturantId],
    };
    return await db.getDB().query(queryOpts);
}

export default {
    saveMenu,
    findMenuByResturantId
}