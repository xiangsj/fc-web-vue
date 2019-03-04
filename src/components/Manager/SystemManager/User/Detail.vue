<template>
    <div class="box">
        <div class="formBox" style="padding: 10px">

            <el-form :model="EditForm" :rules="rules" ref="EditForm" class="addForm" status-icon :inline="true" label-position="top"
                     label-width="160px">
                <div style="text-align: left">
                    <el-form-item label="用户名" prop="User_Name" class="testAlign">
                        <el-input v-model="EditForm.User_Name" style="width: 260px;padding-top: -10px" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" prop="User_Account" class="testAlign">
                        <el-input v-model="EditForm.User_Account" style="width: 260px" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码" prop="User_Password" class="testAlign">
                        <el-input v-model="EditForm.User_Password" style="width: 260px" type="password" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="请选择员工" prop="employee" class="testAlign">
                        <el-select v-model="employeevalue" placeholder="请选择" style="width: 260px" :disabled="true">
                            <el-option v-for="item in employee" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="请选择角色" prop="role" class="testAlign" style="text-align: left">
                        <el-select v-model="rolevalue" multiple placeholder="请选择" style="width: 260px" :disabled="true">
                            <el-option v-for="item in role" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div style="text-align: left">
                    <span class="formFont">请选择门店</span>
                    <el-tree :data="fendianData" show-checkbox node-key="value" :props="defaultProps" style="margin-top: 10px" :disabled="true"></el-tree>
                </div>


            </el-form>
        </div>

    </div>
</template>

<script>
	import {EditUserApi, UserDetailApi, FenDianTreeApi} from "../../../../config/Api.js"

	export default {
		data() {
			return {
				formLabelWidth: "",
				EditForm: {
					User_Name: '',
					User_Password: '',
					User_Account: "",

				},
				User_GUID: "",
				fendianData: [],
				defaultProps: {
					children: 'list',
					label: 'name'
				},

				employee: [],
				role: [],
				rolevalue: [],
				employeevalue: "",
			};
		},

		created() {
			this.getEditUser();
			this.getFenDianTree();
		},
		mounted() {
		},
		methods: {

			/*获取编辑页面的用户信息*/
			getEditUser() {
				let userId = this.$route.params.userId;
				this.$http.get(UserDetailApi + userId).then(resp => {
					this.EditForm.User_Account = resp.data.data.User_Account;
					this.EditForm.User_Password = resp.data.data.User_Password;
					this.EditForm.User_Name = resp.data.data.User_Name;
					this.User_GUID = resp.data.data.User_GUID;
					this.role = resp.data.data.roles;
				});

			},

			handleNodeClick(data) {
				console.log(data.label);
			},

			//获取分店树菜单
			getFenDianTree() {
				let User_GUID = this.$route.params.userId;
				let params = {
					User_GUID: User_GUID,
				};
				this.$http.post(FenDianTreeApi, this.$qs.stringify(params)).then(resp => {
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
