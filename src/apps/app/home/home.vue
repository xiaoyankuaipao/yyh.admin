<template>
    <div>
        <el-card class="box-card table_container">
            <div slot="header" class="clearfix" v-text="title"></div>
            <el-row style="margin-bottom:20px;">
                <el-button-group>
                    <el-button type="primary" @click="onCreate" icon="el-icon-add" >添加用户</el-button>
                    <el-button type="primary" @click="onEdit" icon="el-icon-edit" >修改用户</el-button>
                    <el-button type="danger" @click="onDelete" icon="el-icon-delete" >删除用户</el-button>
                </el-button-group>
            </el-row>
        </el-card>
        <el-dialog>

        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            searchField:'username',
            searchLabel:'输入用户名称',
            title:'用户信息列表',
            //searchApi:getUserPage,
            dialogVisible:false,
            dialogTitle:'修改用户信息列表',
            formData:{},
            loading:false,
            dialogType:'addOrUpdatePage',
            userDemo_add:'userDemo.add',
            userDemo_edit:'userDemo.edit',
            userDemo_delete:'userDemo.delete'
        }
    },
    components:{
    },
    methods:{
        onCreate(){

        },
        onEdit(){

        },
        onDelete(){
        },
        onCloseDialog(success){

        }

    }
}
</script>

<style>
.el-button+.el-button {
    margin-left: 5px;
}

.table_container{
    margin: 10px;
}
</style>

