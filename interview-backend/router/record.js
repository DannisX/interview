const express = require("express")
const router = express.Router();

const recordCtrl = require('../controller/record')
const recordValidator = require('../validator/record')
const auth = require('../middleware/auth')

// 上传新的提交记录
router.post('/record/:questionId', auth, recordValidator.pushRecord, recordCtrl.pushRecord)

// 获取指定用户的所有提交记录
router.get('/records', auth, recordCtrl.getRecords)

//获取指定用户的指定题目的提交记录 
router.get('/record/:questionId', auth, recordValidator.getCurrentRecord, recordCtrl.getCurrentRecord)

module.exports = router