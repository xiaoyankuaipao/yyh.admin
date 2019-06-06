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
                {
                    "id": 1,
                    "name": "首页",
                    "code": null,
                    "address": "/manage",
                    "icon": "el-icon-menu",
                    "menuType": 2,
                    "parentId": null,
                    "children": []
                },
                {
                    "id": 2,
                    "name": "组件使用",
                    "code": null,
                    "address": null,
                    "icon": "el-icon-document",
                    "menuType": 1,
                    "parentId": null,
                    "children": [
                        {
                        "id": 11,
                        "name": "图片懒加载",
                        "code": null,
                        "address": "/imgLazy",
                        "icon": null,
                        "menuType": 2,
                        "parentId": 2,
                        "children": []
                        },
                        {
                        "id": 12,
                        "name": "无限滚动",
                        "code": null,
                        "address": "/infiniteScroll",
                        "icon": null,
                        "menuType": 2,
                        "parentId": 2,
                        "children": []
                        },
                        {
                        "id": 13,
                        "name": "滚动加载",
                        "code": null,
                        "address": "/scrollLoad",
                        "icon": null,
                        "menuType": 2,
                        "parentId": 2,
                        "children": []
                        },
                        {
                        "id": 3,
                        "name": "用户列表（demo）",
                        "code": null,
                        "address": "/userListDemo",
                        "icon": null,
                        "menuType": 2,
                        "parentId": 2,
                        "children": []
                        },
                        {
                        "id": 4,
                        "name": "商户列表（demo）",
                        "code": null,
                        "address": "/shopList",
                        "icon": null,
                        "menuType": 2,
                        "parentId": 2,
                        "children": []
                        }
                    ]
                },
                {
                    "id": 5,
                    "name": "系统管理",
                    "code": null,
                    "address": null,
                    "icon": "el-icon-setting",
                    "menuType": 1,
                    "parentId": null,
                    "children": [
                        {
                        "id": 6,
                        "name": "角色管理",
                        "code": null,
                        "address": "/roleList",
                        "icon": null,
                        "menuType": 2,
                        "parentId": 5,
                        "children": []
                        },
                        {
                        "id": 7,
                        "name": "菜单管理",
                        "code": null,
                        "address": "/menuList",
                        "icon": null,
                        "menuType": 2,
                        "parentId": 5,
                        "children": []
                        },
                        {
                        "id": 8,
                        "name": "用户管理",
                        "code": null,
                        "address": "/userList",
                        "icon": null,
                        "menuType": 2,
                        "parentId": 5,
                        "children": []
                        }
                    ]
                },
                {
                    "id": 9,
                    "name": "我的家",
                    "code": null,
                    "address": null,
                    "icon": "el-icon-printer",
                    "menuType": 1,
                    "parentId": null,
                    "children": [
                        {
                        "id": 10,
                        "name": "小公主",
                        "code": null,
                        "address": "/myLittlePrincess",
                        "icon": null,
                        "menuType": 2,
                        "parentId": 9,
                        "children": []
                        }
                    ]
                }
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
            //await this.getMenus();
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
