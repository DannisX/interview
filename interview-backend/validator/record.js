const { body, param } = require('express-validator')
const { Record, Question } = require('../model')
const validate = require('../middleware/validate')

exports.getCurrentRecord = validate(
    [
        param('questionId').notEmpty().withMessage('题目ID不能为空！')
            .custom(async (questionId, { req }) => {
                const record = await Record.findOne({ questionId });
                if (!record) {
                    return Promise.reject('题目ID错误！')
                }
                req.record = record
            })
    ]
)

exports.pushRecord = validate(
    [
        // 验证答案数组不能为空
        body('answers').notEmpty().withMessage('题目答案不能为空')
            // 验证答案内容不能为空
            .custom(async (answers, { req }) => {
                answers.map(item => {
                    if (item.answer == '') {
                        return Promise.reject('答案内容不能为空！')
                    }
                })
                console.log(answers);
                req.answers = answers;
            }),

        // 验证题目ID
        param('questionId').notEmpty().withMessage('题目ID不能为空！')
            .custom(async (questionId, { req }) => {
                const question = await Question.findOne({ _id: questionId })
                if (!question) {
                    return Promise.reject('题目不存在！')
                }
                req.question = question
            })

    ]
)



