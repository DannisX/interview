import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import { Message, Notification } from 'element-ui'

// axios.defaults.baseURL = "http://localhost:3000/api"


const _axios = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000,
});

// 设置请求拦截器，添加token
_axios.interceptors.request.use(
    config => {
        // 处理请求的配置
        // 读取token,添加token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => Promise.reject(error)
)

let refreshTokenFlag = false;
let requestList = []

function requestAll() {
    requestList.forEach(item => item())
    refreshTokenFlag = false;
    requestList = [];
}

// 设置响应拦截器
_axios.interceptors.response.use(
    response => {
        // 处理响应
        if (response.status < 300)
            return response
    },
    error => {
        // 处理状态码2xx之外的情况
        switch (error.response.status) {
            case 401:
                // 令牌失效，需要刷新
                if (error.response.data.error.code === 5) {
                    // 如果正在刷新，就把拦截到的请求存下来
                    if (refreshTokenFlag) {
                        return new Promise((resolve, reject) => {
                            requestList.push(async () => {
                                try {
                                    const r = await _axios(error.response.config);
                                    resolve(r)
                                } catch (err) {
                                    reject(err)
                                }
                            })
                        })
                    } else {
                        // 如果没有在获取新令牌，则去获取新令牌，并将之后拦截到的请求保存下来
                        refreshTokenFlag = true
                        return new Promise((resolve, reject) => {
                            requestList.push(async () => {
                                try {
                                    // 获取刷新token
                                    const refreshToken = localStorage.getItem('refreshToken');
                                    // 带上刷新令牌去请求一个新的访问令牌
                                    const result = await _axios({
                                        method: 'POST',
                                        url: `/accesstoken`,
                                        headers: {
                                            'X-refresh-token': `refreshToken ${refreshToken}`
                                        }
                                    });
                                    // 将获取到的访问token保存到本地
                                    localStorage.setItem('token', result.data.access_token);
                                    const r = await _axios(error.response.config);
                                    resolve(r)
                                } catch (err) {
                                    reject(err)
                                }
                            })
                            requestAll();
                        })
                    }
                }

                break;
            case 403:
                if (router.currentRoute.name !== 'login') {
                    router.replace({
                        name: 'login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    })
                }
                Message({
                    message: error.response.data.error.message,
                    type: "info"
                })
                break;
            default:
                break;
        }
        return Promise.reject(error)
    }

)

Plugin.install = (Vue, options) => {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios
            }
        },
        $axios: {
            get() {
                return _axios
            }
        }
    })
}

Vue.use(Plugin)
export default Plugin
