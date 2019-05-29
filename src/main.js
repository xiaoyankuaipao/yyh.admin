// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import plugin from './apps/plugins/index' //全局组件

import ElementUI from 'element-ui/lib/index'
import VueImg from 'v-img'

import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueImg);
Vue.use(plugin); //注册全局组件

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
