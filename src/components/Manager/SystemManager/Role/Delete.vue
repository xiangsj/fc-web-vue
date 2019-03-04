<template>
    <div>
        <el-dialog title="提示" :visible="this.$store.state.deleteRoleIsShow" width="30%" :before-close="handleClose">
          <span>你确定删除角色：{{currentRows.Role_Name}}</span>
          <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="deleteUser">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
	import {DeleteRoleApi} from "../../../../config/Api.js"

	export default {
		data() {
			return {
				roleName: "",
				roleId: "",
				currentRows: {},
				currentIndex: 0,
				tableData:[]
			}
		},

		methods: {
			handleClose() {
				this.$store.state.deleteRoleIsShow = false;
			},
			deleteUser() {
				this.$http.post(DeleteRoleApi + this.currentRows.Role_GUID).then(resp => {
					this.$store.state.deleteRoleIsShow = false;
					this.tableData.splice(this.currentIndex, 1);
				});
				this.$store.state.isShow = false;
			}
		}
	}
</script>

<style scoped>

</style>
