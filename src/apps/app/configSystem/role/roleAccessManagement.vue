<template>
    <div>
        <el-card class="box-card table_container">
            <div slot="header" class="clearfix" v-text="title"></div>
            <!-- gutter:栅格间隔 -->
            <el-row :gutter="10">
                <el-col :span="4" >
                    <div >
                    <el-tree :data="roles" default-expand-all node-key="id" ref="tree" :current-node-key="currentCheckedId"
                        highlight-current  :props="defaultProps" :expand-on-click-node="false" @node-click="changeRoleNode" style="height:100%;"
                    >
                    </el-tree>
                    </div>
                </el-col>
                <el-col :span="20" v-loading="loading">
                    <el-row style="margin-bottom:20px;">
                        <el-button type="primary" @click="onSave">保存</el-button>
                    </el-row>
                    <el-row>
                        <y-treeGrid  :items="modules" :expanded="true" :columns="columns" ref="treeGrid"></y-treeGrid>
                    </el-row>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import {getRolelist,getMenuTree,getMenuTreeByRoleId,saveMenuIdsByRoleId} from '@/api/configSystem.js'
export default {
    data(){
        return {
            title:'角色权限管理',
            roles:[],
            defaultProps:{
                label:'text',
                children:'children'
            },
            modules:[],
            columns:[
                {
                    type:'selection',
                    width:50
                },
                {
                    title: "菜单名称",
                    key: "name",
                    treeField: true,
                    width: 250
                },
                {
                    title: "地址",
                    key: "address",
                    width: 250
                },
                {
                    title: "编码",
                    key: "code",
                    width: 50,
                    align: "center"
                },
                {
                    title: "类型",
                    key: "menuType",
                    width: 50,
                    align: "center"
                },
                {
                    title: "icon",
                    key: "icon",
                    width: 50,
                    align: "center"
                }
            ],
            currentCheckedMenuArr:[],
            currentCheckedId:'',
            loading:false
        }
    },
    created(){
        this.onGetRoles();
        this.onGetMenuTree();
    },
    methods:{
        //初始化获取角色树形列表
        async onGetRoles(){
           let result = await getRolelist();
           if(result && result.state==1){
               let rolesArr=result.result.data;
               for(let r in rolesArr){
                   this.roles.push({
                       id:rolesArr[r].id,
                       text:rolesArr[r].name,
                       children:[]
                   })
               }
           }
        },
        //初始化获取菜单树形列表
        async onGetMenuTree(){
            let result=await getMenuTree();
             if (result.state == 1) {
                this.modules = result.data;
            }else{
                this.modules=[];
                this.$message({
                    message:"数据获取失败",
                    type:'error'
                })
            }
        },
        // 树形节点被点击时的回调,根据角色Id获取已经授权的菜单
        changeRoleNode(data){
            this.loading=true;
            this.currentCheckedId=data.id;
            this.getRolMenu(data.id);
            this.loading=false;
        },
        // 根据角色Id获取已经授权的菜单
        async getRolMenu(roleId){
            let result= await getMenuTreeByRoleId(roleId);
            if(result){
                let data = result.data;
                this.currentCheckedMenuArr=[];
                for(var i in data){
                    this.currentCheckedMenuArr.push(data[i].id);
                    if(data[i].children && data[i].children.length>0){
                        let ids = this.getChildrenIds(data[i].children)
                        this.currentCheckedMenuArr.push(...ids);
                    }
                }

                this.$refs.treeGrid.clearSelection();
                this.$refs.treeGrid.setChecked(this.currentCheckedMenuArr);
                console.log(this.currentCheckedMenuArr);
            }
        },
        getChildrenIds(children){
            let ids=[];
            for(var i in children){
                ids.push(children[i].id);
                console.log(children[i].id);
                if(children[i].children && children[i].children.length>0){
                    let childIds=this.getChildrenIds(children[i].children);
                    ids.push(...childIds);
                }
            }
            return ids;
        },

        onSave(){
            var submitData={
                roleId:this.currentCheckedId,
                menuIds:this.$refs.treeGrid.getChecked()
            }
            saveMenuIdsByRoleId(submitData).then(res=>{
                console.log(res);
                if(res && res.state==1){
                    this.$message({message:'保存成功!',type:'success'});
                    this.$emit('submit-complete',true);
                }else{
                    this.$message({message:'保存失败111！',type:'error'});
                    return;
                }
            }).catch(err=>{
                this.$message({message:'保存失败222！',type:'error'});
                return;
            });

        }


    }

}
</script>

<style lang="less" scoped>
.table_container {
	margin: 10px;
}

.table_buttons {
	margin-bottom: 10px;
}

.table_buttons>.el-col {
	font-size: 0;
}

.r {
	float: right!important;
}
</style>
