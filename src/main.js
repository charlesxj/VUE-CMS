import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.use(VueRouter)

import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

import app from './App.vue'
import router from './router.js'


import { Header  } from 'mint-ui'
import { Swipe, SwipeItem } from 'mint-ui';

Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

var vm = new Vue({
  el: '#app',
  router: router,
  render: a => a(app)
}); 