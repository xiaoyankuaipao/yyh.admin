<!--
* 图片循环播放组件
-->
<template>
    <div class="slideBox">
        <!-- <div class="bd">
            <ul>
                <li v-for="(address,index) in urls" :key="index" :class="{'noactive':nowPic!=index}">
                    <img :src="address" alt="" style="width:100%;height:100%;">
                </li>
            </ul>
        </div> -->
        <img  v-for="(address,index) in urls " :key="index" :src="address"  v-show="index==nowPic"
         style="width:100%;height:100%;">
        <a class="prev" href="javascript:void(0)" @click="prev"></a>
        <a class="next" href="javascript:void(0)" @click="next"></a>
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
            incount++;
            if(incount>100){
                incount=this.urls.length;
            }
        },2000)
    },
    methods:{
        prev(){

        },
        next(){

        }
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
    .prev{
        position:absolute; 
        left:3%; 
        top:50%; 
        margin-top:-25px; 
        display:block; 
        width:32px; 
        height:40px;
        background:url(./img/slider-arrow.png) -110px 5px no-repeat; 
        opacity:0.5; 
        &:hover{
            opacity:1;
        }
    };
    .next{
        position:absolute; 
        right:3%; 
        top:50%; 
        margin-top:-25px; 
        display:block; 
        width:32px; 
        height:40px;
        background:url(./img/slider-arrow.png) 0px 5px no-repeat; 
        opacity:0.5; 
        &:hover{
            opacity:1;
        }
    }
}

.noactive{
    //display:none;
    //transition: opacity ;
}

.whenshow{
    //完全不透明
    opacity: 1;
}

.whenhide{
    //完全透明
    opacity: 0;
    transition: all 1s;
}

.change{
    opacity: 1;
    .value{
        opacity: 1;
        transition: all 1s;
        &.show{
            opacity: 1;
        }
        &.hide{
            opacity: 0;
        }
    }
}

</style>