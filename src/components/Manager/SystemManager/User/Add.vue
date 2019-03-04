<template>
    <div class="box">
        <div class="formBox" style="padding: 10px">

            <el-form :model="AddForm" :rules="rules" ref="AddForm" class="addForm" status-icon :inline="true" label-position="top"
                     label-width="160px" >
                <div style="text-align: left">
                    <el-form-item label="用户名" prop="User_Name" class="testAlign">
                        <el-input v-model="AddForm.User_Name" style="width: 260px;padding-top: -10px" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="用户账号" prop="User_Account" class="testAlign">
                        <el-input v-model="AddForm.User_Account" style="width: 260px" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码" prop="User_Password" class="testAlign">
                        <el-input v-model="AddForm.User_Password" style="width: 260px" type="password" placeholder="请输入密码"></el-input>
                    </el-form-item>

                    <el-form-item label="请选择员工" prop="employee" class="testAlign">
                        <el-select v-model="employeevalue" placeholder="请选择员工" style="width: 260px">
                            <el-option v-for="item in employee" :key="item.Em_GUID" :label="item.Em_Name" :value="item.Em_GUID"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="请选择角色" prop="role" class="testAlign" style="text-align: left">
                        <el-select v-model="rolevalue" multiple placeholder="请选择角色" style="width: 260px">
                            <el-option v-for="item in role" :key="item.Role_GUID" :label="item.Role_Name" :value="item.Role_GUID"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div style="text-align: left">
                    <span class="formFont">请选择门店</span>
                    <el-tree :data="fendianData" show-checkbox node-key="value" ref="tree" :props="defaultProps" style="margin-top: 10px" ></el-tree>
                </div>
                <div class="btnBox">
                    <el-button type="primary" @click="submitForm('AddForm')">添加</el-button>
                    <el-button type="primary" @click="resetForm('AddForm')">重置</el-button>
                </div>

            </el-form>
        </div>

    </div>
</template>

<script>
	import {AddUserApi, MenuListApi, FenDianTreeApi,QueryEmpList, GetRoleList} from "../../../../config/Api.js"

	export default {
		data() {
			return {
				formLabelWidth: "",
				AddForm: {
					User_Name: '',
					User_Password: '',
					User_Account: "",
				},
				rolevalue: [],
				employeevalue: "",
				fendianList: [],

				rules: {
					User_Name: [
						{required: true, message: '请输入用户名', trigger: 'blur'},
					],
					User_Password: [
						{required: true, message: '请输入密码', trigger: 'blur'},
						{min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur'}
					],
					User_Account: [
						{required: true, message: '请输入用户账号', trigger: 'blur'},
						{min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur'}
					],
				},
        role: [],
				fendianData: [],
				defaultProps: {
					children: 'list',
					label: 'name'
				},
				employee: [],
        FenDianList: [],
        dataStore:'',
			};
		},

		created() {
      this.queryEmp();
      this.getRoleData();
			this.getFenDianTree()
		},
		mounted() {
			console.log("mounted");
		},
		methods: {
      queryEmp() {
        this.$http.post(QueryEmpList).then(resp => {
          this.employee = resp.data.data;
        })
      },
      getRoleData() {
        this.$http.post(GetRoleList).then(resp => {
          this.role = resp.data.data;
        })
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
			/*添加用户*/
			addUser() {
        this.FenDianList = this.$refs.tree.getCheckedNodes(true, false);
        for (let i = 0; i < this.FenDianList.length; i++) {
          this.dataStore += this.FenDianList[i].value + ',';
        }
				let params = {
					User_Account: this.AddForm.User_Account,
					User_Password: this.AddForm.User_Password,
					User_Name: this.AddForm.User_Name,
          RoleIds: this.rolevalue + '',
          Fendians: this.dataStore.substring(0, this.dataStore.length - 1),
					Em_GUID:this.employeevalue,
				};
				this.$http.post(AddUserApi, this.$qs.stringify(params)).then(resp => {
					if (resp.data.code === 0) {
						this.$notify({
							title: '成功',
							message: '添加成功',
							type: 'success'
						});
						/*  this.$router.push({name:"systemManagerIndex"})*/
					}

				})
			},

			//提交表单
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.addUser();
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

			//获取模块菜单
			getMenuList() {
				let params = {
					Menu_Type: 1,
					pageSize: 1,
					pageIndex: 2,
					totle: 2,
					isAsc: true,
					Keyword: ""
				};
				this.$http.post(params, MenuListApi).then(resp => {
					console.log(resp)
				})
			},
			//获取分店树菜单
			getFenDianTree() {
				this.$http.post(FenDianTreeApi).then(resp => {
					this.fendianData = resp.data.data
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
