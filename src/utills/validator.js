const mongoose = require('mongoose')

// Validation checking function
const isValid = function(value) {
    if (typeof value === 'undefined' || value === null) return false //it checks whether the value is null or undefined.
    if (typeof value === 'string' && value.trim().length === 0) return false 
    return true;
};
const isValidObjectId = function(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}
const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0;
};
module.exports = {
    isValid,
    isValidObjectId,
    isValidRequestBody
}