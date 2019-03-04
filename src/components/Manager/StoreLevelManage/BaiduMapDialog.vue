<template>
  <div class="dialogMap">
    <el-dialog title="门店位置" style="text-align: center" :visible.sync="this.$store.state.queryMapIsShow" width="45%" @opened="openDialog"
               :before-close="CloseClick">
    <div style="margin-top: 10px;">
      <div style="width:30%;display:inline-block;float:left;text-align: left;margin-left: 10px;">
        <div class="HintName">查询地址</div>
        <el-input v-model="queryAddress" placeholder="请输入门店地址" v-on:input.native="valueChang" style="width: 220px;"
                  @focus="valueChang"></el-input>
        <div class="nav" v-if="showResult">
          <ul id="example-1">
            <li v-for="item in resultList" v-on:click="itemClick(item)">{{ item.name }}</li>
          </ul>
        </div>
      </div>
      <div style="display: inline-block;text-align: left;margin-left: 10px;">
        <div class="HintName">查询结果精度/纬度</div>
        <el-input v-model="Fe_LocationX" placeholder="精度" prop="Fe_LocationX" style="width: 180px;"
                  id="Fe_LocationX" class="locationWidth"></el-input>
        <el-input v-model="Fe_LocationY" placeholder="纬度" prop="Fe_LocationY" style="width: 180px;"
                  class="locationWidth"></el-input>
      </div>
      <div id="baidumap" class="baidumap"></div>
    </div>
      <span slot="footer" class="dialog-footer" >
        <el-button  @click="CloseClick" icon="el-icon-circle-close-outline">取 消</el-button>
        <el-button type="primary" @click="SureMap" icon="el-icon-circle-plus-outline">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  var local = null;
  let map = null;
  let marker = null;
  export default {
    data() {
      return {
        queryAddress: "",
        Fe_LocationX: "",
        Fe_LocationY: "",
        resultList: "",
        showResult: false,//是否显示搜索结果列表
      };
    },
    methods: {
      valueChang(event) {
        if (local != null) {
          local.search(this.queryAddress);
        }
        if (this.queryAddress.length <= 0) {
          this.resultList = [];
          this.showResult = false;
        } else {
          this.showResult = true;
        }
      },
      itemClick(item) {
        //点击地图时的监听
        if (marker) {
          map.removeOverlay(marker); //移除之前的标注
        }
        //添加标注
        var point = new BMap.Point(item.lng, item.lat);
        marker = new BMap.Marker(point); // 创建标注
        map.addOverlay(marker); //添加标注
        map.centerAndZoom(point, 15); // 设置中心点坐标和地图级别
        this.showResult = false;
        this.queryAddress = item.name;
        this.Fe_LocationX = item.lng;
        this.Fe_LocationY = item.lat;//纬度
      },
      openDialog() {
        let ctx = this;
        map = new BMap.Map("baidumap"); // 创建地图实例
        map.centerAndZoom("上海", 15); // 初始化地图，设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        //百度地图poi检索
        let options = {
          //检索完成回调
          onSearchComplete: function (results) {
            if (local.getStatus() === BMAP_STATUS_SUCCESS) {
              ctx.resultList = [];
              // 判断状态是否正确
              var s = [];
              for (var i = 0; i < results.getCurrentNumPois(); i++) {
                //取出poi名称和经纬度
                ctx.resultList.push({
                  name: results.getPoi(i).title,
                  lat: results.getPoi(i).point.lat,
                  lng: results.getPoi(i).point.lng
                });
              }
              console.log(ctx.resultList);
            }
          }
        };
        //设置参数
        local = new BMap.LocalSearch(map, options);
      },
      CloseClick() {
        this.$store.state.queryMapIsShow = false;
        this.clearData();
      },
      //保存地图经纬度
      SureMap() {
        let XYData=[];
        XYData.push({Fe_LocationX: this.Fe_LocationX, Fe_LocationY: this.Fe_LocationY});
        this.$emit('BaiduEmit',XYData);
        this.$store.state.queryMapIsShow = false;
        this.clearData();
      },
      clearData(){
        this.queryAddress='';
        this.Fe_LocationX='';
        this.Fe_LocationY='';
      },
    },
  }
</script>

<style>
  .dialogMap .el-dialog__header {
    background-color: #8ccbff;
  }

  .dialogMap .el-dialog {
    border-radius: 20px;
  }

  .dialogMap .el-dialog__header {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .dialogMap .el-dialog__title {
    color: white;
  }

  .dialogMap .el-button--default {
    border: solid 1px #8ccbff;
  }

  .dialogMap .el-button--default span {
    color: #8ccbff;
  }

  .dialogMap .el-dialog__body {
    padding: 10px 10px 0;
  }

  .dialogMap .el-input__inner {
    height: 30px !important;
    font-size: 12px;
  }

  .dialogMap .el-button {
    height: 38px;
  }
</style>
<style scoped>
  .HintName {
    color: #606266;
    font-size: 16px;
    line-height: 35px;
    margin-top: -20px;
  }

  .baidumap {
    width: 100%;
    height: 400px;
    overflow: hidden;
    margin-top: 20px;
    font-family: "微软雅黑", serif;
    background:  #fff;
  }

  .nav {
    width: 30%;
    overflow-y: scroll;
    text-align: left;
    margin: 3px;
    border: 1px solid #999;
    position: absolute;
    z-index: 99;
    background: #fff;
  }
</style>
