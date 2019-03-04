<template>
  <div class="box">
    <div class="formBox" style="padding: 10px">

      <el-form :model="EditForm" :rules="rules" ref="EditForm" class="addForm" status-icon :inline="true"
               label-position="top"
               label-width="160px">
        <div style="text-align: left">
          <el-form-item label="用户名" prop="User_Name" class="testAlign">
            <el-input v-model="EditForm.User_Name" style="width: 260px;padding-top: -10px"></el-input>
          </el-form-item>
          <el-form-item label="用户账号" prop="User_Account" class="testAlign">
            <el-input v-model="EditForm.User_Account" style="width: 260px"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="User_Password" class="testAlign">
            <el-input v-model="EditForm.User_Password" style="width: 260px" type="password"></el-input>
          </el-form-item>

          <el-form-item label="请选择员工" prop="employee" class="testAlign">
            <el-select v-model="employeevalue" placeholder="请选择" style="width: 260px">
              <el-option v-for="item in employeeList" :key="item.Em_GUID" :label="item.Em_Name"
                         :value="item.Em_GUID"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="请选择角色" prop="role" class="testAlign" style="text-align: left">
            <el-select v-model="rolevalue" multiple placeholder="请选择" style="width: 260px">
              <el-option v-for="item in roleList" :key="item.Role_GUID" :label="item.Role_Name"
                         :value="item.Role_GUID"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div style="text-align: left">
          <span class="formFont">请选择门店</span>
          <el-tree :data="fendianData" show-checkbox node-key="value" ref="tree" :props="defaultProps"
                   :filter-node-method="filterNode"
                   style="margin-top: 10px"
          ></el-tree>
        </div>
        <div class="btnBox">
          <el-button type="primary" @click="submitForm('EditForm')">保存</el-button>
          <el-button type="primary" @click="resetForm('EditForm')">重置</el-button>
        </div>

      </el-form>
    </div>

  </div>
</template>

<script>
  import {EditUserApi, UserDetailApi, FenDianTreeApi, QueryEmpList, GetRoleList} from "../../../../config/Api.js"

  export default {
    data() {
      return {

        EditForm: {
          User_Name: '',
          User_Password: '',
          User_Account: "",
        },
        User_GUID: "",

        employeeList: [],
        fendianData: [],
        defaultProps: {
          children: 'list',
          label: 'name'
        },
        roleList: [],
        rolevalue: "",
        employeevalue: "",
        rules: {
          User_Name: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 4, max: 12, message: '长度在 4 到 12个字符', trigger: 'blur'}
          ],
          User_Password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 4, max: 12, message: '长度在4到 12个字符', trigger: 'blur'}
          ],


        },
        FenDianList: [],
        FenDianData: '',
      };
    },

    created() {
      this.queryEmp();
      this.getRoleData();
      this.getEditUser();
      this.getFenDianTree();

    },
    mounted() {
    },
    methods: {
      queryEmp() {
        this.$http.post(QueryEmpList).then(resp => {
          this.employeeList = resp.data.data;
        })
      },
      getRoleData() {
        this.$http.post(GetRoleList).then(resp => {
          this.roleList = resp.data.data;
        })
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      /*获取编辑页面的用户信息*/
      getEditUser() {
        let userId = this.$route.params.userId;
        this.$http.get(UserDetailApi + userId).then(resp => {
          this.EditForm.User_Account = resp.data.data.User_Account;
          this.EditForm.User_Password = resp.data.data.User_Password;
          this.EditForm.User_Name = resp.data.data.User_Name;
          this.User_GUID = resp.data.data.User_GUID;
          this.rolevalue = resp.data.data.Roles;
          this.employeevalue = resp.data.data.Em_GUID;
          this.$refs.tree.setCheckedKeys(resp.data.data.FeGUIDs);
        });
      },
      /*修改用户*/
      editUser() {
        this.FenDianList = this.$refs.tree.getCheckedNodes(true, false);
        for (let i = 0; i < this.FenDianList.length; i++) {
          this.FenDianData += this.FenDianList[i].value + ',';
        }
        let params = {
          User_Account: this.EditForm.User_Account,
          User_Password: this.EditForm.User_Password,
          User_Name: this.EditForm.User_Name,
          Fendians: this.FenDianData.substring(0, this.FenDianData.length - 1),
          RoleIds: this.rolevalue + '',
          User_GUID: this.User_GUID,
          Em_GUID: this.employeevalue,
        };
        this.$http.post(EditUserApi, this.$qs.stringify(params)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
          }
        })
      },

      //提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.editUser()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //取消输入内容
      resetForm(EditForm) {
        this.$refs[EditForm].resetFields();
      },
      handleNodeClick(data) {
        console.log(data.label);
      },
      //获取分店树菜单
      getFenDianTree() {
        let param={
          User_GUID:this.$route.params.userId,
        };
        this.$http.post(FenDianTreeApi,this.$qs.stringify(param)).then(resp => {
          if (resp.data.code === 0) {
            this.fendianData = resp.data.data;
          }
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
