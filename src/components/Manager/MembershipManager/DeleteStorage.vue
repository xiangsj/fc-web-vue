<template>
  <div>
    <el-dialog title="提示" :visible="this.$store.state.deleteStorageIsShow" width="30%" :before-close="handleClose">
      <span>你确定删除此项寄存历史吗?</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="deleteStorageClick">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {DeleteStorage} from "../../../config/Api.js"
    export default {
      data() {
        return {
          Fe_Name: "",
          currentRows: {},
          currentIndex: 0,
          deleteStorageData: []
        }
      },
      methods: {
        handleClose() {
          this.$store.state.deleteStorageIsShow = false;
        },
        deleteStorageClick() {
          this.$http.post(DeleteStorage + this.currentRows.Mdh_GUID).then(resp => {
            if (resp.data.code === 0) {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
            }
            this.$store.state.deleteStorageIsShow = false;
            this.deleteStorageData.splice(this.currentIndex, 1);
          });
          this.$store.state.deleteStorageIsShow = false;
        }
      },
        name: "DeleteStorage"
    }
</script>

<style scoped>

</style>
