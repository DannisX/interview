import Vue from 'vue'
import router from './router'
import store from './store'
import axios from './axios'
import JSEncrypt from 'jsencrypt'
//#region 组件引入
import { Button, Message, Menu, MenuItem, MenuItemGroup, Row, Col, Avatar, Card, Form, FormItem, Input, Container, Aside, Main, Upload, Table, TableColumn, Image, Select, Option, Drawer, Pagination, } from 'element-ui'
//#endregion
import App from './App.vue'

//#region 组件使用
Vue.use(Button)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Row)
Vue.use(Col)
Vue.use(Avatar)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Upload)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Image)
Vue.use(Select)
Vue.use(Option)
Vue.use(Drawer)
Vue.use(Pagination)


Vue.prototype.$message = Message;
//#endregion

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.path == '/' || to.path == '/login' || to.path == '/register' || store.getters.isLogin || sessionStorage.getItem('isLogin') == 'true') {
    next()
  } else {
    Message({
      message: "还没有登录，请登录后进入！",
      type: 'warning',
      duration: 2000
    })
    next('/login')
  }
})

Vue.prototype.$encrypt = data => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(localStorage.getItem("pubkey"));
  const encodeData = encrypt.encrypt(JSON.stringify(data));
  return encodeData;
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
