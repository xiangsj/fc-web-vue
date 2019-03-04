<template>
  <div class="deleteCard">
    <el-dialog title="提示" :show-close='visibleCLOSE'
               :visible="this.$store.state.deleteMemberCard" width="20%" :before-close="handleClose">
      <span>该会员拥有资产，是否删除?</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="deleteCardButton">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {DeletePatchCard} from "../../../config/Api.js"

  export default {
    data() {
      return {
        visibleCLOSE: false,
        currentRows: {},
        currentIndex: 0,
        deleteData: [],
        MeGuid: '',
      }
    },
    methods: {
      handleClose() {
        this.$store.state.deleteMemberCard = false;
      },
      deleteCardButton() {
        this.$http.post(DeletePatchCard + this.MeGuid).then(resp => {
          this.$store.state.deleteMemberCard = false;
          this.deleteData.splice(this.currentIndex, 1);
        });
        this.$store.state.deleteMemberCard = false;
      }
    },
    name: "DelateCard"
  }
</script>

<style>
  .deleteCard .el-dialog__header {
    background-color: #8ccbff;
  }

  .deleteCard .el-dialog {
    border-radius: 20px;
  }

  .deleteCard .el-dialog__header {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .deleteCard .el-dialog__title {
    color: white;
  }

  .deleteCard .el-button--default {
    border: solid 1px #8ccbff;
  }

  .deleteCard .el-button--default span {
    color: #8ccbff;
  }

  .deleteCard .el-dialog__body {
    padding: 10px 10px 0;
  }

  .deleteCard .el-button {
    height: 38px;
  }

</style>
<style scoped>

</style>
