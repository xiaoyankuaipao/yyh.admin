<template>
    <div class="headtop">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{path:'/manage'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
.headtop{
    background-color:  #EFF2F7;
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>
