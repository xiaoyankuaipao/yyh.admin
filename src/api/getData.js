import axiosService from '../config/axiosService'

/**
 * 登录
 */
export const login = (data) => axiosService.POST('/api/identityservice/Login/RequestToken',data);