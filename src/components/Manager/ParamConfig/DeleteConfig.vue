<template>
  <div>
    <el-dialog title="提示" :visible="this.$store.state.deleteRoleIsShow" width="30%" :before-close="handleClose">
      <span>你确定删除此项类别：{{currentRows.Co_Name}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="deleteUser">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {DeleteConfigList} from "../../../config/Api.js"

  export default {
    data() {
      return {
        CoName: "",
        CoId: "",
        currentRows: {},
        currentIndex: 0,
        tableData: []
      }
    },

    methods: {
      handleClose() {
        this.$store.state.deleteRoleIsShow = false;
      },
      deleteUser() {
        this.$http.post(DeleteConfigList + this.currentRows.Co_GUID).then(resp => {
          this.$store.state.deleteRoleIsShow = false;
          this.tableData.splice(this.currentIndex, 1);
        });
        this.$store.state.deleteRoleIsShow = false;
      }
    },
    name: "DeleteConfig"
  }
</script>

<style scoped>

</style>
