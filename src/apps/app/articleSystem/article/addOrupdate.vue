<template>
    <el-form :model="formData" ref="form" label-width="120px">
        <el-row>
            <el-col :span="12">
                <el-form-item  label="文章名称" prop="title">
                    <el-input v-model="formData.title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                 <el-form-item label="文章分类" >
                    <el-select  v-model="formData.categoryId" placeholder="请选择">
                        <el-option
                            v-for="item in categoryList"
                            :key="item.id"
                            :label="item.category"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        
        <el-row>
            <el-col :span="12">
                 <el-form-item label="摘要">
                    <el-input v-model="formData.remark"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="文章标签">
                    <el-select v-model="selectTags" multiple placeholder="请选择" :disabled="artilceId!=0">
                        <el-option
                            v-for="item in tagList"
                            :key="item.id"
                            :label="item.tag"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>


        <el-form-item label="文章内容">
            <!-- <el-input v-model="formData.content"></el-input> -->
            <mavon-editor v-model="formData.value"  @save="saveContent" @imgAdd="uploadImg" ref="md"></mavon-editor>
        </el-form-item>

        <el-form-item>
            <el-button style="float:right"  type="primary" @click="onSubmit">提交</el-button>
            <el-button style="float:right;margin-right:20px;" @click="onCancle">返回</el-button>
        </el-form-item>

    </el-form>
</template>

<script>
import axios from 'axios'
import {uploadPicture} from '@/api/articleSystem.js'
import {addArticle,editArticle,getCategoryList,getArticleById,getAllTag} from '@/api/articleSystem.js'
export default {
    props:{
        artilceId:{
            type:String,
            default(){
                return ""
            }
        }
    },
    data(){
        return {
            formData:{
                id:"",
                title:'',
                categoryId:'',
                content:'',
                value:'',
                remark:''
            },
            categoryList:[],
            tagList:[],
            selectTags:[]
        }
    },
    created() {
        this.onGetCategoryList();
        this.onGetTagList();
        if(this.artilceId!=0){
            this.getArticle(this.artilceId);
        }
    },
    methods: {
        saveContent(value,render){
            this.formData.content=render;
            this.formData.value=value;
        },
        async uploadImg(pos,file){
            var formData=new FormData();
            formData.append('image',file);

            var res = await uploadPicture(formData);
            if(res.state==1){
                var urls=JSON.parse(res.message);
                if(urls.length>0){
                    var url=urls[0];
                    console.log(url);
                    this.$refs.md.$img2Url(pos, url);
                }
            }

            // axios({
            //     url:'/api/articlemanage/Picture',
            //     method:'post',
            //     data:formData,
            //     // headers:{'Content-Type': 'multipart/form-data'}
            // }).then((res)=>{
            //     if(res.data!=null && res.data.state==1){
            //         var urls=JSON.parse(res.data.message);
            //         if(urls.length>0){
            //             var url=urls[0];
            //             console.log(url);
            //             this.$refs.md.$img2Url(pos, url);
            //         }
            //     }
            // }).catch((err)=>{
            //     console.log(err);
            // })
        },

        async onGetCategoryList(){
            let res = await getCategoryList();
            if(res.state==1){
                this.categoryList=res.result.data;
            }
        },
        async onGetTagList(){
            let res = await getAllTag();
            if(res.state==1){
                this.tagList=res.data;
            }
        },
        async getArticle(id){
            let res = await getArticleById(id);
            if(res.state==1){
                this.formData=res.data.articleDto,
                this.selectTags=res.data.tagIds
            }
        },
        onCancle(){
            this.$emit('submit-complete',false);
        },
        async onSubmit(){
            this.$refs.form.validate(async (valid)=>{
                if(valid){
                    if(this.artilceId==""){
                        let dto={
                            articleDto:this.formData,
                            tagIds:this.selectTags
                        }
                        let res =await addArticle(dto)
                        if(res && res.state == 1){
                            this.$message({
                                message:'添加成功',
                                type:'success'
                            })
                            
                            this.$emit('submit-complete',true);
                        }else{
                            this.$message({
                                    message:'添加失败',
                                    type:'error'
                            })
                        }
                    }else{
                        let dto={
                            articleDto:this.formData
                        }

                        console.log(dto);

                        let res = await editArticle(dto)
                        if(res && res.state == 1){
                            this.$message({
                                message:'修改成功',
                                type:'success'
                            })
                            
                            this.$emit('submit-complete',true);
                        }else{
                            this.$message({
                                    message:'修改失败',
                                    type:'error'
                            })
                        }
                    }
                }
            })
        }
    },
}
</script>

<style lang="less" scoped>

</style>

