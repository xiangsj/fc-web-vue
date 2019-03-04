<template>
    <div class="box" style="border: 1px solid #ccc">
        <div class="formBox" style="padding: 10px">
            <el-form :model="EditForm" :rules="rules" ref="EditForm" class="addForm" status-icon :inline="true" label-position="top"
                     label-width="160px">
                <div style="text-align: left">
                    <el-form-item label="角色名称" prop="Role_Name" class="testAlign">
                        <el-input v-model="EditForm.Role_Name" style="width: 260px;padding-top: -10px"></el-input>
                    </el-form-item>
                </div>
                <div style="text-align: left">
                    <span class="formFont">请选择权限</span>
                    <el-tree node-key="value" ref="tree"  :data="menuList" show-checkbox :props="defaultProps"></el-tree>
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
	import {EditRoleApi, MenuTreeApi, DetailRoleApi} from "../../../../config/Api.js"

	export default {
		data() {
			return {
				EditForm: {
					Role_Name: "",

				},
				Menuids: "",
				tableRoleList: [],

				rules: {
					Role_Name: [
						{required: true, message: '请输入角色名称', trigger: 'blur'},
					],
				},
				rightList: [],
				menuList: [],
				defaultProps: {
					children: 'list',
					label: 'name'
				},
        RoleTreeList:[],
        itemSelectTree:'',
			};
		},

		created() {
			this.getEditRole();
			this.getMenuList();
		},

		mounted() {
		},

		methods: {
			//获取菜单
			getMenuList() {
				this.$http.post(MenuTreeApi).then(resp => {
					this.menuList = resp.data.data;

				})
			},
			getEditRole() {
				let roleId = this.$route.params.roleId;
				this.$http.get(DetailRoleApi + roleId).then(resp => {
					this.EditForm.Role_Name = resp.data.data.Role_Name;
          this.$refs.tree.setCheckedKeys(resp.data.data.Menus);
				});
			},
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
			/*修改用户*/
			editRole() {
        this.RoleTreeList = this.$refs.tree.getCheckedNodes(true, false);
        for (let i = 0; i < this.RoleTreeList.length; i++) {
          this.itemSelectTree += this.RoleTreeList[i].value + ',';
        }
				let Role_GUID = this.$route.params.roleId;
				let State = this.$route.params.state;
				let params = {
					Role_Name: this.EditForm.Role_Name,
					Role_GUID: Role_GUID,
					State: State,
					// Menuids:this.$refs.tree.getCheckedKeys()
					Menuids:this.itemSelectTree.substring(0, this.itemSelectTree.length - 1),
				};
				this.$http.post(EditRoleApi, this.$qs.stringify(params)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '编辑成功',
              type: 'success'
            });
          }
				})
			},

			//提交表单
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					console.log(this.$store.state.currentRow);
					if (valid) {
						this.editRole()
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

			handleCheckChange(data, checked, indeterminate) {

				// this.rightList.push(data.value);
				// console.log(this.rightList);
                console.log(data)

			},
			/*  handleNodeClick(data) {
                  console.log(data.label);
              }*/
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

    .addForm {
        width: 95%;
        left: 0;
    }

    .formFont {
        font-size: 12px;
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
