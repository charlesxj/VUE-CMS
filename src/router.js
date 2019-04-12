import VueRouter from 'vue-router'

import Home from './routers/home.vue'
import Member from './routers/member.vue'
import Shopcart from './routers/shopcart.vue'
import Search from './routers/search.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    { path: '/', redirect: 'home' },
    { path: '/home', component: Home },
    { path: '/member', component: Member },
    { path: '/shopcart', component: Shopcart },
    { path: '/search', component: Search },
  ],
  linkActiveClass: 'mui-active',
  // mode:'history'
})

// 把路由对象暴露出去
export default router