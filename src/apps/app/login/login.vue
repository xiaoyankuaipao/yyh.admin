<template>
    <div class="login_page fillcontain">
        <transition name="form-fade" mode="in-out" >
            <section class="form_container"  v-show="showLogin">
                <div class="logo">
                    <img src="./img/logo.png" style="width:80px;height:80px;" />
                    <span>XXX后台管理系统</span>
                </div>
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForm">
                    <el-form-item prop="userName">
                        <el-input v-model="loginForm.userName" auto-complete="off" :prefix-icon="userNameIcon"   placeholder="| 请输入用户名" @focus="userFocusHandle(true)" @blur="userFocusHandle(false)" @keyup.enter.native="submitForm('loginForm')"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="loginForm.password" :prefix-icon="passwordIcon"  placeholder="| 请输入密码" @focus="passwordFocusHandle(true)" @blur="passwordFocusHandle(false)" @keyup.enter.native="submitForm('loginForm')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="submit_btn" @click="submitForm('loginForm')">登录</el-button>
                    </el-form-item>
                </el-form>
            </section>
        </transition>
    </div>
</template>

<script>
import {login} from '@/api/getData'
export default {
    data(){
        return {
            userNameFocus:false,
            passwordFocus:false,
            showLogin:false,
            loginForm:{
                userName:'',
                password:''
            },
            rules:{
                userName:[
                    {required:true,message:'请输入用户名',trigger:'blur'},
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:'blur'}
                ]
            },
            loading:false
        }
    },
    mounted(){
        this.showLogin=true;
    },
    computed:{
        userNameIcon(){
            return  this.userNameFocus ? 'blank iconfont icon-account focus' :'blank iconfont icon-account';
        },
        passwordIcon(){
            return this.passwordFocus ? 'blank iconfont icon-lock focus' : 'blank iconfont icon-lock';
        }
    },
    methods:{
        userFocusHandle(isFocus){
            this.userNameFocus=isFocus;
        },
        passwordFocusHandle(isFocus){
            this.passwordFocus=isFocus;
        },
        async submitForm(formName){
            this.$refs[formName].validate(async (valid) => {
                if(valid){
                    this.loading=true
                    let res = await login({userName:this.loginForm.userName,password:this.loginForm.password,clientId:'SpaClient'});
                    if(res.state == 1 && res.token){
                        this.$message({
                            type:'success',
                            message:'登录成功'
                        });
                        this.$router.push('manage');
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.error && res.error.message || '用户名或密码错误'
                        });
                        this.loading = false
                    }
                }else{
                     this.$notify.error({
                        title: '错误',
                        message: '请输入正确的用户名密码',
                        offset: 100
                    });
                    return false;
                }
            })
        }
    }
}
</script>


<style lang="less">
// elementui+vue项目中，在当前vue文件中使用style scoped包裹的样式中重置input框的样式无法生效
// 方式：在本页面重新定义style样式且不需要写scoped即可生效
@import '../../../style/common';
@import '../../../style/mixin';
@import 'style';
</style>




