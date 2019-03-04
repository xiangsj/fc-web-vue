<template>
  <div>
    <div align="right">
      <template>
        <el-button type="primary" style="margin-right: 10px" icon="el-icon-circle-plus-outline" @click="saveManager"
                   class="add_save">保存
        </el-button>
        <el-button type="primary" style="margin-right: 50px" icon="el-icon-circle-plus-outline" @click="addManager"
                   class="add_save">添加
        </el-button>
      </template>
    </div>
    <div style="width: 100%;height: 720px;margin-top: 10px">
      <!--左边父类tree-->
      <div class="divLeft" style="width: 18%;margin-left: 20px;background-color: white;float: left">
        <div
          style="background-color:#c6e2ff;text-align: left;padding-left: 15px;line-height: 35px;vertical-align: center;border-top-left-radius: 2px;border-top-right-radius: 2px;">
          门店
        </div>
        <el-input v-model="searchValue" placeholder="请输入店名" style="margin: 10px;width: 96%;">
          <el-button slot="append" icon="el-icon-search" @click="searchTree"></el-button>
        </el-input>

        <el-tree node-key="value" ref="tree" :default-expanded-keys="[0,1]" :default-checked-keys="[0,2]"
                 :data="saveManagerList" :props="ManagerProps" @check-change="getCheckedNodes"
                 @node-click="handleNodeClick">
        </el-tree>
      </div>
      <!--右边父类-->
      <div class="divRight" v-if="showDiv"
           style="width: 80%;text-align: left;float: right;padding-top:10px;background-color: white;">
        <el-form :model="SaveManagerForm" :rules="rules" ref="saveManagerForm" status-icon :inline="true"
                 label-position="top">
          <div style="width: 100%">
            <!--111111-->
            <div class="divOption">
              <el-form-item prop="Fe_Name" style="padding-left: 20px;">
                <div class="HintName">门店名称</div>
                <el-input v-model="SaveManagerForm.Store_Name" placeholder="请输入门店名称"
                ></el-input>
              </el-form-item>
              <el-form-item prop="Fe_LinkName" style="padding-left: 20px;margin-top: -15px;">
                <div class="HintName">门店联系人</div>
                <el-input v-model="SaveManagerForm.Store_LinkName" placeholder="请输入门店联系人"
                ></el-input>
              </el-form-item>
              <el-form-item prop="Fe_OpenStartTime" style="padding-left: 20px;margin-top: -15px;">
                <div class="HintName">门店营业开始时间</div>
                <el-time-select
                  v-model="SaveManagerForm.OpenStartTime"
                  :picker-options="{start:'09:00',step:'00:30',end:'22:00'}"
                  placeholder="时-分">
                </el-time-select>
              </el-form-item>
              <el-form-item prop="Fe_Fax" style="padding-left: 20px;margin-top: -15px;">
                <div class="HintName">传真号码</div>
                <el-input v-model="Fe_Fax" placeholder="请输入传真号码"
                ></el-input>
              </el-form-item>
              <el-form-item prop="Fe_StoreSqure" style="padding-left: 20px;margin-top: -15px;">
                <div class="HintName">门店商圈</div>
                <el-select v-model="SaveManagerForm.Fe_BusinessDistrict" placeholder="商圈" style="width: 80px;">
                  <el-option v-for="item in DistrictList" :key="item.Co_Values" :label="item.Co_Name"
                             :value="item.Co_Values"></el-option>
                </el-select>
                <el-select v-model="SaveManagerForm.Fe_SubWay" placeholder="地铁线" style="width: 80px;"
                           @change="choseSubWay">
                  <el-option v-for="item in SubWayList" :key="item.Co_Code" :label="item.Co_Name"
                             :value="item.Co_Code"></el-option>
                </el-select>
                <el-select v-model="SaveManagerForm.Fe_Station" placeholder="地铁站" style="width: 85px;">
                  <el-option v-for="item in StationList" :key="item.Co_Values" :label="item.Co_Name"
                             :value="item.Co_Values">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <!--222222-->
            <div class="divOption">
              <el-form-item prop="Fe_ShotName">
                <div class="HintName">门店简称</div>
                <el-input v-model="SaveManagerForm.Store_ShotName" placeholder="请输入门店简称"
                ></el-input>
              </el-form-item>
              <el-form-item prop="Fe_Type" class="ForTopDistance">
                <div class="HintName">门店类型</div>
                <el-select v-model="SaveManagerForm.Store_Type" placeholder="请选择类型">
                  <el-option v-for="item in Store_Type" :key="item.Co_Values" :label="item.Co_Name"
                             :value="item.Co_Values"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="Fe_OpenEndTime" class="ForTopDistance">
                <div class="HintName">门店营业结束时间</div>
                <el-time-select
                  v-model="SaveManagerForm.OpenEndTime"
                  :picker-options="{start:'09:00',step:'00:30',end:'22:00'}"
                  placeholder="时-分">
                </el-time-select>
              </el-form-item>
              <el-form-item prop="Fe_LicenceReceiveTime" class="ForTopDistance">
                <div class="HintName">营业执照领取时间</div>
                <el-date-picker v-model="Fe_LicenceReceiveTime" type="date"
                                placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item prop="Fe_Tel" class="ForTopDistance">
                <div class="HintName">门店电话</div>
                <el-input v-model="SaveManagerForm.Fe_Tel" placeholder="请输入门店电话"
                ></el-input>
              </el-form-item>
            </div>
            <!--333333-->
            <div class="divOption">
              <!--这个change事件是select的，不是option的，别写在option里面-->
              <el-form-item prop="Fe_Region">
                <div class="HintName">行政地区</div>
                <el-select v-model="value" placeholder="请输入省" style="width: 80px;" @change="choseProvince"
                           prop="Re_GUID">
                  <el-option v-for="item in sheng" :key="item.Re_GUID" :label="item.Re_Name"
                             :value="item.Re_GUID"></el-option>
                </el-select>
                <el-select v-model="shi" @change="choseCity" placeholder="请输入市" style="width: 80px;">
                  <el-option v-for="item in shi1" :key="item.Re_GUID" :label="item.Re_Name"
                             :value="item.Re_GUID"></el-option>
                </el-select>
                <el-select v-model="qu" placeholder="请输入区" style="width: 80px;">
                  <el-option v-for="item in qu1" :key="item.Re_GUID" :label="item.Re_Name" :value="item.Re_GUID">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="Fe_Level" class="ForTopDistance">
                <div class="HintName">门店级别</div>
                <el-select v-model="SaveManagerForm.Store_Level" placeholder="请选择级别">
                  <el-option v-for="item in Store_Level" :key="item.Co_Values" :label="item.Co_Name"
                             :value="item.Co_Values"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="Fe_ReserveStartTime" class="ForTopDistance">
                <div class="HintName">门店接受预约开始时间</div>
                <el-time-select
                  v-model="SaveManagerForm.ReserveStartTime"
                  :picker-options="{start:'09:00',step:'00:30',end:'22:00'}"
                  placeholder="时-分">
                </el-time-select>
              </el-form-item>
              <el-form-item prop="Fe_Email" class="ForTopDistance">
                <div class="HintName">电子邮箱</div>
                <el-input v-model="Fe_Email" placeholder="请输入电子邮箱"
                ></el-input>
              </el-form-item>
              <el-form-item prop="Fe_Adrress" class="ForTopDistance">
                <div class="HintName">门店地址</div>
                <el-input v-model="SaveManagerForm.Fe_Adrress" placeholder="请输入门店地址"
                ></el-input>
              </el-form-item>
            </div>
            <!--444444-->
            <div class="divOption">
              <el-form-item prop="Fe_OpenDate">
                <div class="HintName">开店日期</div>
                <el-date-picker v-model="SaveManagerForm.Store_OpenDate" type="date"
                                placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item prop="Fe_WebPage" class="ForTopDistance">
                <div class="HintName">公司网站</div>
                <el-input v-model="SaveManagerForm.Store_WebPage" placeholder="请输入公司网站"
                ></el-input>
              </el-form-item>
              <el-form-item prop="Fe_ReserveEndTime" class="ForTopDistance">
                <div class="HintName">门店接受预约结束时间</div>
                <el-time-select
                  v-model="SaveManagerForm.ReserveEndTime"
                  :picker-options="{start:'09:00',step:'00:30',end:'22:00'}"
                  placeholder="时-分">
                </el-time-select>
              </el-form-item>
              <el-form-item label="" prop="Fe_IsReserve" class="ForTopDistance">
                <div class="HintName">是否开放微信预约</div>
                <el-radio @click.native.prevent="onChangeValue('1')" v-model="radio_IsReserve" label="1">是</el-radio>
                <el-radio @click.native.prevent="onChangeValue('0')" v-model="radio_IsReserve" label="0">否</el-radio>
              </el-form-item>
              <el-form-item prop="Fe_CloseDate" class="ForTopDistance">
                <div class="HintName">门店关门时间</div>
                <el-date-picker v-model="SaveManagerForm.Fe_CloseDate" type="date"
                                placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </div>
          </div>
          <!--555555-->
          <div style="float: left;">
            <el-form-item label="" prop="Fe_CopeBusiness" style="padding-left: 20px;margin-top: -15px;">
              <div style="line-height: 25px;">经营范围</div>
              <el-radio @click.native.prevent="onChangeType('1')" v-model="radio_Cope" label="1">美容</el-radio>
              <el-radio @click.native.prevent="onChangeType('0')" v-model="radio_Cope" label="0">美发</el-radio>
            </el-form-item>
            <el-form-item label="" prop="State" style="padding-left: 160px;margin-top: -15px;">
              <div style="line-height: 25px;">是否关店</div>
              <el-radio @click.native.prevent="onChangeState('1')" v-model="radio_State" label="1">是</el-radio>
              <el-radio @click.native.prevent="onChangeState('0')" v-model="radio_State" label="0">否</el-radio>
            </el-form-item>
          </div>
          <!--666666-->
          <div style="float: left;margin-top: -30px;width: 100%;">
            <el-form-item style="width: 35%;padding-left: 20px;">
              <div>门店特色</div>
              <el-input v-model="Fe_Special" type="textarea" :rows="4" style="margin-top: -5px;"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item style="width: 35%;margin-left: 20px;">
              <div>门店介绍</div>
              <el-input v-model="Fe_Desc" type="textarea" :rows="4" style="margin-top: -5px;"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
          </div>
          <!--777777-->
          <div style="float: left;margin-top: -20px;">

            <el-form-item style="padding-left: 20px;">
              <div class="HintName">门店门头照</div>
              <Upload></Upload>

            </el-form-item>
            <el-form-item style="padding-left:30px;">
              <div class="HintName">门店LOGO</div>
              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <el-form-item style="padding-left: 30px;">
              <div class="HintName">门店二维码</div>
              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </div>
          <!--888888-->
          <div style="float: left;margin-top: -20px;width: 100%;">
            <el-form-item label="" style="padding-left: 20px;">
              <div class="HintName">精度/纬度</div>
              <el-input v-model="Fe_LocationX" style="width: 120px;" placeholder="精度" prop="Fe_LocationX"
              ></el-input>
              <el-input v-model="Fe_LocationY" style="width: 120px;" placeholder="纬度" prop="Fe_LocationY"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    StoreTreeList,
    GetProvinceList,
    QueryStoreTreeList,
    GetCityList,
    CommonDictionaryTree
  } from '../../../config/Api.js'
  // import Upload from "../../../Upload";
  import Upload from '../../Upload'

  export default {
    components: {Upload},
    data() {
      return {
        searchValue: '', //搜索店名关键字
        saveManagerList: [],
        ManagerProps: {
          children: 'list',
          label: 'name'
        },
        GUID: '',
        SaveManagerForm: {
          Store_Name: '',
          Store_ShotName: '',
          Store_OpenDate: '',
          Store_LinkName: '',
          Store_WebPage: '',
          Store_Type: '',
          Store_Level: '',
          OpenStartTime: '',
          OpenEndTime: '',
          ReserveStartTime: '',
          ReserveEndTime: '',
          Fe_Tel: '',
          Fe_Adrress: '',
          Fe_CloseDate: '',
          Fe_StoreSqure: '',
          Fe_BusinessDistrict: '',
          Fe_SubWay: '',
          Fe_Station: '',
        },
        imageUrl: "../../../static/images/add_image.png",
        showDiv: false,
        radio_Cope: "",
        radio_State: "",
        radio_IsReserve: "",
        Fe_Special: "",
        Fe_Desc: "",
        Fe_LocationX: "",
        Fe_LocationY: "",
        Fe_Fax: "",
        Fe_LicenceReceiveTime: "",
        Fe_Email: "",
        Store_Type: [],//门店类型
        Store_Level: [], //门店级别
        DistrictList: [],//商圈
        SubWayList: [],//地铁
        StationList: [],//地铁站
        //地区
        value: '',
        sheng: [],
        shi: '',
        shi1: [],
        qu: '',
        qu1: [],
        city: '',
        block: '',
        rules: {
          Store_Name: [
            {required: true, message: '请输入门店名称', trigger: 'blur'},
            {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
          ],
          Store_OpenDate: [
            {required: true, message: '请选择开店日期', trigger: 'blur'}],
          value: [
            {required: true, message: '请选择省份', trigger: 'blur'}],
          shi: [
            {required: true, message: '请选择市区', trigger: 'blur'}],
          qu: [
            {required: true, message: '请选择地区', trigger: 'blur'}],
          Store_LinkName: [
            {required: true, message: '请输入门店联系人', trigger: 'blur'}],
          Store_Type: [
            {required: true, message: '请选择门店类型', trigger: 'blur'}],
          Store_Level: [
            {required: true, message: '请选择门店级别', trigger: 'blur'}],
        },
      }
    },
    created() {
      this.getManagerTree();
      this.getProvinceData();
      this.queryStoreSelectData();
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
              this.Store_Level = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AT19') {
              this.Store_Type = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AQ16') {
              this.DistrictList = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AI17') {
              this.SubWayList = resp.data.data[position].List;
            }
          }
        })
      },
      //获取大类
      getManagerTree() {
        this.$http.post(StoreTreeList).then(resp => {
          this.saveManagerList = resp.data.data;
        })
      },
      //图片回显与删除
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log(this.dialogImageUrl)
      },
      //节点改变时获取
      getCheckedNodes(data, checked, indeterminate) {
        console.log(data.name, checked, indeterminate);
        console.log(data.value, checked, indeterminate);
      },
      handleNodeClick(data) {
        this.GUID = data.value;
        if (this.GUID != null) {
          this.showDiv = true;
          this.queryStoreInfo(data.value);
        }
      },
      //获取省份数据
      getProvinceData() {
        this.$http.get(GetProvinceList).then(resp => {
          this.sheng = resp.data.data;

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
      //查询门店信息
      queryStoreInfo(guid) {
        this.$http.get(QueryStoreTreeList + guid).then(resp => {
          this.SaveManagerForm.Store_Name = resp.data.data.Fe_Name;
          this.SaveManagerForm.Store_ShotName = resp.data.data.Fe_ShotName;
          this.SaveManagerForm.Store_OpenDate = resp.data.data.Fe_OpenDate;
          this.SaveManagerForm.Store_LinkName = resp.data.data.Fe_LinkName;
          this.value = resp.data.data.Fe_Province;
          this.shi = resp.data.data.Fe_City;
          this.qu = resp.data.data.Fe_Region;
          this.SaveManagerForm.Store_Type = resp.data.data.Fe_Type;
          this.SaveManagerForm.Store_Level = resp.data.data.Fe_Level;
          this.SaveManagerForm.Store_WebPage = resp.data.data.Fe_WebPage;
          this.SaveManagerForm.OpenStartTime = resp.data.data.Fe_OpenStartTime;
          this.SaveManagerForm.OpenEndTime = resp.data.data.Fe_OpenEndTime;
          this.SaveManagerForm.ReserveStartTime = resp.data.data.Fe_ReserveStartTime;
          this.SaveManagerForm.ReserveEndTime = resp.data.data.Fe_ReserveEndTime;
          this.SaveManagerForm.Fe_Tel = resp.data.data.Fe_Tel;
          this.SaveManagerForm.Fe_Adrress = resp.data.data.Fe_Adrress;
          this.SaveManagerForm.Fe_CloseDate = resp.data.data.Fe_CloseDate;
          this.Fe_LicenceReceiveTime = resp.data.data.Fe_LicenceReceiveTime;
          this.Fe_Email = resp.data.data.Fe_Email;
          this.radio_IsReserve = resp.data.data.Fe_IsReserve + "";
          this.radio_Cope = resp.data.data.Fe_CopeBusiness + "";
          this.radio_State = resp.data.data.State + "";
          this.Fe_Special = resp.data.data.Fe_Special;
          this.Fe_Desc = resp.data.data.Fe_Desc;
          this.Fe_LocationX = resp.data.data.Fe_LocationX;
          this.Fe_LocationY = resp.data.data.Fe_LocationY;
          this.Fe_Fax = resp.data.data.Fe_Fax;
        })
      },
      onChangeValue(data) {
        this.radio_IsReserve = data;
      },
      onChangeType(data) {
        this.radio_Cope = data;
      },
      onChangeState(data) {
        this.radio_State = data;
      },
      //搜索
      searchTree() {
        this.getManagerTree();
      },
      //保存
      saveManager() {

      },
      //添加
      addManager() {
        this.$router.push({name: "storeManagerAdd", params: {Co_GUID: this.GUID}});
      },

      changeUpload(file) {
        console.log("file");
        console.log(file);
        this.imageUrl = file;
      },

    },
    name: "Index"
  }
</script>

<style>
  .divRight .el-input__inner {
    height: 30px !important;
  }
</style>

<style scoped>
  .add_save {
    height: 36px;
  }

  .divOption {
    display: block;
    width: 24%;
    text-align: left;
    float: left;
    background-color: white;
    padding: 0 10px 0 0;
  }

  .HintName {
    color: #606266;
    font-size: 14px;
    line-height: 30px;
  }

  .ForTopDistance {
    margin-top: -15px;
  }

</style>
