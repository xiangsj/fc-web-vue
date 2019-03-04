<template>
  <div>
    <div>
      <div style="width: 98%;text-align: right">
        <el-button type="primary" icon="el-icon-circle-close-outline" @click="resetSupplierForm('UpdProduct')">重置
        </el-button>
        <el-button type="primary" icon="el-icon-edit-outline" @click ="submitSupplier('UpdProduct')">保存
        </el-button>
      </div>
    </div>
    <!--卡片tags-->
    <div style="margin-top: 20px">
      <el-tabs type="border-card">
        <!--基本信息-->
        <el-tab-pane label="基本信息">
          <div class="infoBox" >
            <el-form :model="UpdProduct"  :rules="rules" ref="UpdProduct" class="addForm" status-icon :inline="true"
                     label-position="top">
              <div style="text-align: left;" class="divOption">

                <el-form-item prop="Pro_PIClassType" class="testAlign">
                  <div class="textClass">产品类别<a>*</a></div>
                  <el-select v-model="UpdProduct.Pro_PIClassType" placeholder="请选择产品类别" >
                    <el-option v-for="item in Pro_PIClassType" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="Pro_MnemonicCode" class="testAlign">
                  <div class="textClass">产品助记码</div>
                  <el-input v-model="UpdProduct.Pro_MnemonicCode"
                            placeholder="请输入产品助记码"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_IntegralPrice" class="testAlign">
                  <div class="textClass">积分价格</div>
                  <el-input v-model="UpdProduct.Pro_IntegralPrice"
                            placeholder="请输入积分价格"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_VisitInterval" class="testAlign">
                  <div class="textClass">回访间隔</div>
                  <el-input v-model="UpdProduct.Pro_VisitInterval"
                            placeholder="请输入回访间隔"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_FenDianPrice" class="testAlign">
                  <div class="textClass">门店体验价格<a v-show="radioed">*</a></div>
                  <el-input v-model="UpdProduct.Pro_FenDianPrice"
                            placeholder="请输入门店体验价格"></el-input>
                </el-form-item>
              </div>
              <div class="divOption">

                <el-form-item prop="Pro_Name" class="testAlign">
                  <div class="textClass">产品名称<a>*</a></div>
                  <el-input v-model="UpdProduct.Pro_Name"
                            placeholder="请输入产品名称"></el-input>
                </el-form-item>

                <el-form-item prop="Pro_StorageCode" class="testAlign">
                  <div class="textClass">存放仓库</div>
                  <el-select v-model="UpdProduct.Pro_StorageCode" placeholder="请选择存放仓库" >
                    <el-option v-for="item in Pro_StorageCode" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="Pro_IntegralRate" class="testAlign">
                  <div class="textClass">积分比率</div>
                  <el-input v-model="UpdProduct.Pro_IntegralRate"
                            placeholder="请输入积分比率"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_SaveLimit" class="testAlign">
                  <div class="textClass">超储界限</div>
                  <el-input v-model="UpdProduct.Pro_SaveLimit"
                            placeholder="请输入超储界限"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_IsFenDianPrice" class="testAlign" style="width: 180px">
                  <div class="textClass">是否启用门店体验价格</div>
                  <el-radio @click.native.prevent="onDianValue('1')" v-model="UpdProduct.Pro_IsFenDianPrice" label="1" >是</el-radio>
                  <el-radio @click.native.prevent="onDianValue('0')" v-model="UpdProduct.Pro_IsFenDianPrice" label="0">否</el-radio>
                </el-form-item>
              </div>

              <div class="divOption">
                <el-form-item prop="Pro_Unit" class="testAlign">
                  <div class="textClass">计量单位 <a>*</a></div>
                  <el-input v-model="UpdProduct.Pro_Unit"
                            placeholder="请输入计量单位"></el-input>
                </el-form-item>

                <el-form-item prop="Pro_CostPrice" class="testAlign">
                  <div class="textClass">成本价  <a>*</a></div>
                  <el-input v-model="UpdProduct.Pro_CostPrice"
                            placeholder="请输入成本价"></el-input>
                </el-form-item>

                <el-form-item prop="Pro_ShortLimit" class="testAlign">
                  <div class="textClass">缺货界限 </div>
                  <el-input v-model="UpdProduct.Pro_ShortLimit"
                            placeholder="请输入缺货界限"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_IsFree" class="testAlign">
                  <div class="textClass">是否赠送</div>
                  <el-radio @click.native.prevent="onIsFreeValue('1')" v-model="UpdProduct.Pro_IsFree"  label="1">是</el-radio>
                  <el-radio @click.native.prevent="onIsFreeValue('0')" v-model="UpdProduct.Pro_IsFree" label="0">否</el-radio>
                </el-form-item>
                <el-form-item prop="Pro_MemberPrice" class="testAlign">
                  <div class="textClass">统一会员价  <a v-show="radioedg">*</a></div>
                  <el-input v-model="UpdProduct.Pro_MemberPrice"
                            placeholder="请输入统一会员价"></el-input>
                </el-form-item>
              </div>
              <div class="divOption">
                <el-form-item prop="Pro_SalePrice" class="testAlign">
                  <div class="textClass">销售价<a>*</a></div>
                  <el-input v-model="UpdProduct.Pro_SalePrice"
                            placeholder="请输入销售价"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_AvailableTime" class="testAlign">
                  <div class="textClass">可用时间 <a>*</a></div>
                  <el-input v-model="UpdProduct.Pro_AvailableTime"
                            placeholder="单位为日"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_StatisticalTypeCode" class="testAlign">
                  <div class="textClass">统计分类 <a>*</a></div>
                  <el-select v-model="UpdProduct.Pro_StatisticalTypeCode" placeholder="请选择统计分类" >
                    <el-option v-for="item in Pro_StatisticalTypeCode" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item prop="Pro_IsStopSale" class="testAlign">
                  <div class="textClass">停止销售</div>
                  <el-radio @click.native.prevent="onStopValue('1')" v-model="UpdProduct.Pro_IsStopSale" label="1">是</el-radio>
                  <el-radio @click.native.prevent="onStopValue('0')" v-model="UpdProduct.Pro_IsStopSale" label="0">否</el-radio>
                </el-form-item>
                <el-form-item prop="Pro_IsMemberPrice" class="testAlign">
                  <div class="textClass">是否启用统一会员价格</div>
                  <el-radio @click.native.prevent="onMemValue('1')" v-model="UpdProduct.Pro_IsMemberPrice" label="1">是</el-radio>
                  <el-radio @click.native.prevent="onMemValue('0')" v-model="UpdProduct.Pro_IsMemberPrice" label="0">否</el-radio>
                </el-form-item>
              </div>
              <div class="divOption">

                <el-form-item prop="Pro_IntegralTypeCode" class="testAlign">
                  <div class="textClass">积分方式</div>
                  <el-select v-model="UpdProduct.Pro_IntegralTypeCode" placeholder="请选择积分方式" >
                    <el-option v-for="item in Pro_IntegralTypeCode" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>


                <el-form-item prop="Pro_QualityLimit" class="testAlign">
                  <div class="textClass">保质期</div>
                  <el-input v-model="UpdProduct.Pro_QualityLimit"
                            placeholder="单位为日"></el-input>
                </el-form-item>
                <el-form-item prop="Pro_ShapeCode" class="testAlign">
                  <div class="textClass">产品形态</div>
                  <el-select v-model="UpdProduct.Pro_ShapeCode" placeholder="请选择产品形态" >
                    <el-option v-for="item in Pro_ShapeCode" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="Pro_BrandCode" class="testAlign">
                  <div class="textClass">产品品牌</div>
                  <el-select v-model="UpdProduct.Pro_BrandCode" placeholder="请选择产品品牌" >
                    <el-option v-for="item in Pro_BrandCode" :key="item.Co_Values" :label="item.Co_Name"
                               :value="item.Co_Values"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  class="testAlign">
                  <div class="textClass">确认状态</div>
                  <el-radio @click.native.prevent="onStateValue('1')" v-model="UpdProduct.State" label="1">无效</el-radio>
                  <el-radio @click.native.prevent="onStateValue('0')" v-model="UpdProduct.State" label="0">正常</el-radio>
                </el-form-item>
              </div>
              <div style="padding: 30px">
                <el-form-item class="testAlign"  prop="Pro_UseMethod" style=" width:35%;float: left;margin: -20px 25px 0px -15px">
                  <div class="textClass">使用方法</div>
                  <el-input v-model="UpdProduct.Pro_UseMethod" type="textarea"  :rows="7" class="desc"
                            placeholder="请输入使用方法"></el-input>
                </el-form-item>
              </div>
              <div style="padding: 30px">
                <el-form-item class="testAlign"  prop="Pro_Efficacy" style=" width: 35%;float: left;margin: -20px 0px 0px 10px">
                  <div class="textClass">产品功能</div>
                  <el-input v-model="UpdProduct.Pro_Efficacy" type="textarea"  :rows="7" class="desc"
                            placeholder="请输入产品功能"></el-input>
                </el-form-item>
              </div>
              <div style="padding: 30px">
                <el-form-item class="testAlign"  prop="Pro_Desc" style=" width: 35%;margin: 0px 0px 0px -15px">
                  <div class="textClass">备注</div>
                  <el-input v-model="UpdProduct.Pro_Desc" type="textarea" :rows="7" class="desc"
                            placeholder="请输入备注"></el-input>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </el-tab-pane>
        <!--//选择门店-->
        <el-tab-pane label="选择使用门店/价格">
          <div class="changeStore" v-if="qwe">
            <div class="store">
              <div style="display:inline"><img src="../../../../static/images/select_store.png"/>
                <model-box  style="display:inline" @modelBox="modelBox"></model-box>
              </div>
              <div style="display:inline"><img src="../../../../static/images/piliang.png"/>
                <setup style="display:inline" @setup="setup"></setup>
              </div>
            </div>
            <el-table :data=acmodexTreeb style="width: 100%; color: #3a3a3a;"
                      :header-cell-style="{background:'#f0f8ff'}" align="center" height="630px">
              <el-table-column prop="code" label="门店编号" align="center"></el-table-column>
              <el-table-column prop="name" label="门店名称" align="center"></el-table-column>
              <el-table-column  label="销售成本" align="center">
                <template  slot-scope="scope">
                  <el-input
                    v-model="scope.row.PI_SalePrice"
                    placeholder="请输入销售成本">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column  label="门店价格" align="center">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.PI_FendianPrice"
                    placeholder="请输入门店价格"></el-input>
                </template>
              </el-table-column>
              <el-table-column  label="卡级价格" align="center">
                <template slot-scope="scope">
                  <AddProCard  :parentMessage="scope.row.Fe_GUID" :Proid="Proid" @AddProCard="AddProCard"></AddProCard>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import {UpdateProject,CommonDictionaryTree,CarFendian,EditProject,AddProduct,ProFenItem} from "../../../config/Api"
  import ModelBox from "../../ModelBox"
  import setup from "./Setup"
  import AddProCard from "../Project/AddProCard"
  export default {
    components: {
      ModelBox,
      setup,
      AddProCard,
      // Upload,
      // maxUpload
    },
    data() {
      return {
        UpdProduct: {
          Pro_Unit:'',//计量单位
          Pro_IntegralTypeCode:'',//计分方式
          Pro_MnemonicCode:'',//产品助记码
          Pro_FenDianPrice:'',//门店体验价格
          Pro_ShortLimit:'',//缺货界限
          Pro_MemberPrice:'',//统一会员价格
          Pro_Name:'',     //项目名称
          Pro_IntegralPrice:'',//积分价格
          Pro_PIClassType:'', //产品类别
          Pro_VisitInterval:'', //回访间隔
          Pro_SaveLimit:'',//超储界限
          Pro_IsMemberPrice:'0',//是否启用统一会员价格
          Pro_SalePrice:'', //销售单价
          Pro_AvailableTime:'',//可用时间
          Pro_IntegralRate:'',//积分比率
          Pro_CostPrice:'',//成本价
          Pro_QualityLimit:'',//保质期
          Pro_IsFenDianPrice:'0',//是否启用门店价格 0 否 1为是
          Pro_IsStopSale:'0',//停止销售
          Pro_IsFree:'0',//是否赠送
          Pro_Desc:'',//备注
          Pro_UseMethod:'',//使用方法
          Pro_Efficacy:'',//产品功效
          Pro_TypeCode:1,//项目于产品区别   1产品 2项目
          Pro_StatisticalTypeCode:'',
          Pro_StorageCode:'',
          Pro_ChargType:[],//收费性质
          Pro_ShapeCode:'',//产品形态
          Pro_BrandCode:'',//产品品牌
          State:''
        },
        radioed:true,
        radioedg:true,
        acmodexTreeb:[],
        Pro_StatisticalTypeCode:[],//统计分类
        Pro_ChargType:[],//收费性质
        Pro_StorageCode:[],//计次方式
        Pro_IntegralTypeCode:[],//积分方式
        Pro_ShapeCode:[],//产品形态
        Pro_BrandCode:[],//产品品牌
        Pro_PIClassType:[], //产品类别
        tableData:[],
        qwe:true,
        table:[],
        Proid:this.$route.params.Guid,
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
            Pro_FenDianPrice:[
              {required: true, message: '请输入门店价格', trigger: 'blur'},
            ],
            Pro_MemberPrice:[
              {required: true, message: '请输入统一会员价格', trigger: 'blur'},
            ],
          },
      };
    },
    created(){
      this.select();
      this.queryProductList();
      this.mendian();//获取门店数组
    },
    methods: {
      //批量设置
      reload(){
        this.qwe = false;
        this.$nextTick(function () {
          this.qwe = true;
        })
      },
      //获取门店接口
      mendian(){
        this.$http.post(ProFenItem + this.$route.params.Guid).then(resp=> {
          this.acmodexTreeb = resp.data.data;
        });
        this.reload();
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
      //添加门店
      proFendian(){
        var fendian={};
        var obj ={};
        for(var i=0;i<this.acmodexTreeb.length;i++){
          this.acmodexTreeb[i].Pro_GUID = this.$route.params.Guid;
        }
        obj = this.acmodexTreeb;
        fendian.ProductItemFendian = obj;
        this.$http.post(CarFendian,this.$qs.stringify(fendian)).then(resp=>{
        });
        this.addP();
      },
      //获取卡级数组
      AddProCard(val){
        this.table = val;
        let tabg = {};
        for(var i=0;i<this.table.length;i++) {
          tabg = {};
          tabg.ProF_CardPrice = this.table[i].ProF_CardPrice;
          tabg.ProF_CardDiscount = this.table[i].ProF_CardDiscount;
          tabg.Fe_GUID = this.table[i].parentMessage;
          tabg.Ca_GUID = this.table[i].Ca_GUID;
          this.tableData.push(tabg);
        }
      },
      //添加卡级
      addP(){
        var kaji={};
        var obj ={};
        if(this.tableData.length>0) {
          for (var i = 0; i < this.tableData.length; i++) {
            this.tableData[i].Pro_GUID = this.$route.params.Guid;
          }
          obj = this.tableData;
          kaji.ProductItemFDCardPrice = obj;
          this.$http.post(AddProduct, this.$qs.stringify(kaji)).then(resp => {
          })
        }
      },
      //门店模态框
      modelBox(value){
        this.acmodexTreeb=value;
      },

      //获取下拉列表框
      select(){
        let selected = {
          CoCode: ["AV21","AW22","BH33","AC03","AY24","BC28","AZ25","BA26"],
        };
        this.$http.post(CommonDictionaryTree,this.$qs.stringify(selected)).then(resp=>{
          for (let position in resp.data.data) {
            if (resp.data.data[position].Co_Code === 'AV21') {
              this.Pro_DepartmentCode = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AW22') {
              this.Pro_ChargType = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'BH33') {
              this.Pro_StorageCode = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AC03') {
              this.Pro_PIClassType = resp.data.data[position].List;
            }else if (resp.data.data[position].Co_Code === 'AY24') {
              this.Pro_IntegralTypeCode = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'AZ25') {
              this.Pro_ShapeCode = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'BA26') {
              this.Pro_BrandCode = resp.data.data[position].List;
            } else if (resp.data.data[position].Co_Code === 'BC28') {
              this.Pro_StatisticalTypeCode = resp.data.data[position].List;
            }
          }
        })
      },
      onStateValue(data){
        this.UpdProduct.State = data;
      },
      onMemValue(data){
        if(data === '1'){
          this.rules.Pro_MemberPrice[0].required = true;
          this.radioedg = true;
        }else if(data === '0'){
          this.rules.Pro_MemberPrice[0].required = false;
          this.radioedg = false;
        }
        this.UpdProduct.Pro_IsMemberPrice = data;
      },
      onStopValue(data){
        this.UpdProduct.Pro_IsStopSale = data;
      },
      onIsFreeValue(data){
        this.UpdProduct.Pro_IsFree = data;
      },
      onDianValue(data){
        if(data === '1'){
          this.rules.Pro_FenDianPrice[0].required = true;
          this.radioed = true;
        }else if(data === '0'){
          this.rules.Pro_FenDianPrice[0].required = false;
          this.radioed = false;
        }
        this.UpdProduct.Pro_IsFenDianPrice = data;
      },
      //根据id查询
      queryProductList(){
        this.$http.post(UpdateProject + this.$route.params.Guid).then(resp=> {
            this.UpdProduct.Pro_MnemonicCode = resp.data.data.Pro_MnemonicCode;//产品助记码
            this.UpdProduct.Pro_FenDianPrice= resp.data.data.Pro_FenDianPrice;//门店体验价格
            this.UpdProduct.Pro_ShortLimit= resp.data.data.Pro_ShortLimit;//缺货界限
            this.UpdProduct.Pro_MemberPrice= resp.data.data.Pro_MemberPrice;//统一会员价格
            this.UpdProduct.Pro_Name= resp.data.data.Pro_Name;    //项目名称
            this.UpdProduct.Pro_IntegralPrice= resp.data.data.Pro_IntegralPrice;//积分价格
            this.UpdProduct.Pro_PIClassType= resp.data.data.Pro_PIClassType; //产品类别
            this.UpdProduct.Pro_VisitInterval= resp.data.data.Pro_VisitInterval; //回访间隔
            this.UpdProduct.Pro_SaveLimit= resp.data.data.Pro_SaveLimit;//超储界限
            this.UpdProduct.Pro_IsMemberPrice= resp.data.data.Pro_IsMemberPrice+'';//是否启用统一会员价格
            this.UpdProduct.Pro_SalePrice= resp.data.data.Pro_SalePrice;//销售单价
            this.UpdProduct.Pro_AvailableTime= resp.data.data.Pro_AvailableTime;//可用时间
            this.UpdProduct.Pro_IntegralRate= resp.data.data.Pro_IntegralRate;//积分比率
            this.UpdProduct.Pro_CostPrice= resp.data.data.Pro_CostPrice;//成本价
            this.UpdProduct.Pro_QualityLimit= resp.data.data.Pro_QualityLimit;//保质期
            this.UpdProduct.Pro_IsFenDianPrice= resp.data.data.Pro_IsFenDianPrice+'';//是否启用门店价格 0 否 1为是
            this.UpdProduct.Pro_IsStopSale= resp.data.data.Pro_IsStopSale+'';//停止销售
            this.UpdProduct.Pro_IsFree= resp.data.data.Pro_IsFree+'';//是否赠送
            this.UpdProduct.Pro_Desc= resp.data.data.Pro_Desc;//备注
            this.UpdProduct.Pro_UseMethod= resp.data.data.Pro_UseMethod;//使用方法
            this.UpdProduct.Pro_Efficacy= resp.data.data.Pro_Efficacy;//产品功效
            this.UpdProduct.State= resp.data.data.State+'';
            this.UpdProduct.Pro_IntegralTypeCode=resp.data.data.Pro_IntegralTypeCode;//积分方式
            this.UpdProduct.Pro_Unit = resp.data.data.Pro_Unit;//计量单位
            this.UpdProduct.Pro_StatisticalTypeCode = resp.data.data.Pro_StatisticalTypeCode;//统计分类
            this.UpdProduct.Pro_StorageCode = resp.data.data.Pro_StorageCode;//存放仓库
            this.UpdProduct.Pro_ShapeCode = resp.data.data.Pro_ShapeCode;//产品形态
            this.UpdProduct.Pro_BrandCode = resp.data.data.Pro_BrandCode;//产品品牌
        })
      },
      //修改方法
      UpdateProduct(){
        let params = {
          Pro_GUID: this.$route.params.Guid,
          Pro_ShortLimit : this.UpdProduct.Pro_ShortLimit,//缺货界限
          Pro_MemberPrice : this.UpdProduct.Pro_MemberPrice,//统一会员价
          Pro_Name:this.UpdProduct.Pro_Name,     //项目名称
          Pro_PIClassType:this.UpdProduct.Pro_PIClassType, //项目类别
          Pro_StatisticalTypeCode:this.UpdProduct.Pro_StatisticalTypeCode,//项目大类
          Pro_VisitInterval:this.UpdProduct.Pro_VisitInterval, //回访间隔
          Pro_SaveLimit:this.UpdProduct.Pro_SaveLimit,//超储界限
          Pro_IsMemberPrice:this.UpdProduct.Pro_IsMemberPrice,//是否启用统一会员价格
          Pro_SalePrice:this.UpdProduct.Pro_SalePrice, //销售单价
          Pro_DepartmentCode:this.UpdProduct.Pro_DepartmentCode,//归属部门
          Pro_StorageCode:this.UpdProduct.Pro_StorageCode,//计次方式
          Pro_AvailableTime:this.UpdProduct.Pro_AvailableTime,//可用时间
          Pro_ChargType:this.UpdProduct.Pro_ChargType,//收费性质
          Pro_IntegralTypeCode:this.UpdProduct.Pro_IntegralTypeCode,//积分方式
          Pro_ShapeCode:this.UpdProduct.Pro_ShapeCode,//产品形态
          Pro_BrandCode:this.UpdProduct.Pro_BrandCode,//产品品牌
          Pro_IntegralRate:this.UpdProduct.Pro_IntegralRate,//积分比率
          Pro_CostPrice:this.UpdProduct.Pro_CostPrice,//成本价
          Pro_QualityLimit:this.UpdProduct.Pro_QualityLimit,//保质期
          Pro_IsFenDianPrice:this.UpdProduct.Pro_IsFenDianPrice,//是否启用门店价格 0 否 1为是
          Pro_IsStopSale:this.UpdProduct.Pro_IsStopSale,//停止销售
          Pro_IsFree:this.UpdProduct.Pro_IsFree,//是否赠送
          Pro_Desc:this.UpdProduct.Pro_Desc,//备注
          Pro_Efficacy:this.UpdProduct.Pro_Efficacy,//产品功效
          Pro_UseMethod:this.UpdProduct.Pro_UseMethod,//使用方法
          Pro_IntegralPrice:this.UpdProduct.Pro_IntegralPrice,//积分价格
          Pro_FenDianPrice:this.UpdProduct.Pro_FenDianPrice,//门店体验价格
          State:this.UpdProduct.State,
          Pro_Unit:this.UpdProduct.Pro_Unit,//计量单位
          Pro_MnemonicCode : this.UpdProduct.Pro_MnemonicCode,//产品助记码
          Pro_TypeCode:1,//项目于产品区别   1产品 2项目
        };
        this.$http.post(EditProject, this.$qs.stringify(params)).then(resp => {
          if (resp.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
          }
          this.proFendian();
        });
      },
      //提交表单
      //基础信息
      submitSupplier(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.UpdateProduct();//
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //取消输入内容
      resetSupplierForm(UpdProduct) {
        this.$refs[UpdProduct].resetFields();
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
