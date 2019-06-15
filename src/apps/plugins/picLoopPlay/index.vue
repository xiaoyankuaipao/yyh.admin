<!--
* 图片循环播放组件
-->
<template>
    <div>
        <div>
            <ul>
                <li v-for="(address,index) in urls" :key="index" :class="{'active':nowPic==index}">
                    <img :src="address" alt="">
                </li>
                <!-- <img v-for="(url,index) in urls" :key="index" :src="url"> -->
            </ul>
        </div>
        <a class="prev" href="javascript:void(0)"></a>
        <a class="next" href="javascript:void(0)"></a>
    </div>
</template>

<script>
export default {
    name:'y-picloopplay',
    props:{
        urls:{
            type:Array,
            default(){
                return []
            },
            required:true
        }
    },
    data(){
        return {
            nowPic:0
        }
    },
    mounted(){
        var incount=this.urls.length;
        setInterval(()=>{
            this.nowPic = incount/this.urls.length;
            incount++;
        },500)
    }
}
</script>

<style lang="less" scoped>
ul{
    list-style: none;
}
.active{
    display:none;
}

</style>