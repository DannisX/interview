const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const sign = promisify(jwt.sign)
const verify = promisify(jwt.verify)


// 生成Token
exports.generateToken = async (data, expiresIn) => {
    // // 生成一个时间戳
    const createdAt = Math.floor(Date.now() / 1000);
    // 获取私钥
    const secret = fs.readFileSync(path.join(__dirname, '../RSA/rsa_private.key.pem'));
    // 生成并返回一个token
    const token = await sign(
        // 数据
        {
            data
        },
        // 私钥
        secret,
        // 配置：算法以及失效时间
        { algorithm: 'RS256', expiresIn });
    return token;
}

// 验证Token
exports.verifyToken = async (token) => {
    // 获取私钥
    // let public = fs.readFileSync(path.join(__dirname, '../RSA/rsa_private.key.pem'));
    // 获取公钥
    let public = fs.readFileSync(path.join(__dirname, '../RSA/rsa_private.key.pem'));
    try {
        if (token) {
            let result = await verify(token, public, { algorithms: ['RS256'] }) || {};
            return result;
        }
    } catch (err) {
        return Promise.reject(err);
    }

}
