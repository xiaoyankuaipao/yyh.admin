<template>
    <div class="container">
        <div class="commands">
            <!-- command:点击菜单项触发的事件回调 -->
            <el-dropdown @command="handleCommand" menu-align="start">
                <div class="aaa" style="height:60px;width:auto">
                    <img :src="img.user">
                    <span>&nbsp;{{userName}}</span>
                </div>
                
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="home">首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</el-dropdown-item>
                    <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
                    <el-dropdown-item command="signout">退&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <!-- 修改密码对话框 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" size="tiny"></el-dialog>

    </div>
</template>

<script>
import { mapActions, mapState} from 'vuex'
export default {
    data(){
        return {
            img:{
                user:require('./img/user.png')
            },
            dialogTitle: "修改密码",
            dialogVisible: false
        }
    },
    computed:{
        ...mapState(['adminInfo']),
        userName(){
            return this.adminInfo.realName
        }
    },
    methods:{
        async handleCommand(command){
            if(command == 'home'){
                this.$router.push('/manage')
            }else if(command == 'changePwd'){
                //this.dialogVisible = true
                alert('开发中……')
            }else if(command == 'signout'){
                this.$removeAllStore()
                this.$router.push('/')
            }
        }
    }

}
</script>

<style lang="less" scoped>
.container {
  height: 60px;
  margin-top: 0px;
  display: flex;
  padding-left: 20px;
  img{
      margin-top: 10px;
  }
  span{
      line-height: 60px;
      color: white;
      float: right;
  }
}
</style>
