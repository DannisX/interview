const express = require("express")
// require questions controller
const questionCtrl = require('../controller/question')
// require quesitons validator
const questionValidator = require('../validator/question')
// require auth 
const auth = require('../middleware/auth')

const router = express.Router();

// 上传新题
router.post('/questions', questionValidator.addQuestion, questionCtrl.addQuestion)

// 获取题目列表(查询参数{type:"",keyword:"",_page:"",_limit:""})
router.get('/questions', questionCtrl.getQuestions)

//  获取所有题目
router.get('/questions/all', questionCtrl.getQuestionsAll)

// 获取当前题目
router.get('/question/:questionId', questionValidator.getCurrentQuestion, questionCtrl.getCurrentQuestion)

// 更新题目
router.put('/question/:questionId', auth, questionValidator.updateQuestion, questionCtrl.updateQuestion)

// 数据备份,用于将题目数据存至json文件，数据备份
router.get('/questions/backup', questionCtrl.backup)
// 数据恢复，用于将保存在json文件中的题目数据转至数据库中
router.get('/questions/restore', questionCtrl.restore)

module.exports = router