"use strict";

//npm packages

//local packages
import menuValidator from "../helper/menuValidator.js";
import menuModels from "../models/menu.js";

/**
 * This function creates user if it doesn't exists in system
 * @param   {Object}  req
 * @param   {Objec}   res
 * @throws  {error}   if validation fails or user email/phone alrady exists
 * @returns {Object}  with success response or error response
 */
async function addMenu(req, res) {
    try {
        const menu = req.body;
        //validating body parameters
        menuValidator.validateAddMenu(menu);
        await menuModels.saveMenu(menu);

        return res.status(200).send({
            data: "Menu added!",
            error: null,
        });
    } catch (err) {
        console.log("ERR[controllers/menu.js], func-addMenu", err);
        return res.status(200).send({
            data: null,
            error: err.message || err,
        });
    }
};

async function fetchResturantMenu(req, res){
    
    try{
        const resturantId = req.params.id;
        const menu = await menuModels.findMenuByResturantId(resturantId)
        return res.status(200).send({
            data: menu.rows,
            error: null,
        });
    }catch(err){
        console.log("ERR[controllers/menu.js], func-addMenu", err);
        return res.status(200).send({
            data: null,
            error: err.message || err,
        });
    }
}

export default {
    addMenu,
    fetchResturantMenu,
};
