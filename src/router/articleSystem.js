//文章管理模块路由
import categoryList from '@/apps/app/articleSystem/category/categoryList'
import articleList from '@/apps/app/articleSystem/article/articleList'

export default [
  {
    path: "/categoryList",
    name: "categoryList",
    component: categoryList,
    meta: ["文章管理", "分类管理"]
  },
  {
    path: "/articleList",
    name:"articleList",
    component:articleList,
    meta: ["文章管理", "文章管理"]
  }
];