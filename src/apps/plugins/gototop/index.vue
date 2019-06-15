<!--
* 回到顶部组件
* author:ycp
* Date:2019-06-15
-->
<template>
    <div class="goto-top-box" >
        <img src="./img/up.png"  @click="goToTop">
    </div>
</template>

<script>
export default {
    name:'y-gototop',
    props:{
        /**滚动目标，可以是Id选择器或者是类选择器 */
        target:{
            type:String,
            default:'',
            required:false
        }
    },
    methods:{
        goToTop(){
            let target;
            if(this.target==''){
                target = window
            }else{
                target = document.querySelector(this.target)
            }
            var scrollTop = target.scrollTop
            var jumpPx = scrollTop / 100
            var sh = setInterval(()=>{
                scrollTop = scrollTop - jumpPx;
                target.scrollTop = scrollTop - jumpPx;
                if(scrollTop < jumpPx){
                    clearInterval(sh);
                }
            },5);
        }
    },
    mounted(){
        let target;
        if(this.target==''){
            target = window
        }else{
            target = document.querySelector(this.target)
        }

        target.onscroll = function(){
            const scrollTop = target.scrollTop
            const goTop=document.querySelector('.goto-top-box')
            if(scrollTop>200){
                goTop.style.display='block';
            }else{
                goTop.style.display='none'
            }
        }
    }
}


</script>

<style lang="less" scoped>
.goto-top-box{
    display: none;
    position: fixed;
    bottom: 50px;
    right: 50px;
    background-color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    &:hover{
        background-color:#C0C4CC;
    }
    img{
        position:relative;
        top:50%; 
        left:50%;
        transform: translate(-50%,-50%);
        width: 100%; 
        height: 100%;
    }
}

</style>
