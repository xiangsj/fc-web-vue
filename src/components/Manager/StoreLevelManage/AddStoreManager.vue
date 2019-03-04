<template>
  <div style="width: 100%">
    <div class="btnBox">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="resetManagerForm('AddManagerForm')">重置
      </el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="submitManangerMethod('AddManagerForm')">保存
      </el-button>
    </div>
    <div class="divFourLine">
      <el-form :model="AddManagerForm" :rules="rules" ref="AddManagerForm" status-icon :inline="true"
               label-position="top">
        <div style="width: 100%">
          <!--横-1-->
          <div class="divOption">
            <el-form-item prop="Fe_Name">
              <div class="HintName">门店名称</div>
              <el-input v-model="AddManagerForm.Fe_Name" placeholder="请输入门店名称"></el-input>
            </el-form-item>
            <el-form-item prop="Fe_LinkName">
              <div class="HintName">门店联系人</div>
              <el-input v-model="AddManagerForm.Fe_LinkName" placeholder="请输入门店联系人"></el-input>
            </el-form-item>
            <el-form-item prop="Fe_OpenStartTime">
              <div class="HintName">门店营业开始时间</div>
              <el-time-select
                v-model="AddManagerForm.Fe_OpenStartTime" :picker-options="{start:'09:00',step: '00:30',end: '22:00'}"
                placeholder="时-分">
              </el-time-select>
            </el-form-item>
            <el-form-item prop="Fe_LicenceDate">
              <div class="HintName">营业执照有效期</div>
              <el-date-picker v-model="Fe_LicenceDate" type="date"
                              placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </div>
          <!--横-2-->
          <div class="divOption">
            <el-form-item prop="Fe_ShotName">
              <div class="HintName">门店简称</div>
              <el-input v-model="AddManagerForm.Fe_ShotName" placeholder="请输入门店简称"
              ></el-input>
            </el-form-item>
            <el-form-item prop="Fe_Type">
              <div class="HintName">门店类型</div>
              <el-select v-model="AddManagerForm.Fe_Type" placeholder="请选择类型">
                <el-option v-for="item in Fe_Type" :key="item.Co_Values" :label="item.Co_Name"
                           :value="item.Co_Values"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="Fe_OpenEndTime">
              <div class="HintName">门店营业结束时间</div>
              <el-time-select
                v-model="AddManagerForm.Fe_OpenEndTime"
                :picker-options="{start:'09:00',step:'00:30',end:'22:00'}"
                placeholder="时-分">
              </el-time-select>
            </el-form-item>
            <el-form-item prop="Fe_LicenceReceiveTime">
              <div class="HintName">营业执照领取时间</div>
              <el-date-picker v-model="Fe_LicenceReceiveTime" type="date"
                              placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </div>
          <!--横-3-->
          <div class="divOption">
            <!--这个change事件是select的，不是option的，别写在option里面-->
            <el-form-item prop="Fe_Region">
              <div class="HintName">行政地区</div>
              <el-select v-model="province" placeholder="省级" style="width: 80px;" @change="choseProvince">
                <el-option v-for="item in provinceList" :key="item.Re_GUID" :label="item.Re_Name"
                           :value="item.Re_GUID"></el-option>
              </el-select>
              <el-select v-model="shi" placeholder="市级" style="width: 80px;" @change="choseCity">
                <el-option v-for="item in shi1" :key="item.Re_GUID" :label="item.Re_Name"
                           :value="item.Re_GUID"></el-option>
              </el-select>
              <el-select v-model="qu" placeholder="区级" style="width: 80px;">
                <el-option v-for="item in qu1" :key="item.Re_GUID" :label="item.Re_Name" :value="item.Re_GUID">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="Fe_Level">
              <div class="HintName">门店级别</div>
              <el-select v-model="AddManagerForm.Fe_Level" placeholder="请选择级别">
                <el-option v-for="item in Fe_Level" :key="item.Co_Values" :label="item.Co_Name"
                           :value="item.Co_Values"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="Fe_ReserveStartTime">
              <div class="HintName">门店接受预约开始时间</div>
              <el-time-select
                v-model="AddManagerForm.Fe_ReserveStartTime"
                :picker-options="{start:'09:00',step:'00:30',end:'22:00'}"
                placeholder="时-分">
              </el-time-select>
            </el-form-item>
            <el-form-item prop="Fe_Email">
              <div class="HintName">电子邮箱</div>
              <el-input v-model="Fe_Email" placeholder="请输入电子邮箱"
              ></el-input>
            </el-form-item>
          </div>
          <!--横-4-->
          <div class="divOption">
            <el-form-item prop="Fe_OpenDate">
              <div class="HintName">开店日期</div>
              <el-date-picker v-model="AddManagerForm.Fe_OpenDate" type="date"
                              placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="Fe_WebPage">
              <div class="HintName">公司网站</div>
              <el-input v-model="AddManagerForm.Fe_WebPage" placeholder="请输入公司网站"></el-input>
            </el-form-item>
            <el-form-item prop="Fe_ReserveEndTime">
              <div class="HintName">门店接受预约结束时间</div>
              <el-time-select
                v-model="AddManagerForm.Fe_ReserveEndTime"
                :picker-options="{start:'09:00',step:'00:30',end:'22:00'}"
                placeholder="时-分">
              </el-time-select>
            </el-form-item>
            <el-form-item prop="Fe_IsReserve">
              <div class="HintName">是否开放微信预约</div>
              <el-radio v-model="radio_IsReserve" label="1">是</el-radio>
              <el-radio v-model="radio_IsReserve" label="0">否</el-radio>
            </el-form-item>
          </div>
          <!--横-5-->
          <div class="divOption">
            <el-form-item prop="Fe_Tel">
              <div class="HintName">门店电话</div>
              <el-input v-model="AddManagerForm.Fe_Tel" placeholder="请输入门店电话"
              ></el-input>
            </el-form-item>
            <el-form-item prop="Fe_Adrress">
              <div class="HintName">门店地址</div>
              <el-input v-model="AddManagerForm.Fe_Adrress" placeholder="请输入门店地址"
              ></el-input>
            </el-form-item>
            <el-form-item prop="Fe_Fax">
              <div class="HintName">传真号码</div>
              <el-input v-model="Fe_Fax" placeholder="请输入传真号码"></el-input>
            </el-form-item>
            <el-form-item prop="Fe_CopeBusiness">
              <div class="HintName">经营范围</div>
              <el-radio v-model="radio_Cope" label="1">美容</el-radio>
              <el-radio v-model="radio_Cope" label="0">美发</el-radio>
            </el-form-item>
          </div>
        </div>
        <div style="float: left;padding-left: 20px;background-color: white;text-align: left;width: 98%">
          <el-form-item prop="Fe_StoreSqure">
            <div class="HintName">门店商圈</div>
            <el-select v-model="AddManagerForm.Fe_BusinessDistrict" placeholder="商圈" style="width: 120px;">
              <el-option v-for="item in DistrictList" :key="item.Co_Values" :label="item.Co_Name"
                         :value="item.Co_Values"></el-option>
            </el-select>
            <el-select v-model="AddManagerForm.Fe_SubWay" placeholder="地铁线" style="width: 120px;" @change="choseSubWay">
              <el-option v-for="item in SubWayList" :key="item.Co_Code" :label="item.Co_Name"
                         :value="item.Co_Code"></el-option>
            </el-select>
            <el-select v-model="AddManagerForm.Fe_Station" placeholder="地铁站" style="width: 120px;">
              <el-option v-for="item in StationList" :key="item.Co_Values" :label="item.Co_Name"
                         :value="item.Co_Values">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div style="display: flex;background-color: white;text-align: left;width: 98%;padding-left: 20px;">
          <el-form-item label="门店特色" style="width:30%;">
            <el-input v-model="Fe_Special" type="textarea" :rows="4" style="margin-top: -15px;"
                      placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="门店介绍" style="width: 30%;margin-left: 20px;">
            <el-input v-model="Fe_Desc" type="textarea" :rows="4" style="margin-top: -15px;"
                      placeholder="请输入内容"></el-input>
          </el-form-item>
        </div>
        <!--上传图片-->
        <div
          style="display: flex;margin-top: -10px;background-color: white;text-align: left;width: 98%;padding-left: 20px;">
          <el-form-item>
            <div class="HintName">精度/纬度</div>
            <el-input v-model="Fe_LocationX" placeholder="精度" prop="Fe_LocationX"
                      class="locationWidth"></el-input>
            <el-input v-model="Fe_LocationY" placeholder="纬度" prop="Fe_LocationY"
                      class="locationWidth"></el-input>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="QueryMap" style="height: 38px;">查询
            </el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <QueryMap></QueryMap>

  </div>
</template>

<script>
  import QueryMap from "./QueryMap"
  import {AddStoreTreeList, GetProvinceList, GetCityList, CommonDictionaryTree} from "../../../config/Api.js"

  export default {
    data() {
      return {
        AddManagerForm: {
          Fe_Name: '',
          Fe_LinkName: '',
          Fe_OpenStartTime: '',
          Fe_ShotName: '',
          Fe_Type: '',
          Fe_OpenEndTime: '',
          Fe_Level: '',
          Fe_ReserveStartTime: '',
          Fe_OpenDate: '',
          Fe_WebPage: '',
          Fe_ReserveEndTime: '',
          Fe_Tel: '',
          Fe_Adrress: '',
          Fe_StoreSqure: '',
          Fe_BusinessDistrict: '',
          Fe_SubWay: '',
          Fe_Station:  '',
        },
        Fe_Fax: '',
        Fe_LicenceReceiveTime: '',
        Fe_LicenceDate: '',
        radio_IsReserve: '1',
        radio_Cope: '1',
        Fe_Email: '',
        Fe_Special: '',
        Fe_Desc: '',
        Fe_LocationX: '',
        Fe_LocationY: '',
        Fe_Type: [],
        Fe_Level: [],
        //地区
        province: '',
        shi: '',
        shi1: [],
        qu: '',
        qu1: [],
        provinceList: [],
        DistrictList: [],//商圈
        SubWayList: [],//地铁
        StationList: [],//地铁站
        rules: {
          Fe_Name: [
            {required: true, message: '请输入门店名称', trigger: 'blur'},
            {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
          ],
          Fe_OpenDate: [
            {required: true, message: '请选择开店日期', trigger: 'blur'}],
          province: [
            {required: true, message: '请选择省份', trigger: 'blur'}],
          shi: [
            {required: true, message: '请选择市区', trigger: 'blur'}],
          qu: [
            {required: true, message: '请选择地区', trigger: 'blur'}],
          Fe_LinkName: [
            {required: true, message: '请输入门店联系人', trigger: 'blur'}],
          Fe_Type: [
            {required: true, message: '请选择门店类型', trigger: 'blur'}],
          Fe_Level: [
            {required: true, message: '请选择门店级别', trigger: 'blur'}],
        },
      }
    },
    created() {
      this.getProvinceData();
      this.queryStoreSelectData();
    },
    components: {
      QueryMap
    },
    methods: {
      //查询门店级别AI09 门店类型AT19 下拉框数据
      queryStoreSelectData() {
        let params = {
          CoCode: ["AI09", "AT19", "AQ16", "AI17"],
        };
        this.$http.post(CommonDictionaryTree, this.$qs.stringify(params)).then(resp => {
          for (let position in resp.data.data) {
            if (resp.data.data[position].Co_Code === 'AI09') {
              this.Fe_Level = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AT19') {
              this.Fe_Type = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AQ16') {
              this.DistrictList = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AI17') {
              this.SubWayList = resp.data.data[position].List;
            }
          }
        })
      },
      //获取省份数据
      getProvinceData() {
        this.$http.get(GetProvinceList).then(resp => {
          this.provinceList = resp.data.data;
        })
      },
      //点击省份获取当前选择的省份的id
      choseProvince(data) {
        this.getCityData(data);
      },
      //获取市区及地区的数据 (Id=父级ID)
      getCityData(Id) {
        this.$http.get(GetCityList + Id).then(resp => {
          this.shi1 = resp.data.data;
        })
      },
      //获取市区及地区的数据 (Id=父级ID)
      getBlockData(Id) {
        this.$http.get(GetCityList + Id).then(resp => {
          this.qu1 = resp.data.data;
        })
      },
      //选择市区
      choseCity(data) {
        this.getBlockData(data);
      },
      //获取地铁站的数据 (Id=父级ID)
      getSubWayData(Id) {
        let params = {
          CoCode: [Id,],
        };
        this.$http.post(CommonDictionaryTree, this.$qs.stringify(params)).then(resp => {
          this.StationList = resp.data.data[0].List;
        })
      },
      //选择地铁线
      choseSubWay(data) {
        this.getSubWayData(data);
      },
      //添加层级管理
      addManagerMethod() {
        let Fe_ParentId = this.$route.params.Co_GUID; //父级=父类的Guid
        let params = {
          Fe_Name: this.AddManagerForm.Fe_Name,
          Fe_ShotName: this.AddManagerForm.Fe_ShotName,
          Fe_Province: this.province,
          Fe_City: this.shi,
          Fe_Region: this.qu,
          Fe_ParentId: Fe_ParentId,
          Fe_OpenDate: this.AddManagerForm.Fe_OpenDate,
          Fe_Tel: this.AddManagerForm.Fe_Tel,
          Fe_Adrress: this.AddManagerForm.Fe_Adrress,
          Fe_Type: this.AddManagerForm.Fe_Type,
          Fe_Level: this.AddManagerForm.Fe_Level,
          Fe_WebPage: this.AddManagerForm.Fe_WebPage,
          Fe_OpenStartTime: this.AddManagerForm.Fe_OpenStartTime,
          Fe_OpenEndTime: this.AddManagerForm.Fe_OpenEndTime,
          Fe_ReserveStartTime: this.AddManagerForm.Fe_ReserveStartTime,
          Fe_ReserveEndTime: this.AddManagerForm.Fe_ReserveEndTime,
          Fe_LicenceReceiveTime: this.Fe_LicenceReceiveTime,
          Fe_Email: this.Fe_Email,
          Fe_LocationX: this.Fe_LocationX,
          Fe_LocationY: this.Fe_LocationY,
          Fe_IsReserve: this.radio_IsReserve,
          Fe_Desc: this.Fe_Desc,
          Fe_Special: this.Fe_Special,
          Fe_LicenceDate: this.Fe_LicenceDate,
          Fe_LinkName: this.AddManagerForm.Fe_LinkName,
          Fe_CopeBusiness: this.radio_Cope,
          Fe_Fax: this.Fe_Fax,
          Fe_HeadImg: '',//门头照
          Fe_LOG: '',//门点LOG图
          Fe_ErMaImage: '',//二维码图片
          Fe_BusinessDistrict: this.AddManagerForm.Fe_BusinessDistrict,//商圈
          Fe_SubWay: this.AddManagerForm.Fe_SubWay,//地铁
          Fe_Station: this.AddManagerForm.Fe_Station,//地铁站
        };
        this.$http.post(AddStoreTreeList, this.$qs.stringify(params)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            });
          }
        })
      },
      //提交表单
      submitManangerMethod(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addManagerMethod();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //取消输入内容
      resetManagerForm(AddManagerForm) {
        this.$refs[AddManagerForm].resetFields();
      },
      //查询经纬度（地图）
      QueryMap() {
        this.$store.state.queryMapIsShow = true;
      },
    },
    name: "AddStoreManager"
  }
</script>

<style>
  .el-input__inner {
    height: 30px !important;
  }
</style>
<style scoped>
  .btnBox {
    margin-bottom: 10px;
    text-align: end;
    width: 98%;
  }

  .divFourLine {
    width: 100%;
    height: 100%;
  }

  .HintName {
    color: #606266;
    font-size: 14px;
    line-height: 25px;
  }

  .divOption {
    display: block;
    width: 17.5%;
    text-align: left;
    float: left;
    background-color: white;
    padding: 10px 20px 0 20px;
  }

  .locationWidth {
    width: 100px;
  }
</style>
