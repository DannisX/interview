const multer = require('multer')
const path = require("path")
const avatarPath = path.join(__dirname, '../uploads/avatars')
let storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, avatarPath);
    },
    filename(req, file, cb) {
        let format = (file.originalname).split('.');
        cb(null, `${file.fieldname}-${Date.now()}.${format[format.length - 1]}`)
    }
})
module.exports = async (req, res, next) => {
    let upload = multer({ storage }).single('avatar');
    upload(req, res, (err) => {
        console.log(req.file);
        if (err) {
            res.status(500).json({ error: err })
        } else {
            req.body.avatar = req.file.filename;
            next();
        }
    })
}