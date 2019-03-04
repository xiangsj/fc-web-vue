<template>
  <div>
    <el-dialog title="提示" :visible="this.$store.state.deleteProIndexIsShow" width="30%" :before-close="handleClose">
      <span>你确定删除这条记录吗?</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="deleteEmpItem">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {DelEPIndex} from "../../../config/Api.js"

  export default {
    data() {
      return {
        currentRows: {},
        currentIndex: 0,
        ProIndexData: []
      }
    },
    methods: {
      handleClose() {
        this.$store.state.deleteProIndexIsShow = false;
      },
      deleteEmpItem() {
        this.$http.post(DelEPIndex + this.currentRows.EP_GUID).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            });
          }
          this.$store.state.deleteProIndexIsShow = false;
          this.ProIndexData.splice(this.currentIndex, 1);
        });
        this.$store.state.deleteProIndexIsShow = false;
      }
    },
    name: "DeletePreformIndex"
  }
</script>

<style scoped>

</style>
