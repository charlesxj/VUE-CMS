import VueRouter from 'vue-router'

import Home from './routers/home.vue'
import Member from './routers/member.vue'
import Shopcart from './routers/shopcart.vue'
import Search from './routers/search.vue'

import Newslist from './news/newslist.vue'
import newsinfo from './news/newsinfo.vue'

import piclist from './pics/piclist.vue'
import picinfo from './pics/picinfo.vue'

import goodslist from './goods/goodslist.vue'

import goodinfo from './goods/goodinfo.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    { path: '/', redirect: 'home' },
    {
      path: '/home', component: Home,
      // children: [{
      //   path: 'newslist',component:Newslist
      // }]
    },
    { path: '/member', component: Member },
    { path: '/shopcart', component: Shopcart },
    { path: '/search', component: Search },
    { path: '/home/newslist', component: Newslist },
    { path: '/home/newsinfo/:id', component: newsinfo },
    { path: '/home/piclist', component: piclist },
    { path: '/home/picinfo/:id', component: picinfo },
    { path: '/home/goodslist', component: goodslist },
    { path: '/home/goodinfo/:id', component: goodinfo,name:'goodinfo-route' }
  ],
  linkActiveClass: 'mui-active',
  // mode:'history'
})

// 把路由对象暴露出去
export default router