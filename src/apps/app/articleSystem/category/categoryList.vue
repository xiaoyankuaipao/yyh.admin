<template>
    <div>
        <el-card  class="box-card table-container"  style="margin:10px">
            <div slot="header" class="clearfix" v-text="title"></div>
            <el-row>
                <el-button-group style="margin-bottom:20px;">
                    <el-button type="primary" icon="el-icon-add" @click="onCreate" v-btnhas="category_add">创建</el-button>
                    <el-button type="primary" icon="el-icon-edit" @click="onUpdate" v-btnhas="category_edit">修改</el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="onDelete"  v-btnhas="category_delete">删除</el-button>
                </el-button-group> 
            </el-row>
            <el-row>
                <y-table ref="tableCategory" :search-api="searchApi">
                    <template  slot="columns">
                        <el-table-column type="index" width="60"></el-table-column>
                        <el-table-column prop="category" label="分类名称"></el-table-column>
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
import {getCategoryList,deleteCategory} from '@/api/articleSystem.js'
import addOrupdate from './addOrupdate.vue'
export default {
    data(){
        return {
            title:'分类管理',
            category_add:'category.add',
            category_edit:'category.edit',
            category_delete:'category.delete',
            searchApi:getCategoryList,
            dialogVisible:false,
            dialogTitle:'',
            formData:{},
            dialogType:'addOrupdate',
            dialogSize:'small',
        }
    },
    components:{
        addOrupdate
    },
    methods:{
        onCreate(){
            this.dialogTitle="新增分类";
            this.dialogType="addOrupdate",
            this.dialogSize="small",
            this.formData={
                category:"",
                id:""
            };
            this.dialogVisible=true;
        },
        onUpdate(){
            var row=this.$refs.tableCategory.getSelectRow();
            if(row){
                this.dialogTitle='修改分类';
                this.dialogType='addOrupdate',
                this.dialogSize='small',
                this.formData={...row};
                this.dialogVisible=true;
            }else{
                this.$message({message:'请选择要修改的数据',type:'warning'});
            }
        },
        onDelete(){
            var row=this.$refs.tableCategory.getSelectRow();
            if(row){
                this.$confirm('确定要删除分类 '+ row.category + ' 吗?','提示').then( () => {
                    this.deleteInfo(row.id);                  
                })
            }else{
                this.$message({message:'请选择要删除的数据',type:'warning'})
            }
        },
        async deleteInfo(id){
            let result = await deleteCategory(id);
            if(result&& result.state==1){
                this.$refs.tableCategory.search();
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
        onCloseDialog(success){
            this.dialogVisible=false;
            if(success){
                this.$refs.tableCategory.search();
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>
