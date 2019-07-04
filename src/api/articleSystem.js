import axiosService from '../config/axiosService'

/////////////////////文章分类管理//////////////////////////////////
/**
 * 添加或者修改文章分类
 */
export const addOrUpdateCategory = data => axiosService.POST('/api/articlemanage/ArticleCategoty',data)

/**
 * 删除文章分类
 */
export const deleteCategory = data => axiosService.DELETE('/api/articlemanage/ArticleCategoty/' + data)

/**
 * 获取文章分类列表
 */
export const getCategoryList = axiosService.GET('/api/articlemanage/ArticleCategoty/GetArticleCategoryList')