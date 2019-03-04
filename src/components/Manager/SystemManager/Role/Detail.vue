<template>
    <div class="box" style="border: 1px solid #ccc">
        <div class="formBox" style="padding: 10px">
            <el-form :model="EditForm" :rules="rules" ref="EditForm" class="addForm" status-icon :inline="true" label-position="top"
                     label-width="160px">
                <div style="text-align: left">
                    <el-form-item label="角色名称" prop="Role_Name" class="testAlign">
                        <el-input v-model="EditForm.Role_Name" style="width: 260px;padding-top: -10px" :disabled="true"></el-input>
                    </el-form-item>
                </div>
                <div style="text-align: left">
                    <span class="formFont">请选择权限</span>
                    <el-tree node-key="value" ref="tree" :default-expanded-keys="[0,1]" :default-checked-keys="[0,2]" :data="menuList" show-checkbox :props="defaultProps"
                             @check-change="">
                    </el-tree>
                </div>
            </el-form>
        </div>

    </div>
</template>

<script>
	import {MenuTreeApi,DetailRoleApi} from "../../../../config/Api.js"

	export default {
		data() {
			return {
				EditForm: {
					Role_Name: "",
					Menuids: "",
				},
				tableRoleList: [],
				menuList: [],
				defaultProps: {
					children: 'list',
					label: 'name'
				},
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

			/*获取编辑页面的角色信息*/
			getEditRole() {
				let roleId = this.$route.params.roleId;
				this.$http.get(DetailRoleApi + roleId).then(resp => {
					console.log(resp);
					this.EditForm.Role_Name = resp.data.data.Role_Name;
				});

			},

			handleNodeClick(data) {
				console.log(data.label);
			}
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
