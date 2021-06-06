const mongoose = require("mongoose");
const baseModel = require("./base-model");


const questionSchema = new mongoose.Schema({
    // 时间
    ...baseModel,
    // id
    rank_id: {
        type: Number,
        require: true
    },
    // 题目
    title: {
        type: String,
        require: true
    },
    // 代码
    code: {
        type: String,
        require: true
    },
    // 类型
    type: {
        type: String,
        require: true
    },
    // 出现频率
    frequency: {
        type: String,
        require: true
    },
    // 难易程度
    difficulty: {
        type: String,
        require: true
    },
    answers: {
        type: String,
        require: true
    }
})

module.exports = questionSchema;