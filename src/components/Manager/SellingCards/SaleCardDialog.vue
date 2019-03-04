<template>
  <div class="saleCardDiv">
    <span class="spanClass">{{this.staffPeopleData.Em_Name}}</span>
    <el-input style="margin-top: 5px;margin-bottom: 5px;width: 220px;"
              v-model="saleCardMoney"
              placeholder="">
    </el-input>
    <img src="../../../../static/images/close_gray.png" @click="closeClick" alt="">
  </div>
</template>

<script>

  export default {
    data() {
      return {
        saleCardMoney:'',
      }
    },
    created() {
    },
    props: ['staffPeopleData',],
    methods: {
      closeClick() {
        // alert("3222222222");
        // this.staffPeopleData.splice(0,1);
        this.$emit('closeClick');
      }
    },
    name: "SaleCardDialog"
  }
</script>
<style>
  .saleCardDiv .el-input__inner {
    height: 30px !important;
    font-size: 14px;
  }
</style>
<style scoped>
  .saleCardDiv {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: auto;
    width: 50%;
  }

  .spanClass {
    margin: 10px 10px 0 0;
    font-size: 14px;
    color: #007aff;
  }
</style>
