<template>
    <el-form :model="formData" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="用户名" prop="userName">
            <el-input v-model="formData.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="formData.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
            <el-input v-model="formData.realName"></el-input>
        </el-form-item>
         <el-form-item label="邮箱" prop="email">
            <el-input v-model="formData.email"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button style="float:right"  type="primary" @click="onSubmit">提交</el-button>
            <el-button style="float:right;margin-right:20px;" @click="onCancle">返回</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import {addOrupdateUser} from '@/api/configSystem'
export default {
    props:{
        formData:{
            type:Object,
            default(){
                return {
                    id:0,
                    userName:'',
                    password:'',
                    realName:'',
                    email:''
                }
            }
        }
    },
    data(){
        return {
            rules:{
                userName:[{required:true,message:'请输入用户名',tigger:'blur'}],
                password:[{required:true,message:'请输入密码',tigger:'blur'}],
                realName:[{required:true,message:'请输入用户真实姓名',tigger:'blur'}],
                email:[{required:true,message:'请输入用户邮箱',tigger:'blur'}]
            }
        }
    },
    methods:{
        onCancle(){
            this.$emit('submit-complete',false);
        },
        async onSubmit(){
            this.$refs.form.validate(async (valid)=>{
                if(valid){
                    let res= await addOrupdateUser(this.formData);
                    console.log(res);
                    if(res && res.state == 1){
                        if(this.formData.id){
                            this.$message({
                                message:'修改成功',
                                type:'success'
                            });
                        }else{
                            this.$message({
                                message:'添加成功',
                                type:'success'
                            })
                        }
                        this.$emit('submit-complete',true);
                    }else{
                        this.$message({
                                message:'保存失败',
                                type:'error'
                        })
                    }
                }
            })
        }
    }
}
</script>

