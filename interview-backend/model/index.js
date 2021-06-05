const mongoose = require('mongoose')
const { DBURI } = require('../config/config.default')
const userSchema = require('./user')
const questionSchema = require('./question')
const recordSchema = require('./record')
const refreshSchema = require('./freshToken')

// 连接mongDB数据库
mongoose.connect(DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// 连接MongoDB回调
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log('success connected');
})


// 导出模型
module.exports = {
    User: mongoose.model('User', userSchema),
    Question: mongoose.model('Question', questionSchema),
    Record: mongoose.model('Record', recordSchema),
    RefreshToken: mongoose.model('RefreshToken', refreshSchema)
}
