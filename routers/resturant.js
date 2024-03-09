"use strict";

//npm packages
import express from "express";
const router = express.Router();

//local packages
import resturantController from "../controllers/resturant.js";
import middleware from "../middleware/authentication.js";

// authentication middleware
router.use(middleware.authenticateByRoles(["admin", "owner"]));
// routes
router.post("/", resturantController.addResturant);
router.put("/:id", resturantController.updateResturant);
router.get("/", resturantController.fetchAllResturants);

export default router;
