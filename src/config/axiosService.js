/**
 * axios 封装
 */

 import axios from 'axios'
 import { getStore } from './mUtils'
 import router from '../router/index'

 const service = axios.create({
     baseURL:'',
     timeout:10*1000
 })

 /**
  * http请求前的拦截
  */
 service.interceptors.request.use(config => {
    config.headers = {
        'Content-type' : 'application/json'
    };
    config.headers.Authorization = getStore('user_token');
    return config;
 },error => {
     return Promise.reject(error);
 });

 /**
  * http请求后的拦截，处理通用异常 401 500 504
  */
 service.interceptors.response.use(response=>{
    return response;
 },error => {
    if(error.response){
        if(error.response.status == 504){
            const result = {
                data:{
                    state:0,
                    error:{
                        message:'网关超时'
                    }
                },
                status:200,
                statusText:"OK",
                headers:error.response.headers,
                config:error.response.config,
                request:error.response.request
            }
            return Promise.resolve(result);
        }else if(error.response.status == 401){
            const result = {
                data:{
                    state:0,
                    error:{
                        message:'尝试未经授权的操作，请先登录',
                    }
                },
                status:200,
                statusText:"OK",
                headers:error.response.headers,
                config:error.response.config,
                request:error.response.request
            }
            router.push('/');
            return Promise.resolve(result);
        }else if(error.response.state == 500){
            const result={
                data:{
                    state:0,
                    message:"服务器异常，请检查数据是否正常"
                },
                status:200,
                statusText:'OK',
                headers:error.response.headers,
                config:error.response.config,
                request:error.response.request
            }
            return Promise.resolve(result);
        }
        else{
            const result={
                data:{
                    state:0,
                    message:"请求失败"
                },
                status:200,
                statusText:'OK',
                headers:error.response.headers,
                config:error.response.config,
                request:error.response.request
            }
            return Promise.resolve(result);
        }
    }else{
        //router.push('/error');
        return Promise.reject(error);
    }
 });

 /**
  * GET 方法
  */
 service.GET = async (url,params) => {
     let result = await service({
         url:url,
         method:'GET',
         params:params,
     });
     return result.data;
 }

 /**
  * POST 方法
  */
 service.POST = async (url,data) => {
     let result = await service({
         url:url,
         method:'POST',
         data
     });
     return result.data;
 }

 /**
  * PUT 方法
  */
 service.PUT = async (url,data) => {
    let result = await service({
        url:url,
        method:'PUT',
        data
    });
    return result.data;
 }

 /**
  * DELETE 方法
  */
 service.DELETE = async (url,data) => {
     let result = await service({
         url:url,
         method:'DELETE',
         data
     });
     return result.data;
 }

 export default service;