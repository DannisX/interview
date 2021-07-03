const { User, RefreshToken } = require('../model')
const md5 = require('md5')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const tokenTool = require('../util/jwt')
const { ACCESS_TOKEN_EXPIRESIN, REFRESH_TOKEN_EXPIRESIN } = require('../config/config.default')
const path = require('path')
/**
 * 注册
 * @param  req 包含user数据的请求
 * @param  res 响应
 * @param  next 继续向后执行函数
 */

exports.register = async (req, res, next) => {
    try {
        // 生成一条新的user数据，并保存至数据库
        let user = new User({ ...req.body.user, password: md5(req.body.user.password) })
        await user.save()
        user = user.toJSON();
        delete user.password;
        // 发送成功响应
        res.status(201).json(
            { user }
        )
    } catch (err) {
        next(err)
    }
}

// 经过中间件的处理，收到的登录数据符合要求，返回给客户端不包含密码的用户数据
exports.login = async (req, res, next) => {
    try {
        // 经过前面的中间件，数据已经通过验证，用户名和密码正确，可以直接生成token
        let { user } = req;
        //#region 
        const freshTokenAlready = await RefreshToken.findOne({ userId: user._id });
        let refresh_token;
        if (!freshTokenAlready) {
            // 生成刷新令牌
            refresh_token = await tokenTool.generateToken(user._id, REFRESH_TOKEN_EXPIRESIN);
            // 将刷新令牌存入数据库
            const freshToken = new RefreshToken({ userId: user._id, refreshToken: refresh_token });
            await freshToken.save();

        } else {
            refresh_token = await tokenTool.generateToken(user._id, REFRESH_TOKEN_EXPIRESIN);
            const newFreshToken = await RefreshToken.findOneAndUpdate(
                { userId: user._id },
                { refreshToken: refresh_token, updatedAt: Date.now() },
                { new: true }
            )
        }
        //#endregion

        // const refresh_token = await tokenTool.generateToken(user._id, REFRESH_TOKEN_EXPIRESIN);
        // 生成访问令牌
        const access_token = await tokenTool.generateToken(user._id, ACCESS_TOKEN_EXPIRESIN)
        user = user.toJSON();
        delete user.password;
        res.status(200).json({
            user,
            refresh_token,
            access_token,
        })
    } catch (err) {
        next(err)
    }
}

// 获取当前用户
// 经过中间件的验证，已经知道当前用户是谁，并将用户信息写入了body的user中，返回不包含密码的用户数据
exports.getCurrentUser = async (req, res, next) => {
    try {
        let { user } = req;
        user = user.toJSON();
        delete user.password;
        res.status(200).json({ user });
    } catch (err) {
        next(err)
    }
}

// 更新当前用户信息
// 经过中间件的验证，知道数据可以修改，更新到数据库
exports.updateCurrentUser = async (req, res, next) => {
    try {
        const targetInfo = req.body.user;
        const originInfo = req.user;
        const user = await User.findOneAndUpdate(
            // 查找符合条件的第一个
            { _id: originInfo._id },
            // 设置更新的信息
            { ...targetInfo, updatedAt: Date.now() },
            // 设置是否返回新值
            { new: true }
        );
        res.status(200).json({ user })
    } catch (err) {
        next(err)
    }
}

exports.updatePassword = async (req, res, next) => {
    try {
        const originInfo = req.user;
        const targetInfo = { password: req.body.password.password }

        let user = await User.findOneAndUpdate(
            { _id: originInfo._id },
            { ...targetInfo, updatedAt: Date.now() },
            { new: true }
        )
        user = user.toJSON();
        delete user.password
        res.status(200).json({ user })
    } catch (err) {
        next(err)
    }
}


exports.avatarUpload = async (req, res, next) => {
    const { user } = req;
    const { file } = req;
    // 更改图片静态资源路径
    file.path = `http://localhost:3000/static/${file.path.replace('public\\', '')}`
    // 
    // file.path = `http://192.168.3.232:3000/static/${file.path.replace('public\\', '')}`
    // 同步更新数据库
    let update = await User.findOneAndUpdate(
        { _id: user.id },
        { avatar: file.path },
        { new: true }
    )
    res.status(200).json({ data: req.file })
}

exports.logout = async (req, res, next) => {
    try {
        res.end();
    } catch (err) {
        next(err)
    }
}

exports.accesstoken = async (req, res, next) => {
    try {
        //#region 获得并验证访问令牌
        // // 获得访问令牌
        // const token = req.headers['authorization'].split('Bearer ')[1];
        // console.log(token);
        // // 验证访问令牌
        // const tokenResult = await tokenTool.verifyToken(token);
        // console.log("tokenResult=======", tokenResult);
        //#endregion

        // 获得刷新令牌
        const refreshToken = req.headers['x-refresh-token'].split('refreshToken ')[1]
        // 查询数据库中是否存在该刷新令牌，若存在则返回新的访问令牌，若不存在，则返回错误代码和信息
        // 防盗，被盗后重新登录即可使原来的token失效
        const refreshTokenAlready = await RefreshToken.findOne({ refreshToken })
        if (!refreshTokenAlready) {
            return res.status(403).json({
                error: {
                    code: 1,
                    message: "令牌失效，请重新登录！"
                }
            })
        }
        // 验证刷新令牌,令牌有效则返回新的访问令牌，令牌无效则返回错误
        const refreshTokenResult = await tokenTool.verifyToken(refreshToken);

        // 生成新的token
        const access_token = await tokenTool.generateToken(refreshTokenResult.data, ACCESS_TOKEN_EXPIRESIN);
        res.status(201).json({ access_token })

    } catch (err) {
        // 刷新令牌失效，需要重新登录
        if (err.message == 'jwt expired') {
            res.status(403).json({
                error: {
                    code: 2,
                    message: "超过14天未登录，请重新登录！"
                }
            })
        } else {
            next(err)
        }

    }
}