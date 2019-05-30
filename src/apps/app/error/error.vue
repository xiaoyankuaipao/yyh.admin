<template>
    <div style="width:100%;height:100%;background-color:white;">
        <div style="height:100px;"></div>
        <div class="errorPage_container">
            <el-button class="back_btn" icon='el-icon-arrow-left' @click="back">返回</el-button>
            <el-row>
                <el-col :span="12">
                    <h1 class="text-jumbo">Oops!</h1>
                    <h2 style="color: #484848;">好像出现了点问题,也许你可能想这样：</h2>
                    <ul class="list-unstyled">
                        <li class="link-type">
                            <router-link to="/manage" >返回首页</router-link>
                        </li>
                        <li class="link-type"><a href="http://www.ifeng.com/">随便逛一下</a></li>
                        <li><a href="#" @click.prevent="dialogVisible=true">点我看图</a></li>
                    </ul>
                </el-col>
                <el-col :span="12">
                    <img :src="errGif" alt="Girl has dropped her ice cream." width="313" height="428">
                </el-col>
            </el-row>
            <el-dialog title="随便看" :visible.sync="dialogVisible" size="large">
                    <img v-img:v="{thumbnails:true}" class="pan-img" :src="ewizardClap">
                <!-- <el-img v-img:v="{thumbnails:true}" class="pan-img" :src="ewizardClap"></el-img> -->
            </el-dialog>
        </div>
    </div>
</template>

<script>
import errGif from './img/401.gif'
export default {
    data(){
        return {
            errGif:errGif+"?"+new Date(),
            //ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
            ewizardClap:'http://hbimg.b0.upaiyun.com/f8b28a79d598c9a7597a5bec93cf64b8e2f5589435839-ejtiMv_fw658',
            dialogVisible: false
        }
    },
    methods:{
        back(){
            if(this.$route.query.noGoBack){
                this.$router.push({path:'/manage'});
            }else{
                this.$router.go(-1);
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .errorPage_container{
        width: 800px;
        margin:  auto;
        background-color: white;
        .back_btn{
            background: #008489;
            color: #fff;
        }
        .pan-img{
            margin: 0 auto;
            width: 100%;
            height: auto;
        }
        .text-jumbo {
            font-size: 60px;
            font-weight: 700;
            color: #484848;
        }
        .list-unstyled{
            font-size: 14p;
            li {
                padding-bottom: 5px;
            }
            a{
                color: #008489;
                text-decoration: none;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }
</style>
