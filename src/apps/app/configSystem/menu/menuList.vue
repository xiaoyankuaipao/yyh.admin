<template>
  <div>
    <el-card class="box-card table-container" style="margin:10px">
      <div slot="header" class="clearfix">菜单管理</div>
      <el-row class="table_buttons">
        <el-col :span="10">
          <el-button-group>
            <el-button type="primary" icon="el-icon-add" @click="onCreate" v-btnhas="menu_add">创建</el-button>
            <el-button type="primary" icon="el-icon-edit" @click="onUpdate" v-btnhas="menu_edit">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="onDelete" v-btnhas="menu_delete">删除</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <tree-grid
            :columns="columns"
            :items="data"
            :expanded="true"
            ref="treeGrid"
          ></tree-grid>
        </el-col>
      </el-row>
    </el-card>

    <!-- 对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="showDialog"  :close-on-click-modal="false" >
      <detail-page v-if="showDialog" :formData="selectInfo" :editType="editType" @submit-complete="onCloseDialog"></detail-page>
    </el-dialog>
  </div>
</template>

<script>
import treeGrid from "@/apps/plugins/treegrid/treegrid.vue";
import edit from "./addOrupdate.vue";
import { getMenuTree, deleteMenu } from "@/api/configSystem";
export default {
  components: {
    treeGrid,
    edit,
    "detail-page": edit
  },

  data() {
    return {
      title: "菜单管理模块",

      data: [],
      columns: [
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
          title: "是否按钮",
          key: "menuType",
          width: 50,
          align: "center",
          formatter: (value) => {
            return value == 3 ? '是' : '-'
          }
        },
        {
          title: "icon",
          key: "icon",
          width: 50,
          align: "center"
        }
      ],
      showDialog: false,
      dialogTitle: "",
      selectInfo: null,
      editType: 1,
      menu_add:'menu.add',
      menu_edit:'menu.edit',
      menu_delete:'menu.delete'
    };
  },
  created() {
    this.getMenus();
  },
  methods: {
    async getMenus() {
      var result = await getMenuTree();
      if (result.state == 1) {
        this.data = result.data;
      }
    },
    onCreate() {
      this.selectInfo = {
        id: 0,
        parentId: "",
        name: "",
        icon: "",
        address: "",
        menuType: ""
      };
      this.dialogTitle = "新增菜单";
      this.editType = 1;
      this.showDialog = true;
    },
    onUpdate() {
      let row = this.$refs.treeGrid.getSelected();
      if (row) {
        this.selectInfo = {
          id: row.id,
          parentId: row.parentId,
          name: row.name,
          code: row.code,
          icon: row.icon,
          address: row.address,
          menuType: row.menuType
        };
        this.dialogTitle = "编辑菜单模块";
        this.editType = 2;
        this.showDialog = true;
      } else {
        this.$message({ message: "请选择一行数据", type: "warning" });
      }
    },
    onDelete() {
      let row = this.$refs.treeGrid.getSelected();
      if (row) {
        this.$confirm("确定删除菜单【" + row.name + "】吗？", "提示")
          .then(success => {
            this.DeleteInfo(row.id);
          })
          .catch(() => {});
      } else {
        this.$message({ message: "请选择一行数据", type: "warning" });
      }
    },
    async DeleteInfo(id) {
      let result = await deleteMenu(id);
      if (result.state) {
        this.getMenus();
        this.$message({ message: "删除成功", type: "success" });
      } else {
        this.$message({ message: "删除失败！", type: "error" });
      }
    },
    onCloseDialog(success) {
      this.showDialog = false;
      if(success){
        this.getMenus();
      }
    },
    /*格式化图标*/
    fmtIcon(value) {
      if (value) {
        return '<i class="' + value + '"><i>';
      }
      return value;
    }
  }
};
</script>

<style lang="less" scoped>
.table_container {
  margin: 10px;
}
.table_buttons {
  margin-bottom: 10px;
}
</style>
