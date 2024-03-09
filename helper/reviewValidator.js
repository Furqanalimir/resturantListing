"use strict";

import joi from "joi";

/**
 * This function validates review info/params when review is added
 * @param {Object} reviewParam
 * @throws {error} if validation fails
 * @returns null
 */
function validateReviewBody(reviewParam = {}) {
    const param = joi.object({
        restaurant_id: joi.string().required(),
        rating: joi.number().required(),
        comment: joi.string().required()
    });

    const valid = param.validate(reviewParam, {
        allowUnknown: false,
        default: false,
    });

    if (valid.error) {
        console.log(
            "ERR[helper/resturantValidator.js], func-validateResurantDetails",
            valid.error.details
        );
        throw new Error(valid.error);
    }
    return;
}

/**
 * This function validates review response functions info/params
 * @param {Object} reviewParam
 * @throws {error} if validation fails
 * @returns null
 */
function validateReviewResponseBody(reviewParam = {}) {
    const param = joi.object({
        response: joi.string().required(),
        responseBy: joi.string().required()
    });

    const valid = param.validate(reviewParam, {
        allowUnknown: false,
        default: false,
    });

    if (valid.error) {
        console.log(
            "ERR[helper/resturantValidator.js], func-validateResurantDetails",
            valid.error.details
        );
        throw new Error(valid.error);
    }
    return;
}

export default {
    validateReviewBody,
    validateReviewResponseBody,
}