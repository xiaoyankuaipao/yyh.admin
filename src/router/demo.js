import demo1 from '../apps/app/Demo/demo1'
import imgLazy from '../apps/app/Demo/imgLazy'
import infiniteScroll from '../apps/app/Demo/infiniteScroll'


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
        meta:["Demo","图片懒加载"]
    },
    {
        path:"/infiniteScroll",
        name:'infiniteScroll',
        component:infiniteScroll,
        meta:["Demo","无限滚动"]
    }
]