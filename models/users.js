"use strict"

//local package
import helper from '../helper/index.js'
import db from '../config/db.js'

/**
 * This function addes user to user
 * @param {Object} user 
 * @returns 
 */
async function saveUser(user) {
    user.id = helper.generateId()
    user.password = await helper.encryptPassword(user.password);
    const insertQuery = `INSERT INTO users (id, fullName, email, phone, password, role) VALUES 
        ('${user.id}', '${user.fullName}', '${user.email}', '${user.phone}', '${user.password}', '${user.role}' )`;
    return await db.getDB().query(insertQuery)
}

/**
 * This function finds user by id
 * @param {string} id 
 * @returns user or null
 */
async function findUserById(id, fields = "id, fullName, email, phone, password, role") {
    const queryOpts = {
        text: `SELECT ${fields} FROM users WHERE id = $1`,
        values: [id]
    }
    return await db.getDB().query(queryOpts);
}

/**
 * This function finds user by email
 * @param {string} email 
 * @returns matched user or null
 */
async function findUserByEmail(email, fields = "id, fullName, email, phone, password, role") {
    const queryOpts = {
        text: `SELECT ${fields} FROM users WHERE email = $1`,
        values: [email]
    }
    return await db.getDB().query(queryOpts);
}

/**
 * This function finds user by phone
 * @param {string} phone 
 * @returns matched user or null
 */
async function findUserByPhone(phone, fields = "id, fullName, email, phone, password, role") {
    const queryOpts = {
        text: `SELECT ${fields} FROM users WHERE phone = $1`,
        values: [phone]
    }
    return await db.getDB().query(queryOpts);
}

/**
 * This function finds user by email or phone
 * @param {string} email, phone
 * @returns matched user or null
 */
async function findUserByEmailOrPhone(email, phone, fields = "id, fullName, email, phone, password, role, created_at") {
    const queryOpts = {
        text: `SELECT ${fields} FROM users WHERE phone = $1 OR email = $2`,
        values: [phone, email]
    }
    return await db.getDB().query(queryOpts);
}


export default {
    saveUser,
    findUserById,
    findUserByEmailOrPhone,
    findUserByEmail,
    findUserByPhone,
}