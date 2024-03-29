const mongoose = require("mongoose");
const baseModel = require("./base-model");


// 定义数据类型，以及简单规则
const userSchema = new mongoose.Schema({
    ...baseModel,
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    authority: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        default: "https://static01.imgkr.com/temp/4e6244db873a40cebd88047a871a8318.jpg"
    },

})

module.exports = userSchema;