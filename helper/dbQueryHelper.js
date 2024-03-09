"ues strict";


/**
 * 
 * @param {Object} cols 
 * @returns formatted string
 */
function createUpdateDBQuery(cols) {
    let set = [];
    let values = []
    Object.keys(cols).forEach(function (key, i) {
        values.push(cols[key]);
        set.push(key + ' = ($' + (i + 1) + ')');
    });
    return {set, values};
}

export default {
    createUpdateDBQuery,
}