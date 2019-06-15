<!--
* 图片循环播放组件
-->
<template>
    <div class="slideBox">
        <div>
            <ul>
                <li v-for="(address,index) in urls" :key="index" :class="{'noactive':nowPic!=index}">
                    <img :src="address" alt="">
                </li>
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
            this.nowPic = incount % this.urls.length;
            console.log(this.nowPic);
            incount++;
            if(incount>100){
                incount=this.urls.length;
            }
        },1500)
    }
}
</script>

<style lang="less" scoped>
.slideBox{ 
    width:100%;
    height:600px; 
    overflow:hidden; 
    position:relative; 
    top:0px;
    .pre{
        position:absolute; 
        left:3%; 
        top:50%; 
        margin-top:-25px; 
        display:block; 
        width:32px; 
        height:40px;
        background:url(./img/arrows.png) -110px 5px no-repeat; 
        filter:alpha(opacity=50);opacity:0.5;   
    }
}
ul{
    list-style: none;
    li{
        margin-left:0;
    }
}
.noactive{
    display:none;
}

</style>