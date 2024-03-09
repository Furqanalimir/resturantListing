"use strict";

//npm packages
import express from "express";
const router = express.Router();

//local packages
import menuController from "../controllers/menu.js";
import middleware from "../middleware/authentication.js";
import imageMiddleware from '../middleware/imageHandler.js';

// authentication middleware
router.use(middleware.authenticate);
// routes
router.post("/", imageMiddleware.handleSingleImage("image"), menuController.addMenu);
router.get("/:id", menuController.fetchResturantMenu);

export default router;
