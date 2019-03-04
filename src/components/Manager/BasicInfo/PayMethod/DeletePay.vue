<template>
  <div>
    <el-dialog title="提示" :visible="this.$store.state.deletePayIsShow" width="30%" :before-close="handleClose">
      <span>你确定删除支付方式：{{currentRows.Payt_Name}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="deletePayItem">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {DeletePayApi} from "../../../../config/Api.js"

  export default {
    data() {
      return {
        payName: "",
        payId: "",
        currentRows: {},
        currentIndex: 0,
        tableData: []
      }
    },
    methods: {
      handleClose() {
        this.$store.state.deletePayIsShow = false;
      },
      deletePayItem() {
        this.$http.post(DeletePayApi + this.currentRows.Payt_GUID).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            });
          }
          this.$store.state.deletePayIsShow = false;
          this.tableData.splice(this.currentIndex, 1);
        });
        this.$store.state.deletePayIsShow = false;
      }
    },
    name: "Delete"
  }
</script>

<style scoped>

</style>
