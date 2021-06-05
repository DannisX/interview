const mongoose = require("mongoose");
const baseModel = require("./base-model");


const freshTokenSchema = new mongoose.Schema({
    ...baseModel,
    userId: {
        type: String,
        require: true
    },
    refreshToken: {
        type: String,
        require: true
    },
})

module.exports = freshTokenSchema;