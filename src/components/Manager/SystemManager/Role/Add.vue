<template>
  <div class="box">
    <div class="formBox" style="padding: 10px">
      <el-form :model="RoleForm" :rules="rules" ref="RoleForm" class="addForm" status-icon :inline="true"
               label-position="top"
               label-width="160px">
        <div style="text-align: left">
          <el-form-item label="角色名称" prop="Role_Name" class="testAlign">
            <el-input v-model="RoleForm.Role_Name" style="width: 260px;padding-top: -10px"></el-input>
          </el-form-item>
        </div>

        <div style="text-align: left">
          <span class="formFont">请选择权限</span>
          <el-tree node-key="value" ref="tree" :default-expanded-keys="[0,1]" :default-checked-keys="[0,2]"
                   :data="menuList" show-checkbox :props="defaultProps">
          </el-tree>
        </div>

        <div class="btnBox">
          <el-button type="primary" @click="submitForm('RoleForm')">添加</el-button>
          <el-button type="primary" @click="resetForm('RoleForm')">重置</el-button>
        </div>

      </el-form>
    </div>

  </div>
</template>

<script>
  import {AddRoleApi, MenuTreeApi} from "../../../../config/Api.js"

  export default {
    data() {
      return {
        formLabelWidth: "",
        RoleForm: {
          Role_Name: "",
          Menuids: "",
        },
        menuList: [],
        defaultProps: {
          children: 'list',
          label: 'name'
        },
        rules: {
          Role_Name: [
            {required: true, message: '请输入角色名', trigger: 'blur'},
          ],
        },
         RoleTreeList:[],
        itemSelectTree:'',
      };
    },

    created() {
      this.getMenuTree()
    },

    mounted() {
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      /*添加用户*/
      addRole() {
        this.RoleTreeList = this.$refs.tree.getCheckedNodes(true, false);
        for (let i = 0; i < this.RoleTreeList.length; i++) {
          this.itemSelectTree += this.RoleTreeList[i].value + ',';
        }
        let params = {
          Role_Name: this.RoleForm.Role_Name,
          Menuids:  this.itemSelectTree.substring(0, this.itemSelectTree.length - 1),
        };
        this.$http.post(AddRoleApi, this.$qs.stringify(params)).then(resp => {
          if (resp.data.code === 0) {
            console.log(resp.data.data);
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            });
          }

        })
      },

      //提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addRole();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //取消输入内容
      resetForm(AddForm) {
        this.$refs[AddForm].resetFields();
      },
      handleNodeClick(data) {
        console.log(data.label);
      },

      //获取菜单
      getMenuTree() {
        this.$http.post(MenuTreeApi).then(resp => {
          this.menuList = resp.data.data;
        })
      },
    },
    components: {}
  }
</script>

<style scoped>
  .box {
    width: 100%;
    height: 100%;
    margin-top: -20px;
  }

  .bigBtn {
    width: 100%;
  }

  .formBox {
    width: 100%;
    background-color: #fff;
    margin-top: 20px;
  }

  .formFont {
    font-size: 12px;
  }

  .addForm {
    width: 95%;
    left: 0;
  }

  .testAlign {
    text-align: left;
    left: 0px;
  }

  .btnBox {
    height: 60px;
    margin-bottom: 10px;
  }

</style>
