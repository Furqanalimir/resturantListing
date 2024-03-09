"use strict";

/**
 * This function picks only mentioned keys from object
 * @param {Object} obj 
 * @param {Array} keysToPick 
 * @returns object with specific keys mentioned
 */
function pickKeys(obj, keysToPick = []) {
  const pickedObject = {};

  keysToPick.forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      pickedObject[key] = obj[key];
    }
  });

  return pickedObject;
}

/**
 * This function formats object to string as per database requires
 * @param {Object} data 
 * @returns string
 */
function structureObjectForDatabase(data) {
  let formattedData = "{";
  formattedData += Object.keys(data).map((key) => `"${key}": "${data[key]}"`);
  formattedData += "}";
  return formattedData;
}

/**
 * This function formats arrat to string as per database requires
 * @param {Array} data 
 * @returns string
 */
function structureArrayForDatabase(data) {
  let formattedData = "";
  formattedData = "{" + data.map((value) => `${value}`).join(" ") + "}";
  return formattedData;
}

export default {
  pickKeys,
  structureObjectForDatabase,
  structureArrayForDatabase,
};
