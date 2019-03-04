<template>
  <div class="addTransferCardDiv">
    <el-dialog title="疗程卡转综合卡" :visible="this.$store.state.addTransferCardIsShow" width="30%"
               :before-close="handleClose">
      <div class="inputDiv">
        <a>*</a>
        <el-select v-model="CourseCard" placeholder="选择要转的疗程卡" style="width: 40%;">
          <el-option v-for="item in CourseCardList" :key="item.vaule" :label="item.lable"
                     :value="item.vaule"></el-option>
        </el-select>
        <a style="margin-left: 10px;">*</a>
        <el-input v-model="CourseCardMoney" style="width: 40%;"
                  placeholder="转综合卡总金额"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="addTransferCardClick">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        CourseCard: '',
        CourseCardList: [],
        CourseCardMoney:'',
      }
    },
    methods: {
      handleClose() {
        this.$store.state.addTransferCardIsShow = false;
      },
      addTransferCardClick() {
        this.$store.state.addTransferCardIsShow = false;
      },
    },
    name: "TransferCardDialog"
  }
</script>
<style>
  .inputDiv a {
    color: red;
  }

  .addTransferCardDiv .el-dialog__header {
    background-color: #8ccbff;
  }

  .addTransferCardDiv .el-dialog {
    border-radius: 20px;
  }

  .addTransferCardDiv .el-dialog__header {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .addTransferCardDiv .el-dialog__title {
    color: white;
  }

  .addTransferCardDiv .el-button--default {
    border: solid 1px #8ccbff;
  }

  .addTransferCardDiv .el-button--default span {
    color: #8ccbff;
  }

  .addTransferCardDiv .el-dialog__body {
    padding: 10px 10px 0;
  }

  .addTransferCardDiv .el-input__inner {
    height: 30px !important;
    font-size: 12px;
  }

  .addTransferCardDiv .el-button {
    height: 38px;
  }

  .addTransferCardDiv .el-input__icon {
    line-height: 30px;
  }

</style>
<style scoped>
  .inputDiv {
    width: 100%;
  }
</style>
