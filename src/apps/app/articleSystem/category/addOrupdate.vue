<template>
    <el-form :model="formData" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="分类名称" prop="name">
            <el-input v-model="formData.category"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button style="float:right"  type="primary" @click="onSubmit">提交</el-button>
            <el-button style="float:right;margin-right:20px;" @click="onCancle">返回</el-button>
        </el-form-item>
    </el-form>
</template>

<script>

import {addOrUpdateCategory} from '@/api/articleSystem'
export default {
    props:{
        formData:{
            type:Object,
            default(){
                return {
                    id:'',
                    category:''
                }
            }
        }
    },
    data(){
        return {
            rules:{
                category:[{required:true,message:'请输入分类名称',tigger:'blur'}]
            }
        }
    },
    methods:{
        onCancle(){
            this.$emit('submit-complete',false);
        },
        onSubmit(){
            this.$refs.form.validate(valid=>{
                if(valid){
                      addOrUpdateCategory({
                          id:this.formData.id,
                          category:this.formData.category
                      }).then(res=>{
                          if(res && res.state==1 ){
                              if(this.formData.id !=0){
                                  this.$message({
                                      message:'修改成功',
                                      type:'success'
                                  })
                              }else{
                                  this.$message({
                                      message:'添加成功',
                                      type:'success'
                                  })
                              }
                              this.$emit('submit-complete',true)
                          }else{
                              this.$message({
                                  message:'保存失败!',
                                  type:'error'
                              })
                              
                              return;
                          }
                      }).catch(err=>{
                          this.$message({
                                  message:'保存失败!',
                                  type:'error'
                              })
                              
                              return;
                      }) 
                }
            });
        }
    }
}
</script>

<style>

</style>

