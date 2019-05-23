<template>
    <div class="fillcontain">
        <header>
            <el-row>
                <el-col :span="8">
                    <img class="logo" src="./img/logo.png" alt=""><h1 style="float:left;">XXXX后台管理系统</h1>
                </el-col>
                <el-col :span="12">
                    <nav>
                        <ul class="nav-list">
                            <li  v-for="(value,index) in mainMenus" :key="index" @click="mainMenuClick(index)">
                                {{value}}
                            </li>
                        </ul>
                    </nav>
                </el-col>
                <el-col :span="4">
                    <img src="./img/user.png" style="width:50px;height:50px;margin-top:20px;margin-right:20px;float:right;">
                </el-col>
            </el-row>
        </header>

        <div class="progress">
            <div :class="getProgressClass"></div>
        </div>

        <div class="content">
            <!-- 导航 -->
            <div :class="{'el-col':true,'el-col-4':true,'navigation':true,'collapsed':menuCollapsed}">
                <!-- 菜单 -->
                 <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#324157"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>导航一</span>
                        </template>
                        <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    </el-menu>
                <!-- 收缩按钮 -->
                <div>

                </div>
            </div>
            <!-- 页面内容 -->
            <div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            mainMenus:['菜单一','菜单二','菜单三','菜单四'],
            hasPermission:false,
            startLoading:false,
            menuCollapsed:false
        }
    },
    computed:{
        getProgressClass(){
            return {value:true,loading:this.startLoading,complete:!this.startLoading && this.hasPermission}
        }
    },
    mounted(){
        setTimeout(()=>{this.startLoading=true},0);/* setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式。*/
        setTimeout(()=>{this.startLoading=false;this.hasPermission=true},3000);
    },
    methods:{
        mainMenuClick(index){
            alert(this.mainMenus[index]);
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../../style/common';
@import './style';
</style>
