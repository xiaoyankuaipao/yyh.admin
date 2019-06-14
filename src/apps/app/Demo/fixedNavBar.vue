<template>
    <div class="demo-fixed-container">
        <div id="topPart">
            这里是顶部位置
        </div>
        <div id="navBar" :class="{isFixed:isTabBar}">
            这里是导航栏，这个demo就是要把我固定
        </div>
        <div id="mainPart">
            <ul>
                <li v-for="index in liCount" :key="index"><a href="#">{{index}}</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            liCount:100,
            isTabBar:false
        }
    },
    methods:{
        handleScroll(){
            //let scrollTop=window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            let scrollTop = document.querySelector(".demo-fixed-container").scrollTop;
            console.log(scrollTop);
            let topBar = document.querySelector("#topPart");
            let navBar = document.querySelector("#navBar");
            let mainPart = document.querySelector("#mainPart");
            if(scrollTop > topBar.offsetHeight){
                this.isTabBar=true;
                mainPart.style.paddingTop=navBar.offsetHeight+"px";
            }else{
                this.isTabBar=false;
                mainPart.style.paddingTop="0px";
            }
        }
    },
    mounted(){
        var dicScroll = document.querySelector(".demo-fixed-container");
        dicScroll.addEventListener('scroll',this.handleScroll);
    },
    destroyed(){
        window.removeEventListener('scroll',this.handleScroll);
    }
}
</script>

<style lang="less" scoped>
.demo-fixed-container{
    width: 100%;
    height: 100%;
    overflow: auto;
}
#topPart{
    width: 100%;
    height: 100px;
    background-color: pink;
}
#navBar{
    width: 100%;
    height: 50px;
    background-color: rgb(50, 64, 86)
}
#mainPart{
    width: 100%;
    ul{
        list-style: none;
        li{
            width: calc(100%-200px);
            height: 40px;
            background-color: orange;
            margin-bottom: 10px;
        }
    }
}
.isFixed{
    position:fixed;
    //top:0px;
    top: 108px;
}
</style>
