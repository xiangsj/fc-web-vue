<template>
  <div>
    <div>

      <div style="width: 98%;text-align: right">
        <el-button type="primary" icon="el-icon-circle-close-outline" @click="resetSupplierForm('AddProject')">取消
        </el-button>
        <el-button type="primary" icon="el-icon-edit-outline" @click ="submitSupplier('AddProject')">保存
        </el-button>
      </div>
    </div>
    <!--卡片tags-->
    <div style="margin-top: 20px">
      <el-tabs type="border-card">
        <!--基本信息-->
        <el-tab-pane label="基本信息">
          <div class="infoBox" >
            <el-form :model="AddProject"  :rules="rules" ref="AddProject" class="addForm" status-icon :inline="true"
                     label-position="top">
              <div style="text-align: left;" class="divOption">
                <el-form-item prop="Pro_PIClassType" class="testAlign">
                  <div class="textClass">产品类别<a>*</a></div>
                  <el-select v-model="AddProject.Pro_PIClassType" placeholder="请选择产品类别" >
                    <el-option v-for="item in Pro_PIClassType" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="Pro_MnemonicCode" class="testAlign">
                  <div class="textClass">产品助记码</div>
                  <el-input v-model="AddProject.Pro_MnemonicCode"
                            placeholder="请输入产品助记码"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_IntegralPrice" class="testAlign">
                  <div class="textClass">积分价格</div>
                  <el-input v-model="AddProject.Pro_IntegralPrice"
                            placeholder="请输入积分价格"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_VisitInterval" class="testAlign">
                  <div class="textClass">回访间隔</div>
                  <el-input v-model="AddProject.Pro_VisitInterval"
                            placeholder="请输入回访间隔"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_FenDianPrice" class="testAlign">
                  <div class="textClass">门店体验价格 <a v-show="radioed">*</a></div>
                  <el-input v-model="AddProject.Pro_FenDianPrice"
                            placeholder="请输入门店体验价格"></el-input>
                </el-form-item>
              </div>
              <div class="divOption">
                <el-form-item prop="Pro_Name" class="testAlign">
                  <div class="textClass">产品名称<a>*</a></div>
                  <el-input v-model="AddProject.Pro_Name"
                            placeholder="请输入产品名称"></el-input>
                </el-form-item>

                <el-form-item prop="Pro_StorageCode" class="testAlign">
                  <div class="textClass">存放仓库</div>
                  <el-select v-model="AddProject.Pro_StorageCode" placeholder="请选择存放仓库" >
                    <el-option v-for="item in Pro_StorageCode" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="Pro_IntegralRate" class="testAlign">
                  <div class="textClass">积分比率</div>
                  <el-input v-model="AddProject.Pro_IntegralRate"
                            placeholder="请输入积分比率"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_SaveLimit" class="testAlign">
                  <div class="textClass">超储界限</div>
                  <el-input v-model="AddProject.Pro_SaveLimit"
                            placeholder="请输入超储界限"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_IsFenDianPrice" class="testAlign" style="width: 180px">
                  <div class="textClass">是否启用门店体验价格</div>
                  <el-radio v-model="AddProject.Pro_IsFenDianPrice" @change="radioe(1)" label="1" >是</el-radio>
                  <el-radio v-model="AddProject.Pro_IsFenDianPrice" @change="radioe(0)" label="0">否</el-radio>
                </el-form-item>
              </div>

              <div class="divOption">
                <el-form-item prop="Pro_Unit" class="testAlign">
                  <div class="textClass">计量单位 <a>*</a></div>
                  <el-input v-model="AddProject.Pro_Unit"
                            placeholder="请输入计量单位"></el-input>
                </el-form-item>

                <el-form-item prop="Pro_CostPrice" class="testAlign">
                  <div class="textClass">成本价  <a>*</a></div>
                  <el-input v-model="AddProject.Pro_CostPrice"
                            placeholder="请输入成本价"></el-input>
                </el-form-item>

                <el-form-item prop="Pro_ShortLimit" class="testAlign">
                  <div class="textClass">缺货界限 </div>
                  <el-input v-model="AddProject.Pro_ShortLimit"
                            placeholder="请输入缺货界限"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_IsFree" class="testAlign">
                  <div class="textClass">是否赠送</div>
                  <el-radio v-model="AddProject.Pro_IsFree"  label="1">是</el-radio>
                  <el-radio v-model="AddProject.Pro_IsFree" label="0">否</el-radio>
                </el-form-item>
                <el-form-item prop="Pro_MemberPrice" class="testAlign">
                  <div class="textClass">统一会员价  <a v-show="radioedg">*</a></div>
                  <el-input v-model="AddProject.Pro_MemberPrice"
                            placeholder="请输入统一会员价"></el-input>
                </el-form-item>
              </div>
              <div class="divOption">
                <el-form-item prop="Pro_SalePrice" class="testAlign">
                  <div class="textClass">销售价<a>*</a></div>
                  <el-input v-model="AddProject.Pro_SalePrice"
                            placeholder="请输入销售价"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_AvailableTime" class="testAlign">
                  <div class="textClass">可用时间 <a>*</a></div>
                  <el-input v-model="AddProject.Pro_AvailableTime"
                            placeholder="单位为日"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_StatisticalTypeCode" class="testAlign">
                  <div class="textClass">统计分类 <a>*</a></div>
                  <el-select v-model="AddProject.Pro_StatisticalTypeCode" placeholder="请选择统计分类" >
                    <el-option v-for="item in Pro_StatisticalTypeCode" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item prop="Pro_IsStopSale" class="testAlign">
                  <div class="textClass">停止销售</div>
                  <el-radio v-model="AddProject.Pro_IsStopSale" label="1">是</el-radio>
                  <el-radio v-model="AddProject.Pro_IsStopSale" label="0">否</el-radio>
                </el-form-item>
                <el-form-item prop="Pro_IsMemberPrice" class="testAlign">
                  <div class="textClass">是否启用统一会员价格</div>
                  <el-radio v-model="AddProject.Pro_IsMemberPrice" @change="rediod(1)" label="1">是</el-radio>
                  <el-radio v-model="AddProject.Pro_IsMemberPrice" @change="rediod(0)" label="0">否</el-radio>
                </el-form-item>
              </div>
              <div class="divOption">
                <el-form-item prop="Pro_IntegralTypeCode" class="testAlign">
                  <div class="textClass">积分方式</div>
                  <el-select v-model="AddProject.Pro_IntegralTypeCode" placeholder="请选择积分方式" >
                    <el-option v-for="item in Pro_IntegralTypeCode" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="Pro_QualityLimit" class="testAlign">
                  <div class="textClass">保质期</div>
                  <el-input v-model="AddProject.Pro_QualityLimit"
                            placeholder="单位为日"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_ShapeCode" class="testAlign">
                  <div class="textClass">产品形态</div>
                  <el-select v-model="AddProject.Pro_ShapeCode" placeholder="请选择产品形态" >
                    <el-option v-for="item in Pro_ShapeCode" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="Pro_BrandCode" class="testAlign">
                  <div class="textClass">产品品牌</div>
                  <el-select v-model="AddProject.Pro_BrandCode" placeholder="请选择产品品牌" >
                    <el-option v-for="item in Pro_BrandCode" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div style="padding: 30px">
                <el-form-item class="testAlign"  prop="Pro_UseMethod" style=" width:35%;float: left;margin: -20px 25px 0px -15px">
                  <div class="textClass">使用方法</div>
                  <el-input v-model="AddProject.Pro_UseMethod" type="textarea"  :rows="7" class="desc"
                            placeholder="请输入备注"></el-input>
                </el-form-item>
              </div>
              <div style="padding: 30px">
                <el-form-item class="testAlign"  prop="Pro_Efficacy" style=" width: 35%;float: left;margin: -20px 0px 0px 10px">
                  <div class="textClass">产品功能</div>
                  <el-input v-model="AddProject.Pro_Efficacy" type="textarea"  :rows="7" class="desc"
                            placeholder="请输入备注"></el-input>
                </el-form-item>
              </div>
              <div style="padding: 30px">
                <el-form-item class="testAlign"  prop="Pro_Desc" style=" width: 35%;margin: 0px 0px 0px -15px">
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
            <div class="store" >
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
              <el-table-column prop="PI_SalePrice" label="销售成本" align="center">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.PI_SalePrice"
                    placeholder="请输入销售成本"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="PI_FendianPrice" label="门店价格" align="center">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.PI_FendianPrice"
                  placeholder="请输入门店价格"></el-input>
              </template>
              </el-table-column>
              <el-table-column  label="卡级价格" align="center">
                <template slot-scope="scope">
                  <AddProCard  :parentMessage="scope.row.value" @AddProCard="AddProCard"></AddProCard>
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
  import {AddProductItem,CarFendian} from "../../../config/Api"
  import {CommonDictionaryTree,AddProduct} from "../../../config/Api"
  import ModelBox from "../../ModelBox"
  import setup from "./Setup"
  import Upload from "../../Upload"
  import maxUpload from "../../maxUpload"
  import AddProCard from "../Project/AddProCard"
  export default {
    components: {
      setup,
      ModelBox,
      Upload,
      maxUpload,
      AddProCard
    },
    data() {
      return {
        radioedg:true,
        radioed:true,
        qwe:true,
        AddProject: {
          Pro_GUID:'',//项目编号
          Pro_MnemonicCode:'',//产品助记码
          Pro_FenDianPrice:'',//门店体验价格
          Pro_Code:'',    //项目编号
          Pro_ShortLimit:'',//缺货界限
          Pro_MemberPrice:'',//统一会员价格
          Pro_Name:'',     //项目名称
          Pro_IntegralPrice:'',//积分价格
          Pro_PIClassType:'', //项目类别
          Pro_VisitInterval:'', //回访间隔
          Pro_SaveLimit:'',//超储界限
          Pro_Unit:'',//计量单位
          Pro_IsMemberPrice:'1',//是否启用统一会员价格
          Pro_SalePrice:'', //销售单价
          Pro_AvailableTime:'',//可用时间
          Pro_IntegralRate:'',//积分比率
          Pro_CostPrice:'',//成本价
          Pro_QualityLimit:'',//保质期
          Pro_IsFenDianPrice:'1',//是否启用门店价格 0 否 1为是
          Pro_IsStopSale:'0',//停止销售
          Pro_IsFree:'0',//是否赠送
          Pro_Desc:'',//备注
          Pro_UseMethod:'',//使用方法
          Pro_Efficacy:'',//产品功效
          Pro_TypeCode:1,//项目于产品区别   1产品 2项目
        },
        acmodexTreeb:[],
        Pro_StatisticalTypeCode:[],//统计分类
        Pro_ChargType:[],//收费性质
        Pro_StorageCode:[],//计次方式
        Pro_DepartmentCode:[],//归属部门
        Pro_IntegralTypeCode:[],//积分方式
        Pro_ShapeCode:[],//产品形态
        Pro_BrandCode:[],//产品品牌
        Pro_PIClassType:[], //项目类别
        //门店
        table:[],
        tableData:[],
        SetupList:{
          name:'',
          values:'',
        },
        tabData:[],
        tabg:{},
        rules:
          {
            Pro_Name: [
              {required: true, message: '请输入产品名称', trigger: 'blur'},
            ],
            Pro_AvailableTime: [
              {required: true, message: '请输入可用时间', trigger: 'blur'},
            ],
            Pro_CostPrice: [
              {required: true, message: '请输入成本价', trigger: 'blur'},
            ],
            Pro_StatisticalTypeCode: [
              {required: true, message: '请选择统计分类', trigger: 'blur'},
            ],
            Pro_PIClassType: [
              {required: true, message: '请选择产品类别', trigger: 'blur'},
            ],
            Pro_SalePrice:[
              {required: true, message: '请输入销售单价', trigger: 'blur'},
            ],
            Pro_Unit:[
              {required: true, message: '请输入计量单位', trigger: 'blur'},
            ],
            Pro_MemberPrice:[
              {required: true, message: '请输入统一会员价格', trigger: 'blur'},
            ],
            Pro_FenDianPrice:[
              {required: true, message: '请输入门店体验价格', trigger: 'blur'},
            ],
          },
      };
    },
    created(){
      this.select();
    },
    methods: {
      //批量设置
      reload(){
        this.qwe = false;
        this.$nextTick(function () {
          this.qwe = true;
        })
      },
      //启用选择门店
      radioe(val){
        if(val === 1){
          this.radioed = true;
          this.rules.Pro_FenDianPrice[0].required = true;
        }else if(val === 0){
          this.rules.Pro_FenDianPrice[0].required = false;
          this.radioed = false;
        }
      },
      //是否启用统一会员价格
      rediod(val){
        if(val === 1){
          this.radioedg = true;
          this.rules.Pro_MemberPrice[0].required = true;
        }else if(val === 0){
          this.rules.Pro_MemberPrice[0].required = false;
          this.radioedg = false;
        }
      },
      //门店模态框
      modelBox(value){
        this.acmodexTreeb=value;
      },
      //批量设置模态框
      setup(value){
        this.SetupList = value;
        if(this.SetupList.name === '1'){
          if(this.acmodexTreeb.length>0) {
            for(var i = 0;i<this.acmodexTreeb.length;i++){
              this.acmodexTreeb[i].PI_SalePrice = this.SetupList.value;
            }
            this.reload();
          }
        }else if(this.SetupList.name === '2'){
          if(this.acmodexTreeb.length>0) {
            for (var i = 0; i < this.acmodexTreeb.length; i++) {
              this.acmodexTreeb[i].PI_FendianPrice = this.SetupList.value;
            }
            this.reload();
          }
        }
      },
      //获取卡级组
      AddProCard(val){
        this.table = val;
        if(this.table.length > 0){
          for(var i=0;i<this.table.length;i++) {
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
      addP(){
        var kaji={};
        var obj ={};
          for(var i=0;i<this.tabData.length;i++){
            this.tabData[i].Pro_GUID = this.AddProject.Pro_GUID;
          }
          obj = this.tabData;
          kaji.ProductItemFDCardPrice = obj;
          this.$http.post(AddProduct,this.$qs.stringify(kaji)).then(resp=>{
          })
      },
      //获取下拉列表框
      select(){
        let selected = {
          //部门AV21 收费性质AW22  产品类别AB02  积分方式AY24  项目统计分类BB27  产品形态	AZ25  产品品牌	BA26
          CoCode: ["AV21","AW22","BH33","AB02","AY24","BB27","AZ25","BA26"],
        };
        this.$http.post(CommonDictionaryTree,this.$qs.stringify(selected)).then(resp=>{
          for (let position in resp.data.data) {
            if (resp.data.data[position].Co_Code === 'AV21') {
              this.Pro_DepartmentCode = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AW22') {
              this.Pro_ChargType = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'BH33') {
              this.Pro_StorageCode = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AB02') {
              this.Pro_PIClassType = resp.data.data[position].List;
            }else if (resp.data.data[position].Co_Code === 'AY24') {
              this.Pro_IntegralTypeCode = resp.data.data[position].List;
            }
            else if (resp.data.data[position].Co_Code === 'AZ25') {
              this.Pro_ShapeCode = resp.data.data[position].List;
            }
            else if (resp.data.data[position].Co_Code === 'BA26') {
              this.Pro_BrandCode = resp.data.data[position].List;
            }
            else if (resp.data.data[position].Co_Code === 'BB27') {
              this.Pro_StatisticalTypeCode = resp.data.data[position].List;
            }
          }
        })
      },
      //添加方法
      addProject(){
        let params = {
          Pro_ShortLimit : this.AddProject.Pro_ShortLimit,//缺货界限
          Pro_MemberPrice : this.AddProject.Pro_MemberPrice,//统一会员价
          Pro_Name:this.AddProject.Pro_Name,     //项目名称
          Pro_PIClassType:this.AddProject.Pro_PIClassType, //项目类别
          Pro_StatisticalTypeCode:this.AddProject.Pro_StatisticalTypeCode,//项目大类
          Pro_VisitInterval:this.AddProject.Pro_VisitInterval, //回访间隔
          Pro_SaveLimit:this.AddProject.Pro_SaveLimit,//超储界限
          Pro_Unit:this.AddProject.Pro_Unit,//计量单位
          Pro_IsMemberPrice:this.AddProject.Pro_IsMemberPrice,//是否启用统一会员价格
          Pro_SalePrice:this.AddProject.Pro_SalePrice, //销售单价
          Pro_DepartmentCode:this.AddProject.Pro_DepartmentCode,//归属部门
          Pro_StorageCode:this.AddProject.Pro_StorageCode,//计次方式
          Pro_AvailableTime:this.AddProject.Pro_AvailableTime,//可用时间
          Pro_ChargType:this.AddProject.Pro_ChargType,//收费性质
          Pro_IntegralTypeCode:this.AddProject.Pro_IntegralTypeCode,//积分方式
          Pro_ShapeCode:this.AddProject.Pro_ShapeCode,//产品形态
          Pro_BrandCode:this.AddProject.Pro_BrandCode,//产品品牌
          Pro_IntegralRate:this.AddProject.Pro_IntegralRate,//积分比率
          Pro_CostPrice:this.AddProject.Pro_CostPrice,//成本价
          Pro_QualityLimit:this.AddProject.Pro_QualityLimit,//保质期
          Pro_IsFenDianPrice:this.AddProject.Pro_IsFenDianPrice,//是否启用门店价格 0 否 1为是
          Pro_IsStopSale:this.AddProject.Pro_IsStopSale,//停止销售
          Pro_IsFree:this.AddProject.Pro_IsFree,//是否赠送
          Pro_Desc:this.AddProject.Pro_Desc,//备注
          Pro_Efficacy:this.AddProject.Pro_Efficacy,//产品功效
          Pro_UseMethod:this.AddProject.Pro_UseMethod,//使用方法
          Pro_IntegralPrice:this.AddProject.Pro_IntegralPrice,//积分价格
          Pro_FenDianPrice:this.AddProject.Pro_FenDianPrice,//门店体验价格
          Pro_MnemonicCode:this.AddProject.Pro_MnemonicCode,//产品助记码
          Pro_TypeCode:1,//产品
        };
        this.$http.post(AddProductItem, this.$qs.stringify(params)).then(resp => {
          this.AddProject.Pro_GUID = resp.data.data.Pro_GUID;
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            });
          }
          this.proFendian();
        });

      },
      //添加门店
      proFendian(){
        var fendian={};
        var obj ={};
          for(var i=0;i<this.acmodexTreeb.length;i++){
            this.acmodexTreeb[i].Pro_GUID = this.AddProject.Pro_GUID;
            this.acmodexTreeb[i].Fe_GUID = this.acmodexTreeb[i].value;
          }
        obj = this.acmodexTreeb;
        fendian.ProductItemFendian = obj;
        this.$http.post(CarFendian,this.$qs.stringify(fendian)).then(resp=>{
        });
          this.addP();
      },
      //提交表单
      //基础信息
      submitSupplier(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addProject();//
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
    margin-right:2px;
  }
  .infoBox{
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
  .textClass{
    margin:0px 0px -17px 0px;
  }
  .textClass a{
    color: red;
  }
  .desc{
    margin-top: 7px;

  }
  .store{
    overflow: hidden;
    color:#0082d6;
    float: left;
  }
</style>
