const tokenTool = require('../util/jwt')
const { User } = require('../model')
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
        return res.status(403).json({
            error: {
                code: 3,
                message: "账号已登出，请重新登录"
            }
        })
    }

    try {
        const result = await tokenTool.verifyToken(token);
        const user = await User.findById(result.data)
        req.user = user;

        next()
    } catch (error) {
        return res.status(401).json({
            error: {
                code: 5,
                message: "身份校验失败，请刷新令牌"
            }
        });
    }
}