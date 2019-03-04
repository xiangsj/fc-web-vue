<template>
  <div>
    <el-dialog title="提示" :visible="this.$store.state.deleteEmpManagerIsShow" width="30%" :before-close="handleClose">
      <span>你确定删除员工：  {{currentRows.Em_Name}}吗?</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="deleteEmpItem">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {DeleteEmployeeList} from "../../../config/Api.js"
    export default {
      data() {
        return {
          Em_Name: "",
          currentRows: {},
          currentIndex: 0,
          EmpManagerData: []
        }
      },
      methods: {
        handleClose() {
          this.$store.state.deleteEmpManagerIsShow = false;
        },
        deleteEmpItem() {
          this.$http.post(DeleteEmployeeList + this.currentRows.Em_GUID).then(resp => {
            if (resp.data.code === 0) {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
            }
            this.$store.state.deleteEmpManagerIsShow = false;
            this.EmpManagerData.splice(this.currentIndex, 1);
          });
          this.$store.state.deleteEmpManagerIsShow = false;
        }
      },
        name: "DeleteEmpManager"
    }
</script>

<style scoped>

</style>
