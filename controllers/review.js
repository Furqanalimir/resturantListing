"use strict";

//npm packages

//local packages
import reviewValidator from "../helper/reviewValidator.js";
import models from "../models/reviews.js";
// import dataHelper from "../helper/dataHelper.js";

async function addReview(req, res) {
    try {
        let reviewDetails = req.body;
        reviewValidator.validateReviewBody(reviewDetails);

        reviewDetails.userId = req.userId;

        const review = await models.addReview(reviewDetails)

        return res.status(200).send({
            data: review.rows,
            error: null,
        });
    } catch (err) {
        console.log("ERR[controllers/review.js], func-addReview", err);
        return res.status(500).send({
            data: null,
            error: err.message || err,
        });
    }
};

async function fetchResturantReviews(req, res) {
    try {
        const resturantId = req.params.resturantId;
        const reviews = await models.findAllReviewsByResturantId(resturantId);

        return res.status(200).send({
            data: reviews.rows,
            error: null,
        });
    } catch (err) {
        console.log("ERR[controllers/review.js], func-addReview", err);
        return res.status(500).send({
            data: null,
            error: err.message || err,
        });
    }
}

async function addReviewResponse(req, res) {
    try {
        const reviewResponse = req.body;
        const id = req.params.id;

        reviewValidator.validateReviewResponseBody(reviewResponse);

        const updatedReview = await models.addReviewResponse(id, reviewResponse);
        return res.status(200).send({
            data: updatedReview.rows,
            error: null,
        });
    } catch (err) {
        console.log("ERR[controllers/review.js], func-addReview", err);
        return res.status(500).send({
            data: null,
            error: err.message || err,
        });
    }
}

export default {
    addReview,
    fetchResturantReviews,
    addReviewResponse,
}