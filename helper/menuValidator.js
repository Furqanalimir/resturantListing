"use strict"

import joi from 'joi'


function validateAddMenu(menuDetails) {
    const param = joi.object({
        resturantId: joi.string().required(),
        menuCategories: joi.string().required(),
        itemName: joi.string().required(),
        image: joi.string(),
        ingredients: joi.string().required(),
        description: joi.string().required(),
        price: joi.number().required(),
        totalReviewers: joi.number(),
        avgReviews: joi.number(),
    })
    const valid = param.validate(menuDetails, {
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
    validateAddMenu,
}
