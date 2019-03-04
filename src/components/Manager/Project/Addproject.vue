<template>
  <div>
    <div>

      <div style="width: 98%;text-align: right">
        <el-button type="primary" icon="el-icon-circle-close-outline" @click="resetSupplierForm('AddProject')">取消
        </el-button>
        <el-button type="primary" icon="el-icon-edit-outline" @click="submitSupplier('AddProject')">保存
        </el-button>
      </div>
    </div>
    <!--卡片tags-->
    <div style="margin-top: 20px">
      <el-tabs type="border-card">
        <!--基本信息-->
        <el-tab-pane label="基本信息">
          <div class="infoBox">
            <el-form :model="AddProject" :rules="rules" ref="AddProject" class="addForm" status-icon :inline="true"
                     label-position="top">
              <div style="text-align: left;" class="divOption">
                <el-form-item prop="Pro_Name" class="testAlign">
                  <div class="textClass">项目名称<a>*</a></div>
                  <el-input v-model="AddProject.Pro_Name"
                            placeholder="请输入项目名称"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_DepartmentCode" class="testAlign">
                  <div class="textClass">归属部门</div>
                  <el-select v-model="AddProject.Pro_DepartmentCode" placeholder="请选择归属部门">
                    <el-option v-for="item in Pro_DepartmentCode" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="Pro_Barcode" class="testAlign">
                  <div class="textClass">项目条码</div>
                  <el-input v-model="AddProject.Pro_Barcode"
                            placeholder="请输入项目条码"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_ChargType" class="testAlign">
                  <div class="textClass">收费性质</div>
                  <el-select v-model="AddProject.Pro_ChargType" placeholder="请选择收费性质">
                    <el-option v-for="item in Pro_ChargType" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>
                <div>
                  图片
                </div>
                <Upload></Upload>
              </div>
              <div class="divOption">
                <el-form-item prop="Pro_PIClassType" class="testAlign">
                  <div class="textClass">项目类别<a>*</a></div>
                  <el-select v-model="AddProject.Pro_PIClassType" placeholder="请选择项目类别">
                    <el-option v-for="item in Pro_PIClassType" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="Pro_TimesCountType" class="testAlign">
                  <div class="textClass">计次方式</div>
                  <el-select v-model="AddProject.Pro_TimesCountType" placeholder="请选择计次方式">
                    <el-option v-for="item in Pro_TimesCountType" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="Pro_StandardHour" class="testAlign">
                  <div class="textClass">标准工时</div>
                  <el-input v-model="AddProject.Pro_StandardHour"
                            placeholder="请输入标准工时"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_FenDianPrice" class="testAlign">
                  <div class="textClass">门店体验价格 <a v-show="radioed">*</a></div>
                  <el-input v-model="AddProject.Pro_FenDianPrice"
                            placeholder="请输入门店体验价格"></el-input>
                </el-form-item>
              </div>
              <div class="divOption">
                <el-form-item prop="Pro_SalePrice" class="testAlign">
                  <div class="textClass">销售单价<a>*</a></div>
                  <el-input v-model="AddProject.Pro_SalePrice"
                            placeholder="请输入销售单价"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_IntegralTypeCode" class="testAlign">
                  <div class="textClass">积分方式</div>
                  <el-select v-model="AddProject.Pro_IntegralTypeCode" placeholder="请选择积分方式">
                    <el-option v-for="item in Pro_IntegralTypeCode" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="Pro_IntegralRate" class="testAlign">
                  <div class="textClass">积分比率</div>
                  <el-input v-model="AddProject.Pro_IntegralRate"
                            placeholder="请输入积分比率"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_IsFenDianPrice" class="testAlign" style="width: 180px">
                  <div class="textClass">是否启用门店体验价格</div>
                  <el-radio v-model="AddProject.Pro_IsFenDianPrice" label="1" @change="radioe(1)">是</el-radio>
                  <el-radio v-model="AddProject.Pro_IsFenDianPrice" label="0" @change="radioe(0)">否</el-radio>
                </el-form-item>
              </div>
              <div class="divOption">
                <el-form-item prop="Pro_VisitInterval" class="testAlign">
                  <div class="textClass">回访间隔</div>
                  <el-input v-model="AddProject.Pro_VisitInterval"
                            placeholder="请输入回访间隔"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_StatisticalTypeCode" class="testAlign">
                  <div class="textClass">统计分类</div>
                  <el-select v-model="AddProject.Pro_StatisticalTypeCode" placeholder="请选择统计分类">
                    <el-option v-for="item in Pro_StatisticalTypeCode" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="Pro_IsUseCash" class="testAlign">
                  <div class="textClass">是否可以使用现金</div>
                  <el-radio v-model="AddProject.Pro_IsUseCash" label="1">是</el-radio>
                  <el-radio v-model="AddProject.Pro_IsUseCash" label="0">否</el-radio>
                </el-form-item>
                <el-form-item prop="Pro_MemberPrice" class="testAlign">
                  <div class="textClass">统一会员价格 <a v-show="radioedg">*</a></div>
                  <el-input v-model="AddProject.Pro_MemberPrice"
                            placeholder="请输入门店体验价格"></el-input>
                </el-form-item>
              </div>
              <div class="divOption">
                <el-form-item prop="Pro_ShortLimit" class="testAlign">
                  <div class="textClass">安全次数</div>
                  <el-input v-model="AddProject.Pro_ShortLimit"
                            placeholder="请输入安全次数"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_It_SaleInterval" class="testAlign">
                  <div class="textClass">消费间隔</div>
                  <el-input v-model="AddProject.Pro_It_SaleInterval"
                            placeholder="请输入消费间隔"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_IsUseComent" class="testAlign">
                  <div class="textClass">是否可以评价</div>
                  <el-radio v-model="AddProject.Pro_IsUseComent" label="1">是</el-radio>
                  <el-radio v-model="AddProject.Pro_IsUseComent" label="0">否</el-radio>
                </el-form-item>
                <el-form-item prop="Pro_IsMemberPrice" class="testAlign">
                  <div class="textClass">是否启用统一会员价格</div>
                  <el-radio v-model="AddProject.Pro_IsMemberPrice" @change="rediod(1)" label="1">是</el-radio>
                  <el-radio v-model="AddProject.Pro_IsMemberPrice" @change="rediod(0)" label="0">否</el-radio>
                </el-form-item>
              </div>
              <div style="padding: 30px">
                <el-form-item class="testAlign" prop="Pro_Desc" style="margin:-15px 0px 0px 15px">
                  <div class="textClass">备注</div>
                  <el-input v-model="AddProject.Pro_Desc" type="textarea" :rows="7" class="desc"
                            placeholder="请输入备注"></el-input>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </el-tab-pane>
        <!--选择门店页面-->
        <el-tab-pane label="选择使用门店/价格">
          <div class="changeStore" v-if="qwe">
            <div class="store">
              <div style="display:inline"><img src="../../../../static/images/select_store.png"/>
                <ModelBox style="display:inline" @modelBox="modelBox"></ModelBox>
              </div>
              <div style="display:inline"><img src="../../../../static/images/piliang.png"/>
                <setup style="display:inline" @setup="setup"></setup>
              </div>
            </div>
            <el-table :data=acmodexTreeb style="width: 100%; color: #3a3a3a;"
                      :header-cell-style="{background:'#f0f8ff'}" align="center" height="630px">
              <el-table-column prop="code" label="门店编号" align="center"></el-table-column>
              <el-table-column prop="name" label="门店名称" align="center"></el-table-column>
              <el-table-column label="销售成本" align="center">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.PI_SalePrice"
                    placeholder="请输入销售成本">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column label="门店价格" align="center">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.PI_FendianPrice"
                    placeholder="请输入门店价格"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="卡级价格" align="center">
                <template slot-scope="scope">
                  <addProCard :parentMessage="scope.row.value" :AddOrUpdata="AddCardPrice" :submitSuccess="IsSubmitSuccess" @AddProCard="AddProCard"></addProCard>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <!--上传图片页面-->
        <el-tab-pane label="上传图片">
          <maxUpload></maxUpload>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import {AddProductItem, CarFendian, AddProduct} from "../../../config/Api"
  import {CommonDictionaryTree} from "../../../config/Api"
  import ModelBox from "../../ModelBox"
  import Upload from "../../Upload"
  import maxUpload from "../../maxUpload"
  import addProCard from "./AddProCard"
  import setup from "../Product/Setup"

  export default {
    components: {
      ModelBox,
      Upload,
      maxUpload,
      addProCard,
      setup,
    },
    data() {
      return {
        AddCardPrice:'AddCardPrice',
        IsSubmitSuccess:'',
        cost: '',
        PI_SalePrice: '',
        radioed: true,
        radioedg: true,
        PI_FendianPrice: '',
        AddFendian: {
          PI_SalePrice: '',
          PI_FendianPrice: '',
          FendianCode: '',
        },
        parentMessage: '',
        Proid: '',
        AddProject: {
          Pro_GUID: '',
          Pro_Code: '',    //项目编号
          Pro_FenDianPrice: '',//门店价格
          Pro_Name: '',     //项目名称
          Pro_PIClassType: '', //项目类别
          Pro_Barcode: '', //项目条码
          Pro_MemberPrice: '',//统一会员价格
          Pro_IsMemberPrice: '1',//是否启用统一会员价格
          Pro_SalePrice: '', //销售单价
          Pro_StandardHour: '',//标准工时
          Pro_ShortLimit: '',//安全次数
          Pro_IntegralRate: '',//积分比率
          Pro_It_SaleInterval: '',//消费间隔
          Pro_VisitInterval: '',//回访间隔
          Pro_IsFenDianPrice: '1',//是否启用门店价格 0 否 1为是
          Pro_IsUseCash: '1',//是否可以使用现金
          Pro_IsUseComent: '1',//是否可以评价
          Pro_Desc: '',//备注
          Pro_CostPrice: '',//销售成本
          Pro_TypeCode: 2,//项目于产品区别   1产品 2项目
        },
        // Isfen:false,
        acmodexTreeb: [],
        FendianCode: '',
        qwe: true,
        Pro_StatisticalTypeCode: [],//统计分类
        Pro_ChargType: [],//收费性质
        Pro_TimesCountType: [],//计次方式
        Pro_DepartmentCode: [],//归属部门
        Pro_IntegralTypeCode: [],//积分方式
        Pro_PIClassType: [], //项目类别
        //门店
        tableUserList: [],
        treeSelect: [],
        tabData: [],
        tabg: {},
        rules:
          {
            Pro_Name: [
              {required: true, message: '请输入项目名称', trigger: 'blur'},
            ],
            Pro_PIClassType: [
              {required: true, message: '请选择项目类别', trigger: 'blur'},
            ],
            Pro_SalePrice: [
              {required: true, message: '请输入销售单价', trigger: 'blur'},
            ],
            Pro_FenDianPrice: [
              {required: true, message: '请输入门店价格', trigger: 'blur'},
            ],
            Pro_MemberPrice: [
              {required: true, message: '请输入统一会员价格', trigger: 'blur'},
            ],
          },
      };
    },
    created() {
      this.select();
    },
    methods: {
      //批量设置
      reload() {
        this.qwe = false;
        this.$nextTick(function () {
          this.qwe = true;
        })
      },
      //获取卡级组
      AddProCard(val) {
        console.log("AddProCard");
        console.log(val);
        console.log('this.table');
        console.log(this.table);
        this.table = val;
        if (this.table.length > 0) {
          for (var i = 0; i < this.table.length; i++) {
            this.tabg = {};
            this.tabg.ProF_CardPrice = this.table[i].ProF_CardPrice;
            this.tabg.ProF_CardDiscount = this.table[i].ProF_CardDiscount;
            this.tabg.Fe_GUID = this.table[i].parentMessage;
            this.tabg.Ca_GUID = this.table[i].Ca_GUID;
            this.tabData.push(this.tabg);
          }
        }
      },
      //添加卡级
      addP() {
        var kaji = {};
        var obj = {};
        for (var i = 0; i < this.tabData.length; i++) {
          this.tabData[i].Pro_GUID = this.AddProject.Pro_GUID;
        }
        obj = this.tabData;
        kaji.ProductItemFDCardPrice = obj;
        this.$http.post(AddProduct, this.$qs.stringify(kaji)).then(resp => {
        })
      },
      //批量设置模态框
      setup(value) {
        this.SetupList = value;
        if (this.SetupList.name === '1') {
          if (this.acmodexTreeb.length > 0) {
            for (var i = 0; i < this.acmodexTreeb.length; i++) {
              this.acmodexTreeb[i].PI_SalePrice = this.SetupList.value;
            }
            this.reload();
          }
        } else if (this.SetupList.name === '2') {
          if (this.acmodexTreeb.length > 0) {
            for (var i = 0; i < this.acmodexTreeb.length; i++) {
              this.acmodexTreeb[i].PI_FendianPrice = this.SetupList.value;
            }
            this.reload();
          }
        }
      },
      //启用选择门店
      radioe(val) {
        if (val === 1) {
          this.radioed = true;
          this.rules.Pro_FenDianPrice[0].required = true;
        } else if (val === 0) {
          this.rules.Pro_FenDianPrice[0].required = false;
          this.radioed = false;
        }
      },
      //是否启用统一会员价格
      rediod(val) {
        if (val === 1) {
          this.radioedg = true;
          this.rules.Pro_MemberPrice[0].required = true;
        } else if (val === 0) {
          this.rules.Pro_MemberPrice[0].required = false;
          this.radioedg = false;
        }
      },
      //添加门店
      addFendian() {
        var fendian = {};
        var obj = {};
        if (this.acmodexTreeb.length > 0) {
          for (var i = 0; i < this.acmodexTreeb.length; i++) {
            this.acmodexTreeb[i].Pro_GUID = this.AddProject.Pro_GUID;
            this.acmodexTreeb[i].Fe_GUID = this.acmodexTreeb[i].value;
          }
          obj = this.acmodexTreeb;
          fendian.ProductItemFendian = obj;
          this.$http.post(CarFendian, this.$qs.stringify(fendian)).then(resp => {
          });
          this.addP();
        }
      },
      //模态框子传父
      modelBox(value) {
        this.acmodexTreeb = value;
      },
      //获取下拉列表框
      select() {
        let selected = {
          CoCode: ["AV21", "AW22", "AX23", "AC03", "AY24", "BB27"],
        };
        this.$http.post(CommonDictionaryTree, this.$qs.stringify(selected)).then(resp => {
          for (let position in resp.data.data) {
            if (resp.data.data[position].Co_Code === 'AV21') {
              this.Pro_DepartmentCode = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AW22') {
              this.Pro_ChargType = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AX23') {
              this.Pro_TimesCountType = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AC03') {
              this.Pro_PIClassType = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AY24') {
              this.Pro_IntegralTypeCode = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'BB27') {
              this.Pro_StatisticalTypeCode = resp.data.data[position].List;
            }
          }
        })
      },
      //添加方法
      addProject() {
        let params = {
          Pro_FenDianPrice: this.AddProject.Pro_FenDianPrice,
          Pro_Name: this.AddProject.Pro_Name,     //项目名称
          Pro_PIClassType: this.AddProject.Pro_PIClassType, //项目类别
          Pro_StatisticalTypeCode: this.AddProject.Pro_StatisticalTypeCode,//项目大类
          Pro_Barcode: this.AddProject.Pro_Barcode, //项目条码
          Pro_MemberPrice: this.AddProject.Pro_MemberPrice,//统一会员价格
          Pro_IsMemberPrice: this.AddProject.Pro_IsMemberPrice,//是否启用统一会员价格
          Pro_SalePrice: this.AddProject.Pro_SalePrice, //销售单价
          Pro_DepartmentCode: this.AddProject.Pro_DepartmentCode,//归属部门
          Pro_StandardHour: this.AddProject.Pro_StandardHour,//标准工时
          Pro_TimesCountType: this.AddProject.Pro_TimesCountType,//计次方式
          Pro_ShortLimit: this.AddProject.Pro_ShortLimit,//安全次数
          Pro_ChargType: this.AddProject.Pro_ChargType,//收费性质
          Pro_IntegralTypeCode: this.AddProject.Pro_IntegralTypeCode,//积分方式
          Pro_IntegralRate: this.AddProject.Pro_IntegralRate,//积分比率
          Pro_It_SaleInterval: this.AddProject.Pro_It_SaleInterval,//消费间隔
          Pro_VisitInterval: this.AddProject.Pro_VisitInterval,//回访间隔
          Pro_IsFenDianPrice: this.AddProject.Pro_IsFenDianPrice,//是否启用门店价格 0 否 1为是
          Pro_IsUseCash: this.AddProject.Pro_IsUseCash,//是否可以使用现金
          Pro_IsUseComent: this.AddProject.Pro_IsUseComent,//是否可以评价
          Pro_Desc: this.AddProject.Pro_Desc,//备注
          Pro_CostPrice: this.AddProject.Pro_CostPrice,//销售成本
          Pro_TypeCode: 2,//项目
        };
        this.$http.post(AddProductItem, this.$qs.stringify(params)).then(resp => {
          this.AddProject.Pro_GUID = resp.data.data.Pro_GUID;
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '添加基础信息成功',
              type: 'success'
            });
            this.addFendian();
          }
        });
      },
      //提交表单
      //基础信息
      submitSupplier(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.IsSubmitSuccess='Success';
            this.addProject();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //取消输入内容
      resetSupplierForm(AddProject) {
        this.$refs[AddProject].resetFields();
      }
    }
  }
</script>
<style>
  .infoBox .el-input__inner {
    height: 30px !important;
    font-size: 12px;
    margin-right: 2px;
  }

  .infoBox {
    text-align: left;
    margin-left: 20px;
  }

  /*.testAlign {*/
  /*width: 15%;*/

  /*}*/

</style>
<style scoped>

  .divOption {
    display: block;
    width: 15%;
    text-align: left;
    float: left;
    background-color: white;
    padding: 10px 20px 0 20px;
  }

  .textClass {
    margin: 0px 0px -17px 0px;
  }

  .textClass a {
    color: red;
  }

  .desc {
    margin-top: 7px;
  }

  .store {
    overflow: hidden;
    color: #0082d6;
    float: left;
  }
</style>
