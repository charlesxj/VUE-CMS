import Vue from 'vue'
// import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import globalvar from './commonvue/global.vue'
import VuePreview from 'vue-preview'
Vue.use(VueResource)

Vue.use(VueRouter)

// Vue.use(Vuex)

// Vue.use(VuePreview)

// Vue.http.options.root="http://localhost:59105"
Vue.http.options.emulateJSON = true;

Vue.prototype.GLOBALVAR = globalvar;

console.log(Vue.prototype.GLOBALVAR.urlhost);

import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

import app from './App.vue'
import router from './router.js'

import moment from 'moment'

Vue.filter('dateFormat111', function (dateStr, patter = "YYYY-MM-DD HH:mm:ss") {
  return moment(dateStr).format(patter);
})

Vue.filter('dateFormat222', function (value, fmt = "YYYY-MM-DD HH:mm:ss") {
  var that = new Date(Date.parse(value));
  var o = {
    "M+": that.getMonth() + 1, //月份
    "d+": that.getDate(), //日
    "h+": that.getHours(), //小时
    "m+": that.getMinutes(), //分
    "s+": that.getSeconds(), //秒
    "q+": Math.floor((that.getMonth() + 3) / 3), //季度
    S: that.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (that.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? o[k]
          : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
})

// with parameters install
Vue.use(VuePreview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: { top: 0, bottom: 0 },
  captionEl: false,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: false
})

// import { Header } from 'mint-ui'
// import { Swipe, SwipeItem, Button } from 'mint-ui';
// import { Lazyload } from 'mint-ui';
// Vue.use(Lazyload);

// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.component(Button.name, Button);

import MintUI from 'mint-ui'
Vue.use(MintUI);
import 'mint-ui/lib/style.css'

import store from './store.js'


var vm = new Vue({
  el: '#app',
  router: router,
  render: a => a(app),
  store: store,
  mounted() {
    this.$store.state.car=JSON.parse(localStorage.getItem('car')||'[]');
  },
}); 