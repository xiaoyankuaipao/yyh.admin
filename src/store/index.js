import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo } from '@/api/getData'
import { getStore,setStore } from '@/config/mUtils'

Vue.use(Vuex)

const state = {
    user_token : getStore('user_token'),
    adminInfo : {}
}

const actions = {
    //保存用户token
    saveUserToken({commit},token){
        commit('saveToken',token)
    },
    //保存用户btn权限
    saveUserBtn({commit},btnStr){
        commit('saveBtn',btnStr)
    },
    //获取用户信息
    async getUserData({commit}){
        try{
            const res = await getUserInfo()
            if(res.state == 1){
                commit('saveUserData',res.data)
            }else{
                commit('saveUserData',null)
            }
        }catch(err){

        }
    }
}

const mutations = {
    saveToken(state,token){
        var user_token = 'Bearer ' + token
        setStore('user_token',user_token)
        state.user_token = user_token
    },
    saveBtn(state,btnStr){
        setStore('btnpermissions',btnStr)
    },
    saveUserData(state,userData){
        state.adminInfo = userData
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations
})