import Vue from 'vue'
import Router from 'vue-router'
import error from '../apps/app/error/error'
import Login from '../apps/app/login/login'
import Manage from '../apps/app/manage/manage'
import myFamily from "./myFamily.js";
import Home from '../apps/app/home/home'

import demo from './demo.js'


import ConfigSystemRoute from './configSystem'

import {getStore} from '../config/mUtils'
Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: [
      {
        path:'/',
        name:'login',
        component:Login
      },
      {
        path:'/error',
        name:'error',
        component:error
      },
      {
        path: '/manage',
        component: Manage,
        meta:{
          requireAuth:true
        },
        children:[{
          path:'/',
          name:'home',
          component:Home
        },
        ...demo,
        ...ConfigSystemRoute,
        ...myFamily
      ]
    }
  ]
})

/**
 * 路由拦截钩子函数
 */
router.beforeEach((to,from,next) => {
  if(to.matched.some(res=>res.meta.requireAuth)){
    if(getStore('user_token')){
      next()
    }else{
      next({
        path:'/'
      })
    }
  }else{
    next();
  }
})

export default router;