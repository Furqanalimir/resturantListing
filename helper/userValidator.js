"use strict"

import joi from 'joi'


/**
 * This function validates user credenials upon creating/registering
 * @param {Object} userDetails 
 * @throws {error} if validation fails
 * @returns null
 */
function validateAddUser(userDetails = {}) {
    const param = joi.object({
        "fullName": joi.string().required().min(3),
        "email": joi.string().email().required(),
        "phone": joi.number().required(),
        "password": joi.string().required().min(8),
        "role": joi.string().required().valid('owner', 'admin', 'user')
    });

    const valid = param.validate(userDetails, {
        allowUnknown: false,
        default: false
    });

    if (valid.error) {
        console.log("ERR[helper/validator.js], func-validateAddUser", valid.error.details)
        throw new Error(valid.error)
    };
    return
}

/**
 * This function validates user credenials upon login
 * @param {Object} userDetails 
 * @throws {error} if validation fails
 * @returns null
 */
function validateUserLogin(userDetails = {}) {
    const param = joi.object({
        "email": joi.string().email().required(),
        "password": joi.string().required(),
    });

    const valid = param.validate(userDetails, {
        allowUnknown: false,
        default: false
    });

    if (valid.error) {
        console.log("ERR[helper/userValidator.js], func-validateUserLogin", valid.error.details)
        throw new Error(valid.error)
    };
    return
}

export default {
    validateAddUser,
    validateUserLogin,
}