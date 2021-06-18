// 引入express
const express = require("express")
// 引入user控制器（user相关路由处理程序）
const userCtrl = require('../controller/user')
// 引入user验证器（user相关数据验证处理程序）
const userValidator = require('../validator/user')

const avatarLoader = require('../middleware/avatarUpload')

// 引入token验证中间件（身份验证）
const auth = require('../middleware/auth')
const decode = require('../middleware/decode')
const addToBlackList = require('../middleware/addToBlackList')


// 实例化路由
const router = express.Router();


// 用户注册
// 使用验证器中间件
router.post('/users', decode.decodeUser, userValidator.register, userCtrl.register)
// 用户登录
// 使用验证器中间件
router.post('/users/login', decode.decodeUser, userValidator.login, userCtrl.login)

// 获取当前登录用户
router.get('/user', auth, userCtrl.getCurrentUser)

// 更新用户
router.put('/user', decode.decodeUser, auth, userValidator.update, userCtrl.updateCurrentUser)

// 更新密码
router.put('/password', auth, decode.decodePassword, userValidator.passwordUpdate, userCtrl.updatePassword)

router.post('/user/avatarupload', auth, avatarLoader, userCtrl.avatarUpload)

router.get('/user/logout', addToBlackList, auth, userCtrl.logout)

router.post('/accesstoken', userCtrl.accesstoken)

module.exports = router