import Vue from 'vue'

import './lib/mui/css/mui.css'

import app from './App.vue'

import { Header } from 'mint-ui'
Vue.component(Header.name, Header);
 
var vm = new Vue({
  el: '#app',
  render: a => a(app)
}); 