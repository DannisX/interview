const express = require("express")
const router = express.Router();

// 用户相关路由
router.use(require('./user'))

// 用户提交记录相关路由
router.use(require('./record'))

router.use(require('./question'))


module.exports = router