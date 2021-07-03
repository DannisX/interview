const multer = require('multer')
const path = require("path")
const moment = require('moment')
const fs = require('fs/promises')
const generateStorage = async () => {
    const today = moment().format('YYYYMMDD')
    const todayPath = `./public/avatars/${today}`
    // 返回绝对路径
    await fs.mkdir(todayPath, { recursive: true })
    let storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, todayPath);
        },
        filename(req, file, cb) {
            cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
        }
    })
    return storage;
}


module.exports = async (req, res, next) => {
    const storage = await generateStorage();
    let upload = multer({ storage }).single('avatar');
    upload(req, res, (err) => {
        if (err) {
            res.status(500).json({ error: err })
        } else {
            req.body.avatar = req.file.filename;
            next();
        }
    })
}