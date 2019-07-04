//文章管理模块路由
import categoryList from '@/apps/app/articleSystem/category/categoryList'

export default [
    {
        path:'/categoryList',
        name:'categoryList',
        component:categoryList,
        meta:['文章管理','分类管理']
    }
]