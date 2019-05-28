import Vue from 'vue'
import Router from 'vue-router'
import Login from '../apps/app/login/login'
import Manage from '../apps/app/manage/manage'
import Home from '../apps/app/home/home'

import demo from './demo.js'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
      {
        path:'/',
        name:'login',
        component:Login
      },
      {
        path: '/manage',
        component: Manage,
        children:[{
          path:'/',
          name:'home',
          component:Home
        },
        ...demo
      ]
    }
  ]
})
