<template>
    <div>
        <div style="margin: 15px 0;"></div>
        <!-- 使用v-model 双向绑定当前选择的单选框的值  -->
        <el-radio-group v-model="formData.roleId">
            <el-radio border  v-for="role in roleList" :label="role.id" :key="role.id" :value="role">{{role.name}}</el-radio>
        </el-radio-group>
        <div style="float:right;margin-bottom:10px;">
            <el-button @click="onCancel">返回</el-button>
            <el-button type="primary" @click="onSubmit">提交</el-button>
        </div>
    </div>
</template>

<script>
import {getRolelist,setUserRole} from '@/api/configSystem.js'
export default {
    props:{
        formData:{
            type:Object,
            required:true,
        }
    },
    data(){
        return{
            roleList:[]
        }
    },
    created(){
        this.onGetRoleList();
    },
    methods:{
        async onGetRoleList(){
            let res=await getRolelist();
            if(res && res.state==1){
                this.roleList=res.result.data;
            }else{
                this.$message({message:'角色获取失败',typ:'error'});
            }
        },
        onSubmit(){
            if(this.formData.roleId==null){
                this.$message({message:'请选择用户角色',type:'warning'});
            }else{
                setUserRole({
                    userId:this.formData.id,
                    roleId:this.formData.roleId
                }).then(res=>{
                    if(res && res.state==1){
                        this.$message({message:'角色分配成功',type:'success'});
                        this.$emit('submit-complete',true);
                    }else{
                        this.$message({message:'保存失败',type:'success'});
                        return;
                    }
                })
            }
        },
        onCancel(){
            this.$emit('submit-complete',false);
        }
    }
}
</script>
