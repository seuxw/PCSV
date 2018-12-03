import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import RefreshData from './components/RefreshData'
import Login from './components/Login'
import './assets/iconfont/iconfont.js'
import VueCookies from 'vue-cookies'

Vue.use(VueRouter)
Vue.use(VueCookies)

const routes = [{
  path: '/paocao/:access_token&:expires_in',
  name: 'paocao1',
  component: RefreshData
},
{
  path: '/paocao',
  name: 'paocao',
  component: RefreshData
},
{
  path: '/login/',
  name: 'login',
  component: Login
}
]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
