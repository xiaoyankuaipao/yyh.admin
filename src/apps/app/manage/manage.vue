<template>
    <div class="fillcontain" >
        <!-- 头部 -->
        <header>
            <el-row>
                <el-col :span="8">
                    <img class="logo" src="./img/logo.png" alt=""><h1 style="float:left;">XXXX后台管理系统</h1>
                </el-col>
                <el-col :span="13">
                    <nav>
                        <ul class="nav-list">
                            <li v-for="(value,index) in mainMenus" :key="index" @click="mainMenuClick(index)" :class="{'active':index==selectMainMenuInex}">
                                {{value}}
                            </li>
                        </ul>
                    </nav>
                </el-col>
                <el-col :span="3">
                    <!-- <img src="./img/user.png" style="width:30px;height:30px;margin-top:15px;margin-right:30px;float:right;"> -->
                    <user-show></user-show>
                </el-col>
            </el-row>
        </header>
        <!-- 进度条 -->
        <div class="progress">
            <div :class="getProgressClass"></div>
        </div>
        <!-- 内容 -->
        <div class="content">
            <!-- 导航 -->
            <div :class="{'el-col':true,'el-col-4':true,'navigation':true,'collapsed':menuCollapsed}">
                <!-- 菜单 -->
                <y-menu :default-active="defaultActive" :data="subMenus"></y-menu>
                <!-- 收缩按钮 -->
                <div class="shrink">
                    <a href="javacript:;" class="collapseBtn" @click="onCollapse">
                        <i :class="{'el-icon-d-arrow-left': !menuCollapsed,'el-icon-d-arrow-right': menuCollapsed }"></i>
                    </a>
                </div>
            </div>
            <!-- 页面内容 -->
            <div :class="{'el-col':true,'el-col-20':!menuCollapsed,'el-col-24':menuCollapsed}">
                <head-top></head-top>
                <div class="manage-body">
                    <keep-alive>
                        <transition name="el-zoom-in-top" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </keep-alive>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headTop from '../../components/headTop'
import userShow from '../../components/usrShow'
import { mapActions, mapState } from 'vuex'
import { getUserMenu,getUserBtn} from '@/api/getData'
import { getStore} from '@/config/mUtils'

export default {
    components:{
        headTop,
        userShow
    },
    data(){
        return{
            mainMenus:['菜单一','菜单二','菜单三','菜单四'],
            selectMainMenuInex:0,
            hasPermission:false,
            startLoading:false,
            menuCollapsed:false,
            /*子菜单，左侧*/
            subMenus: [
                
            ],
        }
    },
    computed:{
        getProgressClass(){
            return {value:true,loading:this.startLoading,complete:!this.startLoading && this.hasPermission}
        },
        defaultActive: function() {
           return this.$route.path;
        },
    },
    async mounted(){
        setTimeout(()=>{this.startLoading=true},0);/* setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式。*/
        //setTimeout(()=>{this.startLoading=false;this.hasPermission=true},2000);
        if(getStore('user_token')){
            await this.getUserData();
            await this.getMenus();
            await this.getBtn();

            this.startLoading=false;
            this.hasPermission=true;
        }else{
            this.$router.push("/");
            this.$message({
                type: "error",
                message: "当前用户未登录，请先登陆"
            });
        }
    },
    methods:{
        ...mapActions(['getUserData','saveUserBtn']),
        mainMenuClick(index){
            this.selectMainMenuInex=index;
            //alert(this.mainMenus[index]);
        },
        onCollapse(){
            this.menuCollapsed=!this.menuCollapsed;
            /*触发window的resize事件*/
			setTimeout('window.$ && window.$(window).trigger("resize")', 500)
        },
        async getMenus() {
            const res = await getUserMenu();
            if (res.state == 1) {
                this.startLoading = false;
                this.subMenus = res.data;
            } else {
                this.$message({
                    type: "err",
                    message: "用户菜单获取失败"
                });
            }
        },
        async getBtn(){
            const res=await getUserBtn();
            if(res.state==1){
                this.saveUserBtn(res.data);
            }else{
                this.$message({
                    type: "err",
                    message: "用户按钮权限获取失败"
                });
            }
        },
        async getMenus() {
            const res = await getUserMenu();
            if (res.state == 1) {
                this.startLoading = false;
                this.subMenus = res.data;
            } else {
                this.$message({
                    type: "err",
                    message: "用户菜单获取失败"
                });
            }
        },
    }
}
</script>

<style lang="less" scoped>
@import '../../../style/common';
@import './style';
</style>
