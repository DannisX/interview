import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routes'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(err => err);
}

const routerReplace = Router.prototype.replace
Router.prototype.replace = function replace(location) {
    return routerReplace.call(this, location).catch(err => err);
}
Vue.use(Router)

const router = new Router({
    routes,
    mode: 'history'
})

export default router;