import demo1 from '../apps/app/Demo/demo1'
import imgLazy from '../apps/app/Demo/imgLazy'
import infiniteScroll from '../apps/app/Demo/infiniteScroll'
import scrollLoad from '../apps/app/Demo/scrollLoad'


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
    }
]