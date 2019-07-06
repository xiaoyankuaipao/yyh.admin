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
export const getCategoryList = ()=> axiosService.GET('/api/articlemanage/ArticleCategoty/GetArticleCategoryList')


//////////////////////文章Tag///////////////////////////////////////

export const getAllTag = () => axiosService.GET('/api/articlemanage/ArticleTag/GetAllTagList')

////////////////////////文章管理//////////////////////////////////
/**
 * 添加文章
 */
export const addArticle = data => axiosService.POST('/api/articlemanage/Artilce/AddArticle',data)

/**
 * 编辑文章
 */
export const editArticle = data => axiosService.PUT('/api/articlemanage/Artilce/EditArticle',data)

/**
 * 删除文章
 */
export const deleteArticle = data => axiosService.DELETE('/api/articlemanage/Artilce/DeleteArticle/' + data)

/**
 * 统计每种分类下的文章数
 */
export const getArticleCoutGroupByCategory = () => axiosService.GET('/api/articlemanage/Artilce/GetArticleStaticCountByCategory')

/**
 * 根据文章分类分页获取文章
 */
export const getArticlePageByCategory = data => axiosService.GET('/api/articlemanage/Artilce/GetArticlePageByCategory',data)

/**
 * 统计每个Tag下的文章数
 */
export const getArtilceCountGroupByTag = () => axiosService.GET('/api/articlemanage/Artilce/GetArticleStaticCountByTag')

/**
 * 根据文章Tag分页获取文章
 */
export const getArticlePageByTag = () => axiosService.GET('/api/articlemanage/Artilce/GetArticlePageByTag')

/**
 * 根据文章Id获取文章的详细信息
 */
export const getArticleById = data => axiosService.GET('/api/articlemanage/Artilce/GetArticleById/' + data)