const redis = require('../util/redis')
const { ACCESS_TOKEN_EXPIRESIN } = require('../config/config.default')

module.exports = (req, res, next) => {
    const token = req.headers['authorization'].split('Bearer ')[1];
    if (token) {
        redis.setItem(token, 'invalidToken', ACCESS_TOKEN_EXPIRESIN)
    }
    next();
}