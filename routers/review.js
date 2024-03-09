"use strict";

//npm packages
import express from "express";
const router = express.Router();

//local packages
import reviewController from "../controllers/review.js";
import middleware from "../middleware/authentication.js";


// routes with sepecific authentication
router.get("/all/:resturantId", middleware.authenticate, reviewController.fetchResturantReviews);
router.post("/response/:id", middleware.authenticateByRoles(['owner', 'admin']), reviewController.addReviewResponse);

//admin and user authentication middleware
router.use(middleware.authenticateByRoles(['admin', 'user']));
// routes
router.post("/", reviewController.addReview);

export default router;