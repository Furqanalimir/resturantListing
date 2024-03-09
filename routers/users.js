"use strict"

//npm packages
import express from 'express';
const router  = express.Router()

//local packages
import userController from '../controllers/users.js'

router.post("/signup", userController.addUser);
router.post("/login", userController.userLogin);

export default router