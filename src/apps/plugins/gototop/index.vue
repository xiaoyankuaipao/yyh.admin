<!--
* 回到顶部组件
* author:ycp
* Date:2019-06-15
-->
<template>
    <div class="goto-top-box" @click="goToTop">
        <!-- <img src="./img/up.png"  @click="goToTop"> -->
        <i class="iconfont icon-arrowup"></i>
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
            var scrollTop =  target.pageYOffset || target.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;

            var jumpPx = scrollTop / 100
            var sh = setInterval(()=>{
                scrollTop = scrollTop - jumpPx;
                if(this.target == ''){
                    document.documentElement.scrollTop=scrollTop - jumpPx;
                     
                }else{
                    target.scrollTop = scrollTop - jumpPx;
                }
               
                
                if(scrollTop < jumpPx){
                    clearInterval(sh);
                }
            },5);
        }
    },
    mounted(){
        let target;
        if(!this.target || this.target == ''){
            target = window
        }else{
            target = document.querySelector(this.target)
        }

        target.onscroll = function(){
            const scrollTop = target.scrollTop || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
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
    width: 50px;
    height: 50px;
    right: 2em;
    bottom: 4em;
    text-align: center;
    background: #2a3c40;
    background-size: 200% auto;
    border-radius: 50%;
    cursor: pointer;
    opacity: 1;
    z-index: 1000;
    &:hover{
        background: linear-gradient(top right,#161f21 35%,#2a3c40 100%)
    }
    i{
        display: inline-block;
        line-height: 50px;
        font-size:25px; 
         color: #fff;
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
