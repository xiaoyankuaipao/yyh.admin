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
            <div>
                <!-- 菜单 -->
                <el-menu>

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
            startLoading:false
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
