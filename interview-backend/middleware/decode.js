const JSEncrypt = require('node-jsencrypt')

const fs = require("fs")
const path = require('path')
exports.decodeUser = async (req, res, next) => {
    try {
        // 获取待解码数据数据
        let { encodeData } = req.body;
        // 获取私钥
        const privateKey = fs.readFileSync(path.join(__dirname, "../RSA/rsa_private.key.pem"))
        // 开始解密
        let decrypt = new JSEncrypt()
        decrypt.setPrivateKey(privateKey.toString());
        const result = JSON.parse(decrypt.decrypt(encodeData))
        req.body.user = result
        next()
    } catch (err) {
        res.status(500).end()
    }
}

exports.decodePassword = async (req, res, next) => {
    try {
        let { encodeData } = req.body;
        // 获取私钥
        const privateKey = fs.readFileSync(path.join(__dirname, "../RSA/rsa_private.key.pem"))
        // 开始解密
        let decrypt = new JSEncrypt()
        decrypt.setPrivateKey(privateKey.toString());
        const result = JSON.parse(decrypt.decrypt(encodeData))
        req.body.password = result;

        next()
    } catch (err) {
        res.status(500).end()
    }
}