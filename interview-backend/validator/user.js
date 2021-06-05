const validate = require('../middleware/validate')
const { body } = require('express-validator')
const { User } = require('../model')


// 验证器 注册路由的验证器
exports.register = validate(
    [
        body('user.name').notEmpty().withMessage("用户名不能为空！")
            .custom(async name => {
                const user = await User.findOne({ name });
                if (user) {
                    return Promise.reject('用户名已存在！')
                }
            }),
        body('user.email').notEmpty().withMessage("邮箱不能为空！")
            .isEmail().withMessage("邮箱格式不正确！")
            .custom(async email => {
                const emails = await User.findOne({ email });
                if (emails) {
                    return Promise.reject('该邮箱已被注册！')
                }
            }),
        body('user.authority').notEmpty().withMessage("用户权限不能为空！"),
        body('user.password').notEmpty().withMessage("密码不能为空！"),
    ]
)

// 登录路由的验证器
exports.login = [
    validate(
        [
            body('user.name').notEmpty().withMessage('用户名不能为空'),
            body('user.password').notEmpty().withMessage('密码不能为空')
        ]),
    validate(
        [
            body('user.name').custom(async (name, { req }) => {
                const filter = {};
                filter.$or = [
                    { name: name },
                    { email: name },
                ]
                const user = await User.findOne(filter);
                // const user = await User.findOne({ name });
                if (!user) {
                    return Promise.reject('用户名不存在')
                }
                req.user = user
            }),

        ]),
    validate(
        [
            body('user.password').custom(async (password, { req }) => {
                if (password != req.user.password) {
                    return Promise.reject('密码错误')
                }
            })
        ]
    )
]

exports.update = validate(
    [
        body('user.email').isEmail().withMessage("邮箱格式不正确！")
    ]
)

exports.passwordUpdate = validate(
    [
        body('password.passwordOld').custom(async (password, { req }) => {
            console.log(req.user);
            console.log(password);
            if (password != req.user.password) {
                return Promise.reject('旧密码输入错误')
            }
        })
    ]
)

