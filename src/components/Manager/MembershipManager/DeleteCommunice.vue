<template>
  <div>
    <el-dialog title="提示" :visible="this.$store.state.deleteCommuniceIsShow" width="30%" :before-close="handleClose">
      <span>你确定删除此项沟通记录吗?</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="deleteCommuniceClick">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {DeleteCommuniceList} from "../../../config/Api.js"
    export default {
      data() {
        return {
          currentRows: {},
          currentIndex: 0,
          deleteCommuniceData: []
        }
      },
      methods: {
        handleClose() {
          this.$store.state.deleteCommuniceIsShow = false;
        },
        deleteCommuniceClick() {
          this.$http.post(DeleteCommuniceList + this.currentRows.Mc_GUID).then(resp => {
            if (resp.data.code === 0) {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
            }
            this.$store.state.deleteCommuniceIsShow = false;
            this.deleteCommuniceData.splice(this.currentIndex, 1);
          });
          this.$store.state.deleteCommuniceIsShow = false;
        }
      },
        name: "DeleteCommunice"
    }
</script>

<style scoped>

</style>
