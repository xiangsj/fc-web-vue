<template>
  <div class="divOther">
    <el-popover placement="left" v-model="VisibleData" trigger="click">
      <el-table
        :data="this.OtherPayMethod" class="payMethodDiv" :show-header="false">
        <el-table-column prop="Payt_Name" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.Payt_Desc"
              placeholder="请输入">
            </el-input>
          </template>
        </el-table-column>
      </el-table>
      <div style="padding-top: 10px;text-align: center;" class="divBtn">
        <el-button @click.native="ClosePay" icon="el-icon-circle-close-outline">取 消</el-button>
        <el-button type="primary" icon="el-icon-circle-check-outline" @click="refirmPay">确 定
        </el-button>
      </div>
      <el-button @click="payClick"
                 slot="reference" style="height: 100%;margin-top: 40px"
                 type="text">更多支付
      </el-button>
    </el-popover>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        VisibleData: false,
      }
    },
    created() {
      console.log('this.OtherPayMethod');
      console.log(this.OtherPayMethod);
    },
    props: ['OtherPayMethod'],
    methods: {
      payClick() {
        this.VisibleData = true;
      },
      ClosePay() {
        this.VisibleData = false;
      },
      refirmPay() {
        this.VisibleData = false;
      },
    },
    name: "OtherPayDialog"
  }
</script>
<style>
  .divOther .el-input__inner {
    height: 30px !important;
    font-size: 12px;
    margin: 5px 0 5px 0;
  }

  .divBtn .el-button {
    height: 38px;
  }

  .payMethodDiv .cell {
    margin-top: -10px;
    margin-bottom: -10px;
  }

</style>
<style scoped>
  .divOther {
    width: 50%;
    height: auto;
  }

  .payMethodDiv {
    height: auto;
    width: 100%;
  }
</style>
