"use strict";

import multer from 'multer';
import path from 'path';
import fs from 'fs';
// constants
const FOLDER_PATH = "uploads/";

/**
 * This function handles images
 * @param {String} name 
 */
function handleSingleImage(name) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (!fs.existsSync(FOLDER_PATH)) {
                console.log("Creating folder", FOLDER_PATH)
                fs.mkdirSync(FOLDER_PATH);
            }
            cb(null, FOLDER_PATH);
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const newName = `${file.fieldname}-${Date.now()}${ext}`;
            cb(null, newName);
        },
    });

    return multer({ storage: storage }).single(name);
};

export default {
    handleSingleImage,
}