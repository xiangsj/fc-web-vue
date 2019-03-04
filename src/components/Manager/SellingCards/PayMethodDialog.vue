<template>
  <div class="payMethodDiv">
    <span style="margin-top: 7.5px;font-size: 14px;width: 80px;">{{this.FourPayMethod.Payt_Name}}</span>
    <el-input style="margin-top: 2.5px;margin-bottom: 2.5px;width: 220px;"
              :value=" undefined===this.FourPayMethod.Mec_CourseDis?'':this.FourPayMethod.Mec_CourseDis*this.CourseCardMoney"
              placeholder="请输入支付金额">
    </el-input>
  </div>
</template>

<script>

  export default {
    data() {
      return {}
    },
    created() {
    },
    props: ['FourPayMethod', 'CourseCardMoney'],
    methods: {},
    name: "PayMethodDialog"
  }
</script>
<style>
  .payMethodDiv .el-input__inner {
    height: 30px !important;
    font-size: 14px;
  }
</style>
<style scoped>
  .payMethodDiv {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: auto;
  }
</style>
