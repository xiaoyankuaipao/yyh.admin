import axiosService from '../config/axiosService'

///////////////////////////////菜单管理//////////////////////////////////////
/*
 * 获取菜单树列表
 */
export const getMenuTree=()=>axiosService.GET('/api/systemmanageservice/menu/GetMenuTree')

/**
 * 获取菜单ComboxTree
 */
export const getMenuComboxTree=()=>axiosService.GET('/api/systemmanageservice/menu/GetMenuComboxTree')

/**
 * 添加菜单
 */
export const addMenu=data=>axiosService.POST('/api/systemmanageservice/menu',data)

/**
 * 修改菜单
 */
export const updateMenu=data=>axiosService.PUT('/api/systemmanageservice/menu',data)

/**
 * 删除菜单
 */
export const deleteMenu= data =>axiosService.DELETE('/api/systemmanageservice/menu/'+data)


/////////////////////////////角色管理////////////////////////////////////////////////////////////
/**
 * 获取角色列表
 */
export const getRolelist=() => axiosService.GET('/api/systemmanageservice/role/GetRoleList')

/**
 * 
 * 根据角色ID查询角色信息
 */
export const getRoleById = data => axiosService.GET('/api/systemmanageservice/role/GetRoleById/'+data)

/**
 * 
 * 添加或者修改角色 
 */
export const addOrUpdateRole = data => axiosService.POST('/api/systemmanageservice/role/',data)

/**
 * 
 * 删除角色
 */
export const deleteRole = data => axiosService.DELETE('/api/systemmanageservice/role/'+data)


//////////////////////////角色-菜单管理///////////////////////////////////////////////////////////////
/**
 * 
 * 根据角色ID获取菜单树
 */
export const getMenuTreeByRoleId=data => axiosService.GET('/api/systemmanageservice/Menu/GetMenuTreeByRoleId/'+data)

/**
 * 
 * 根据角色Id保存该角色具有的菜单的Ids
 */
export const saveMenuIdsByRoleId=data=>axiosService.POST('/api/systemmanageservice/rolemenu/'+data.roleId,data.menuIds)

//////////////////////////用户管理///////////////////////////////////////////////////////////////
/**
 * 
 * 获取用户分页列表 
 */
export const getUserListByPage=data=>axiosService.GET('/api/systemmanageservice/User/GetUserList',data);

/**
 * 
 * 添加或者修改用户
 */
export const addOrupdateUser=data=>axiosService.POST('/api/systemmanageservice/User',data);

/**
 * 
 * 删除用户
 */
export const deleteUser=data=>axiosService.DELETE('/api/systemmanageservice/User/'+data);

/**
 * 
 * 设置用户角色
 */
export const setUserRole=data=>axiosService.GET('/api/systemmanageservice/User/SetUserRole?userId='+data.userId+'&roleId='+data.roleId)