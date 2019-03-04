<template>
  <div>
    <el-dialog title="门店位置" class="dialogMap" :visible="this.$store.state.queryMapIsShow" width="45%"
               :before-close="CloseClick">
      <div style="width: 100%;">
        <div style="width: 45%;display: inline-block;  text-align: left;">
          <div class="HintName">查询地址</div>
          <el-input v-model="queryAddress" placeholder="请输入门店商圈" style="width: 260px;"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="QueryMap">
          </el-button>
        </div>
        <div style="width: 45%;display: inline-block;text-align: left;">
          <div class="HintName">查询结果精度/纬度</div>
          <el-input v-model="Fe_LocationX" placeholder="精度" prop="Fe_LocationX" style="width: 180px;"
                    class="locationWidth"></el-input>
          <el-input v-model="Fe_LocationY" placeholder="纬度" prop="Fe_LocationY" style="width: 180px;"
                    class="locationWidth"></el-input>
        </div>
      </div>
      <!--<MapComponent :mapHeight="300" :longitude="116.302183" :latitude="39.830263"-->
                    <!--style="margin-top: 15px;"></MapComponent>-->

      <!--<span slot="footer" class="dialog-footer" >-->
      <div style="margin-top: 10px;margin-bottom: -20px;">
        <el-button @click="CloseClick" icon="el-icon-circle-close-outline">取 消</el-button>
        <el-button type="primary" @click="SureMap" icon="el-icon-circle-plus-outline">保 存</el-button>
      </div>
      <!--</span>-->
    </el-dialog>
  </div>
</template>

<script>
  import MapComponent from './MapComponent';

  export default {
    data() {
      return {
        queryAddress: '',
        Fe_LocationX: '',
        Fe_LocationY: '',
      }
    },
    created() {

    },
    components: {
      MapComponent
    },
    mounted() {

    },
    methods: {
      CloseClick() {
        this.$store.state.queryMapIsShow = false;
      },
      QueryMap() {

      },
      SureMap() {

      },
    },
    name: "QueryMap"
  }
</script>

<style>
  .dialogMap .el-dialog__header {
    background-color: #8cc5ff;
    padding: 10px 10px 10px;
  }

  .dialogMap .el-dialog__title {
    color: white;
    font-size: 18px;
  }
</style>

<style scoped>
  .HintName {
    color: #606266;
    font-size: 16px;
    line-height: 35px;
    margin-top: -20px;
  }

</style>
