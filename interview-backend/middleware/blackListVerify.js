
const redis = require('../util/redis')
module.exports = async (req, res, next) => {
    // 获取token
    let token = req.headers['authorization']
    token = token ? token.split('Bearer ')[1] : null;
    if (!token) {
        return res.status(401).end();
    }
    // 比对黑名单中的token，若存在于黑名单中，则返回错误信息
    const invalidToken = await redis.getItem(token)
    if (invalidToken) {
        return res.status(401).end()
    }

    next()
}