import demo1 from '../apps/app/Demo/demo1'
import imgLazy from '../apps/app/Demo/imgLazy'
import infiniteScroll from '../apps/app/Demo/infiniteScroll'
import scrollLoad from '../apps/app/Demo/scrollLoad'
import fixedNavBar from '../apps/app/Demo/fixedNavBar'
import picloopdisplay from '../apps/app/Demo/picloopplay'


export default [
    {
        path: "/userListDemo",
        name: "userListDemo",
        component: demo1,
        meta: ["Demo", "用户列表"]
    },
    {
        path:"/imgLazy",
        name:'imgLazy',
        component:imgLazy,
        meta:["组件使用","图片懒加载"]
    },
    {
        path:"/infiniteScroll",
        name:'infiniteScroll',
        component:infiniteScroll,
        meta:["组件使用","无限滚动"]
    },
    {
        path:'/scrollLoad',
        name:'scrollLoad',
        component:scrollLoad,
        meta:["组件使用","滚动加载"]
    },
    {
        path:'/fixedNavBar',
        name:'fixedNavBar',
        component:fixedNavBar,
        meta:['组件使用','固定导航栏']
    },
    {
        path:'/picloopdisplay',
        name:'picloopdisplay',
        component:picloopdisplay,
        meta:['组件使用','自定义的图片轮播组件']
    }
]