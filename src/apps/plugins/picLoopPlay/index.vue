<!--
* 图片循环播放组件
-->
<template>
    <div class="slideBox">
        <img  v-for="(address,index) in urls " :key="index" :src="address" :class="changePicShowClass(index)" >
        <a class="prev" href="javascript:void(0)" @click="prev"></a>
        <a class="next" href="javascript:void(0)" @click="next"></a>
        <ul>
            <li v-for="(address,index) in urls" :key="index">
                <div @click="onClickCircle(index)" :class="{'normal': index != nowPic,'click': index == nowPic}"></div>
            </li>
        </ul>
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
            /**当前图片索引 */
            nowPic:0,
            /**上一张图片索引 */
            lastPicIndex:-1
        }
    },
    computed:{
        changePicShowClass(){
            return function(index){
                return { beginShow: index == this.nowPic, beginHide: index == this.lastPicIndex || index != this.nowPic}
            }
        }
    },
    mounted(){
        setInterval(() => {
            this.next();
        },5000)
    },
    methods:{
        /**上一张 */
        prev(){
            this.lastPicIndex = this.nowPic;
            if(this.nowPic == 0){
                this.nowPic = this.urls.length - 1;
            }
            else{
                this.nowPic --;
            }
        },
        /**下一张 */
        next(){
            this.lastPicIndex = this.nowPic;
            if(this.nowPic == this.urls.length - 1){
                this.nowPic = 0;
            }else{
                this.nowPic ++;
            }
        },
        /**点击小圆圈 */
        onClickCircle(index){
            this.lastPicIndex = this.index;
            this.nowPic = index;
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
    img{
        position:absolute;
        left: 0;
        top:0;
        width:100%;
        height:100%;
        transition: opacity 2s
    }
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
    .beginShow{
        opacity: 1;
    }
    .beginHide{
        opacity: 0;
    }
    ul{
        list-style: none;
        z-index: 999;
        position: absolute;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 50px;
        bottom: 0px;
        text-align: center;
        line-height: 50px;
        li{
            display: inline-block;
            color: red;
            width: 30px;
            div{
                width:10px;
                height:10px;
                border-radius: 50%;
                cursor: pointer;
                &.normal{
                    background: #CD3700; 
                }
                &.click{
                    background: #FFF959;
                }
            }
        }
    }
}
</style>