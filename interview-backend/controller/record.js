const { Record } = require('../model')

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);

exports.pushRecord = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const questionId = req.question._id;
        const answers = req.answers;
        const record = new Record({ answers, userId, questionId })
        await record.save();

        res.status(201).json(record);
    } catch (err) {
        next(err)
    }
}

exports.getRecords = async (req, res, next) => {
    try {
        const user = req.user;
        const {
            sortby = '_id',
            order = 1
        } = req.query;
        const filter = {};
        const reg = new RegExp(user._id, 'i')
        filter.userId = { $regex: reg }
        const records = await Record.find(filter).sort({ [sortby]: order });
        res.status(200).json({ records })
    } catch (err) {
        next(err)
    }
}

exports.getCurrentRecord = async (req, res, next) => {
    try {
        console.log(req.params);;
        const { questionId } = req.params;
        const { _id: userId } = req.user;
        const records = await Record.find({ questionId, userId }).sort({ _id: '1' })
        if (records.length == 0) res.status(404).end();
        res.status(200).json({ records })
    } catch (err) {
        next(err)
    }
}