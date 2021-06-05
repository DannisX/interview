const validate = require('../middleware/validate')
const { body, param, query } = require('express-validator')
const { Question } = require('../model')

// 添加题目验证器
exports.addQuestion = validate(
    [
        body('question.title').notEmpty().withMessage('标题不能为空')
            .custom(async title => {
                const question = await Question.findOne({ title });
                if (question) {
                    return Promise.reject('当前题已存在，如需更改，请使用题目编辑功能！');
                }
            }),
        body('question.type').notEmpty().withMessage('题目类型不能为空！'),
        body('question.frequency').notEmpty().withMessage('题目出现频率不能为空！'),
        body('question.difficulty').notEmpty().withMessage('题目难度不能为空！'),
        body('question.answers').notEmpty().withMessage('题目答案不能为空！')
    ]
)

// 获取题目验证器
exports.getCurrentQuestion = validate(
    [
        param('questionId').notEmpty().withMessage('题目ID不能为空！')
            .custom(async (questionId, { req }) => {
                const question = await Question.findOne({ _id: questionId })
                if (!question) {
                    return Promise.reject('查询题目不存在')
                }
                req.question = question
            })
    ]
)


// exports.getQuestions = validate(
//     [
//         query('')
//     ]
// )

exports.updateQuestion = validate(
    [
        param('questionId').notEmpty().withMessage('题目ID不能为空！')
            .custom(async (questionId, { req }) => {
                const question = await Question.findOne({ _id: questionId })
                if (!question) {
                    return Promise.reject('要修改的题目不存在')
                }
                req.question = question
            })
    ]
)
