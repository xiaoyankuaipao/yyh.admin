import demo1 from '../apps/app/Demo/demo1'
import imgLazy from '../apps/app/Demo/imgLazy'


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
    }
]