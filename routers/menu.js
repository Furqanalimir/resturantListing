"use strict";

//npm packages
import express from "express";
const router = express.Router();

//local packages
import menuController from "../controllers/menu.js";
import middleware from "../middleware/authentication.js";

// authentication middleware
router.use(middleware.authenticate);
// routes
router.post("/", menuController.addMenu);
router.get("/:id", menuController.fetchResturantMenu);

export default router;
