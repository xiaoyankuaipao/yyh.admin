import Vue from 'vue'
import Router from 'vue-router'
import Manage from '../apps/app/manage/manage'
import Home from '../apps/app/home/home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Manage',
      component: Manage,
      children:[{
        path:'/',
        name:'home',
        component:Home
      }]
    }
  ]
})
