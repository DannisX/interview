import Home from '../components/Home/Home'
import User from '../components/User/User'
import Question from '../components/Question/Question'
import Record from '../components/Record/Record'
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'
import About from '../components/About/About'

import UserShow from '../components/User/UserShow'
import UserEdit from '../components/User/UserEdit'

import QuestionSider from "../components/Question/QuestionSider/QuestionSider";
import AddQuestion from '../components/Question/AddQuestion/AddQuestion'
import ShowQuestion from '../components/Question/ShowQuestion/ShowQuestion'
import Answer from '../components/Question/Answer/Answer'


import Records from '../components/Record/Records/Records'




import Description from '../components/About/Description/Description'
import Stack from '../components/About/Stack/Stack'
import Contact from '../components/About/Contact/Contact'


export const routes = [
    {
        path: "/",
        name: "home",
        meta: {
            title: "主页"
        },
        component: Home
    },
    {
        path: "/user",
        name: "user",
        meta: {
            title: "用户信息"
        },
        component: User,
        redirect: "/user/show",
        children: [
            {
                path: "/user/show",
                name: "userShow",
                meta: {
                    title: "用户信息"
                },
                component: UserShow
            },
            {
                path: "/user/edit",
                name: "userEdit",
                meta: {
                    title: "信息编辑"
                },
                component: UserEdit
            },
        ]
    },
    {
        path: '/question',
        name: "question",
        meta: {
            title: "题库"
        },
        redirect: "/question/qsshow",
        component: Question,
        children: [
            {
                path: '/question/qsshow',
                name: 'qsShow',
                meta: {
                    title: '题库'
                },
                components: {
                    sider: QuestionSider,
                    default: ShowQuestion
                }
            },
            {
                path: '/question/addnew',
                name: 'addNew',
                meta: {
                    title: '添加新题'
                },
                component: AddQuestion
            },
            {
                path: '/question/answer',
                name: 'answerQs',
                meta: {
                    title: '答题'
                },
                component: Answer
            }
        ]
    },
    {
        path: '/record',
        name: 'record',
        component: Record,
        children: [
            {
                path: '/record/records',
                name: 'records',
                meta: {
                    title: "提交记录"
                },
                component: Records
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录'
        },
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        meta: {
            title: '注册'
        },
        component: Register
    },
    {
        path: '/about',
        name: 'about',
        meta: {
            title: '关于我们'
        },
        redirect: '/about/description',
        component: About,
        children: [
            {
                path: '/about/description',
                name: 'description',
                meta: {
                    title: '系统描述'
                },
                component: Description,
            },
            {
                path: '/about/stack',
                name: 'stack',
                meta: {
                    title: '技术栈'
                },
                component: Stack,
            },
            {
                path: '/about/contact',
                name: 'contact',
                meta: {
                    title: '联系方式'
                },
                component: Contact,
            },
        ]
    }


]