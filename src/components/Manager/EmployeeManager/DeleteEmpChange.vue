<template>
  <div>
    <el-dialog title="提示" :visible="this.$store.state.deleteEmpChangeIsShow" width="30%" :before-close="handleClose">
      <span>你确定删除这条记录吗?</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="deleteEmpItem">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {DelECF} from "../../../config/Api.js"

  export default {
    data() {
      return {
        currentRows: {},
        currentIndex: 0,
        EmpChangeData: []
      }
    },
    methods: {
      handleClose() {
        this.$store.state.deleteEmpChangeIsShow = false;
      },
      deleteEmpItem() {
        this.$http.post(DelECF + this.currentRows.Ec_GUID).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            });
          }
          this.$store.state.deleteEmpChangeIsShow = false;
          this.EmpChangeData.splice(this.currentIndex, 1);
        });
        this.$store.state.deleteEmpChangeIsShow = false;
      }
    },
    name: "DeleteEmpChange"
  }
</script>

<style scoped>

</style>
