<template>
    <div class="demo-scroll-container">
        <ul v-infinite-scroll="load" infinite-scroll-disabled="disabled" infinite-scroll-immediate="true">
            <li v-for="i in count" class="infinite-list-item" :key="i">
                <a href="#">{{i}}</a>
            </li>
        </ul>
        <p v-if="loading">拼命加载中...</p>
        <p v-if="noMore">我也是有底线滴!!!</p>

        <!-- el-backtop 是 element-ui 提供的 回到顶部 组件,版本 2.9.1 中加入   -->
        <el-backtop target=".demo-scroll-container"></el-backtop>
    </div>
</template>

<script>
export default {
    data () {
      return {
        count: 10,
        loading:false
      }
    },
    computed:{
        noMore(){
            return this.count>=100;
        },
        disabled(){
            return this.loading || this.noMore
        }
    },
    methods: {
      load () {
        this.loading =true;
        setTimeout(()=>{
            this.count+=5;
            this.loading=false;
        },1000)
      }
    }
}
</script>

<style lang="less" scoped>
.demo-scroll-container{
    width: 100%;
    height: 100%;
    overflow: auto;
    ul{
        list-style: none;
    }
    a{
        background-color: aqua;
        display: block;
        height: 50px;
        line-height: 50px;
        margin: 10px auto;
        margin-left: -25px;
        margin-right: 10px;
        text-decoration: none;
        text-align: center;
    }
    p{
        text-align: center
    }
}
</style>
