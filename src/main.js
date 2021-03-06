// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import plugin from './apps/plugins/index' //全局组件

import btnhas from './apps/directives/btnPermission';//按钮权限指令

import ElementUI from 'element-ui/lib/index'
import VueImg from 'v-img'
import BaiduMap from 'vue-baidu-map'

import VueLazyLoad from 'vue-lazyload'

import 'element-ui/lib/theme-chalk/index.css'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueImg);
Vue.use(BaiduMap,{
  ak:'7tj2GoWwsaehSlvUKFGDPGqXvdOfGkDa'
})
Vue.use(VueLazyLoad,{
  preLoad:1.3,
  error:'./static/images/imgLost.png',
  loading:'./static/images/loading.gif',
  listenEvents:['scroll']
});
Vue.use(plugin); //注册全局组件
Vue.use(btnhas);
Vue.use(mavonEditor);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
