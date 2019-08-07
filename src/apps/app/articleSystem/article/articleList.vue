<template>
    <div>
        <el-card  class="box-card table-container"  style="margin:10px">
            <div slot="header" class="clearfix" v-text="title"></div>
            <el-row class="table_buttons">
                <el-col :span="10">
                    <el-form :inline="true" :model="searchParams">
                        <el-form-item label="">
                            <el-select  v-model="searchParams.categoryId" placeholder="请选择">
                                <el-option
                                    v-for="item in categoryList"
                                    :key="item.id"
                                    :label="item.category"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click.native="onSearch">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="14" style="margin-bottom:20px;text-align:right;">
                    <el-button-group style="">
                        <el-button type="primary" icon="el-icon-add" @click="onCreate" v-btnhas="article_add">创建</el-button>
                        <el-button type="primary" icon="el-icon-edit" @click="onUpdate" v-btnhas="article_edit">修改</el-button>
                        <el-button type="danger" icon="el-icon-delete" @click="onDelete"  v-btnhas="article_delete">删除</el-button>
                    </el-button-group> 
                </el-col>
            </el-row>
           
             <el-row>
                <y-table ref="tableArticle" :search-api="searchApi" :params="searchParams">
                    <template  slot="columns">
                        <el-table-column type="index" ></el-table-column>
                        <el-table-column prop="title" label="文章名称"></el-table-column>
                        <el-table-column prop="remark" label="摘要"></el-table-column>
                        <el-table-column prop="categoryName" label="分类"></el-table-column>
                        <el-table-column prop="readCount" label="阅读数"></el-table-column>
                        <el-table-column prop="likeCount" label="喜欢数"></el-table-column>
                        <el-table-column prop="createTime" label="最后更新时间"></el-table-column>
                    </template>
                </y-table>
            </el-row>
        </el-card>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false" :size="dialogSize" :fullscreen="true">
            <!-- 渲染一个“元组件”为动态组件。依 is 的值，来决定哪个组件被渲染 -->
            <component :is="dialogType" v-if="dialogVisible" :artilceId="artilceId" @submit-complete="onCloseDialog"></component>
        </el-dialog>

    </div>
</template>

<script>
import addOrupdate from './addOrupdate.vue'
import {getCategoryList,getArticlePageByCategory,deleteArticle} from '@/api/articleSystem.js'
export default {
    data(){
        return {
            title:'文章管理',
            article_add:'article.add',
            article_edit:'article.edit',
            article_delete:'article.delete',
            searchApi:getArticlePageByCategory,
            dialogVisible:false,
            dialogTitle:'',
            dialogType:'addOrupdate',
            dialogSize:'small',
            searchParams:{
                categoryId:0
            },
            categoryList:[],
            selectCategoryId:'',
            artilceId:0
        }
    },
    components:{
        addOrupdate
    },
    created() {
        this.onGetCategoryList();
    },
    methods:{
        async onGetCategoryList(){
            let res = await getCategoryList();
            if(res.state==1){
                this.categoryList=res.result.data;
                this.categoryList.push({
                    id:0,
                    category:'全部'
                })
            }
        },
        //查询
        onSearch(){
            this.$refs.tableArticle.search();
        },
        onCreate(){
            this.dialogTitle="新增文章";
            this.dialogType="addOrupdate",
            this.dialogSize="small",

            this.artilceId=0;

            this.dialogVisible=true;
        },
        onUpdate(){
            var row=this.$refs.tableArticle.getSelectRow();
            if(row){
                this.dialogTitle='修改文章';
                this.dialogType='addOrupdate',
                this.dialogSize='small',
                this.artilceId=row.id,
                this.dialogVisible=true;
            }else{
                this.$message({message:'请选择要修改的数据',type:'warning'});
            }
        },
        onDelete(){
            var row=this.$refs.tableArticle.getSelectRow();
            if(row){
                this.$confirm('确定要删除文章 '+ row.title + ' 吗?','提示').then( () => {
                    this.deleteInfo(row.id);                  
                })
            }else{
                this.$message({message:'请选择要删除的数据',type:'warning'})
            }
        },
        async deleteInfo(id){
            let result = await deleteArticle(id);
            if(result&& result.state==1){
                this.$refs.tableArticle.search();
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
                this.$refs.tableArticle.search();
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>

