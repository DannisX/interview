import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// import from ''
// 登录状态
import isLogin from './isLogin'
// 用户信息
import user from './user'
// 系统设置
import setting from './setting'
// 题目
import question from './question'
// 提交记录
import record from './record'

const store = new Vuex.Store({
    modules: {
        isLogin,
        user,
        setting,
        question,
        record
    }
})

export default store;