<template>
  <!-- ref:被用来给元素或子组件注册引用信息，引用信息将会注册在父组件的 $refs对象上 -->
  <el-form :model="formData" :rules="rules" ref="form" label-width="120px">
    <el-form-item label="父级菜单" prop="parentName">
      <tree-select
        v-model="formData.parentId"
        :treeData="menuTree"
        :treeProps="treeProps"
        :multiple="false"
        placeholder="请选择"
        @setSelectedId="setParentMenu"
      ></tree-select>
    </el-form-item>
    <el-form-item label="菜单名称" prop="name">
      <el-input v-model="formData.name"></el-input>
    </el-form-item>
    <el-form-item label="编号(唯一)" prop="code">
      <el-input v-model="formData.code"></el-input>
    </el-form-item>
    <el-form-item label="Url" prop="address">
      <el-input v-model="formData.address"></el-input>
    </el-form-item>
    <el-form-item label="图标" prop="icon">
      <el-input v-model="formData.icon"></el-input>
    </el-form-item>
    <el-form-item label="菜单类型">
      <el-select v-model="formData.menuType" filterable>
        <el-option
          v-for="item in menuType"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button style="float:right"  type="primary" @click="submit">提交</el-button>
      <el-button style="float:right;margin-right:20px;"    @click="close">返回</el-button>
      
    </el-form-item>
  </el-form>
</template>

<script>
import treeSelect from "@/apps/plugins/comboxtree/comboxtree.vue"
import { getMenuComboxTree, addMenu, updateMenu } from "@/api/configSystem";
export default {
  props: {
    formData: {
      type: Object,
      default() {
        return {};
      }
    },
    editType: {
      type: Number,
      default() {
        return 1;
      }
    }
  },
  components: {
    treeSelect
  },
  data() {
    return {
      icons: [],
      menuTree: [],
      treeProps: {
        label: "text",
        children: "children",
        level: ""
      },
      menuType: [
        {
          value: 1,
          label: "导航"
        },
        {
          value: 2,
          label: "嵌入页面"
        },
        {
          value: 3,
          label: "按钮"
        }
      ],
      typeValue: "",
      rules: {
        name: [{ required: true, messsage: "请输入菜单名称", tigger: "blur" }],
        code: [{ required: true, messsage: "请输入菜单编码", tigger: "blur" }]
      }
    };
  },
  created() {
    this.getParentMenuData();
  },
  methods: {
    async getParentMenuData() {
      let result = await getMenuComboxTree();
      if (result.state == 1) {
        this.menuTree = result.data;
      }
    },
    setParentMenu(val) {
      this.formData.parentId = val;
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.editType == 1) {
            addMenu(this.formData).then(result => {
              if (result && result.state == 1) {
                this.$message({ message: "添加成功!", type: "success" });
                this.$emit("submit-complete", true);
              } else {
                this.$message({ message: "添加失败!", type: "error" });
              }
            });
          } else if (this.editType == 2) {
            updateMenu(this.formData).then(result => {
              if (result && result.state == 1) {
                this.$message({ message: "修改成功!", type: "success" });
                this.$emit("submit-complete", true);
              } else {
                this.$message({ message: "修改失败!", type: "error" });
              }
            });
          }
        } else {
          return;
        }
      });
    },
    close() {
      this.$emit("submit-complete", false);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
