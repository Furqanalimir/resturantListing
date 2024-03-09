"use strict";

//npm packages
import express from "express";
const router = express.Router();

//local packages
import resturantController from "../controllers/resturant.js";
import authMiddleware from "../middleware/authentication.js";
import imageMiddleware from '../middleware/imageHandler.js';

// authentication middleware
router.use(authMiddleware.authenticateByRoles(["admin", "owner"]));
// routes
router.post("/", imageMiddleware.handleSingleImage("images"), resturantController.addResturant);
router.put("/:id", resturantController.updateResturant);
router.get("/", resturantController.fetchAllResturants);

export default router;
