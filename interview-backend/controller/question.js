const { Question } = require('../model')

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);

// 添加题目
exports.addQuestion = async (req, res, next) => {
    try {
        const lastQuestion = await Question.find({}).sort({ '_id': -1 }).limit(1);
        if (lastQuestion.length <= 0) {
            var rank_id = 1
        } else {
            var rank_id = lastQuestion[0].rank_id + 1
        }

        const question = new Question({ ...req.body.question, rank_id: rank_id });
        await question.save();
        res.status(201).json({
            question
        })
    } catch (err) {
        next(err)
    }
}

// 获取题目
exports.getQuestions = async (req, res, next) => {
    try {
        // 解构传入参数 并设置未传入时的默认值
        const {
            page = 1,
            limit = 8,
            type = "",
            sortby = '_id',
            order = 1,
            title = ""
        } = req.query;
        // 设置模糊查询的规则
        const reg = new RegExp(title, 'i')
        const reg2 = new RegExp(type, 'i')
        let filter = {};
        filter.title = { $regex: reg }
        filter.type = { $regex: reg2 }
        // 查询符合条件的数据
        const questions = await Question.find(filter)
            .sort({ [sortby]: Number.parseInt(order) })
            .skip((Number.parseInt(page) - 1) * Number.parseInt(limit))
            .limit(Number.parseInt(limit));

        const total = await Question.countDocuments();

        res.status(200).json({
            questions,
            total
        })
    } catch (err) {
        next(err)
    }
}

exports.getQuestionsAll = async (req, res, next) => {
    try {
        // 查询符合条件的数据
        const questions = await Question.find({});

        const total = await Question.countDocuments();

        res.status(200).json({
            questions,
            total
        })
    } catch (err) {
        next(err)
    }
}


// 获取当前题目
exports.getCurrentQuestion = async (req, res, next) => {
    try {
        const { question } = req
        res.status(200).json({
            question
        })
    } catch (err) {
        next(err)
    }
}
// 更新当前题目
exports.updateQuestion = async (req, res, next) => {
    try {
        const { authority } = req.user
        if (authority != 'Admin') {
            res.status(403).end()
        }
        const targetInfo = req.body.question;
        const originInfo = req.question;
        const question = await Question.findOneAndUpdate(
            {
                _id: originInfo._id
            },
            {
                ...targetInfo, updatedAt: Date.now()
            },
            {
                new: true
            }
        )
        console.log(question);
        res.status(201).json(question);
    } catch (err) {
        next(err)
    }
}

