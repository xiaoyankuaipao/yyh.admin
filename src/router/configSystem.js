//系统管理模块路由
import userList from '@/apps/app/configSystem/user/userList'
import menuList from "@/apps/app/configSystem/menu/menuList"
import roleList from "@/apps/app/configSystem/role/roleList"

export default [
    {
        path:'/userList',
        name:'userList',
        component:userList,
        meta:['系统管理','用户管理']
    },
    {
        path: "/menuList",
        name: "menuList",
        component: menuList,
        meta: ["系统管理", "菜单列表"]
    },
    {
        path:"/roleList",
        name:"roleList",
        component:roleList,
        meta:["系统管理","角色列表"]
    },
]