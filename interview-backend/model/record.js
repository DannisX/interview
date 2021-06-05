const mongoose = require("mongoose");
const baseModel = require("./base-model");


const recordSchema = new mongoose.Schema({
    ...baseModel,
    userId: {
        type: String,
        require: true
    },
    questionId: {
        type: String,
        require: true
    },
    answers: {
        type: Array,
        require: true
    }
})

module.exports = recordSchema;