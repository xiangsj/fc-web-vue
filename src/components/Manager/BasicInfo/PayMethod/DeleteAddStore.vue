<template>
  <div>
    <el-dialog title="提示" :visible="this.$store.state.deleteStorePayIsShow" width="30%" :before-close="handleClose">
      <span>你确定删除该门店：{{currentRows.name}}吗?</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="deleteAddStore">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentRows: {},
        currentIndex: '',
        storeAddData: [],
      }
    },
    methods: {
      handleClose() {
        this.$store.state.deleteStorePayIsShow = false;
      },
      deleteAddStore() {
        this.storeAddData.splice(this.currentIndex, 1);
        this.$emit('AddStoreEmit', this.storeAddData);
        this.$store.state.deleteStorePayIsShow = false;
      }
    },
    name: "DeleteAddStore"
  }
</script>

<style scoped>

</style>
