<template>
    <div>
        <el-card class="box-card table-container"  style="margin:10px">
            <div slot="header" class="clearfix" v-text="title"></div>
            <el-row>
                <el-button-group style="margin-bottom:20px;">
                    <el-button type="primary" icon="el-icon-add" @click="onCreate" v-btnhas="role_add">创建</el-button>
                    <el-button type="primary" icon="el-icon-edit" @click="onUpdate" v-btnhas="role_edit">修改</el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="onDelete"  v-btnhas="role_delete">删除</el-button>
                    <el-button type="default" icon="el-icon-edit-outline" @click="onRoleAccessManagement" v-btnhas="role_accessMenu">角色权限管理</el-button>
                </el-button-group> 
            </el-row>
            <el-row>
                <y-table ref="tableRole" :search-api="searchApi">
                    <template slot="columns">
                        <el-table-column type="index" width="60"></el-table-column>
                        <el-table-column prop="name" label="角色名称"></el-table-column>
                        <el-table-column prop="displayName" label="角色显示名称"></el-table-column>
                    </template>
                </y-table>
            </el-row>
        </el-card>

        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false" :size="dialogSize">
            <!-- 渲染一个“元组件”为动态组件。依 is 的值，来决定哪个组件被渲染 -->
            <component :is="dialogType" v-if="dialogVisible" :formData="formData" @submit-complete="onCloseDialog"></component>
        </el-dialog>
    </div>
</template>

<script>
import addOrupdate from './addOrupdate.vue'
import roleAccessManagement from './roleAccessManagement.vue'
import {getRolelist,deleteRole} from '@/api/configSystem.js'
export default {
    data(){
        return {
            loading:false,
            title:'角色管理',
            searchApi:getRolelist,
            dialogVisible:false,
            dialogTitle:'',
            formData:{},
            dialogType:'addOrupdate',
            dialogSize:'small',
            role_add:'role.add',
            role_edit:'role.edit',
            role_delete:'role.delete',
            role_accessMenu:'role.accessMenu'
        };
    },
    components:{
        addOrupdate,
        roleAccessManagement
    },
    created(){
    },
    methods:{
        // 添加角色
        onCreate(){
            this.dialogTitle="新增角色";
            this.dialogType="addOrupdate",
            this.dialogSize="small",
            this.formData={
                name:'',
                diaplayName:'',
                id:""
            };
            this.dialogVisible=true;
        },
        //修改角色
        onUpdate(){
            var row=this.$refs.tableRole.getSelectRow();
            if(row){
                this.dialogTitle='修改角色';
                this.dialogType='addOrupdate',
                this.dialogSize='small',
                this.formData={...row};
                this.dialogVisible=true;
            }else{
                this.$message({message:'请选择要修改的数据',type:'warning'});
            }
        },
        //删除角色
        onDelete(){
            var row=this.$refs.tableRole.getSelectRow();
            if(row){
                this.$confirm('确定要删除角色 '+ row.displayName + ' 吗?','提示').then( () => {
                    this.deleteInfo(row.id);                  
                })
            }else{
                this.$message({message:'请选择要删除的数据',type:'warning'})
            }
        },
        async deleteInfo(id){
            let result=await deleteRole(id);
            if(result&& result.state==1){
                this.$refs.tableRole.search();
                this.$message({
                    type:'success',
                    message:'删除成功'
                })
            }else{
                this.$message({
                    type:'error',
                    message:'删除失败'
                })
            }
        },

        //角色权限管理
        onRoleAccessManagement(){
            this.dialogTitle='角色权限管理';
            this.dialogType='roleAccessManagement',
            this.dialogSize='large';
            this.dialogVisible=true;
        },

        //Dialog关闭
        onCloseDialog(success){
            this.loading=false;
            this.dialogVisible=false;
            if(success){
                this.$refs.tableRole.search();
            }
        }
    }

}
</script>

<style lang="less">
	.el-dialog{
		min-height: 355px;
	}
</style>
