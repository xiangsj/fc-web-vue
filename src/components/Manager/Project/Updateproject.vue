<template>
    <div>
      <div>
        <div style="width: 98%;text-align: right">
          <el-button type="primary" icon="el-icon-circle-close-outline" @click="resetSupplierForm('updateProject')">重置
          </el-button>
          <el-button type="primary" icon="el-icon-edit-outline" @click ="submitSupplier('updateProject')">保存
          </el-button>
        </div>
      <div style="margin-top: 20px">
        <el-tabs type="border-card">
          <!--基本信息-->
          <el-tab-pane label="基本信息">
            <div class="infoBox" >
              <el-form :model="UpdateProject" :rules="rules"  ref="updateProject" class="addForm" status-icon :inline="true"
                       label-position="top">
                <div style="text-align: left;" class="divOption">
                  <el-form-item  class="testAlign" prop="Pro_Name">
                    <div class="textClass">项目名称<a>*</a></div>
                    <el-input v-model="UpdateProject.Pro_Name"
                              placeholder="请输入项目名称"></el-input>
                  </el-form-item>
                  <el-form-item  class="testAlign" >
                    <div class="textClass">归属部门</div>
                    <el-select v-model="UpdateProject.Pro_DepartmentCode" placeholder="请选择归属部门" >
                      <el-option v-for="item in Pro_DepartmentCode" :key="item.Co_Values" :label="item.Co_Name"
                                 :value="item.Co_Values"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item  class="testAlign">
                    <div class="textClass">项目条码</div>
                    <el-input v-model="UpdateProject.Pro_Barcode"
                              placeholder="请输入项目条码"></el-input>
                  </el-form-item>
                  <el-form-item  class="testAlign">
                    <div class="textClass">收费性质</div>
                    <el-select v-model="UpdateProject.Pro_ChargType" placeholder="请选择收费性质" >
                      <el-option v-for="item in Pro_ChargType" :key="item.Co_Values" :label="item.Co_Name"
                                 :value="item.Co_Values"></el-option>
                    </el-select>
                  </el-form-item >
                  <!--<div>-->
                    <!--图片-->
                  <!--</div>-->
                  <!--<Upload></Upload>-->
                </div>
                <div class="divOption">
                  <el-form-item  class="testAlign" prop="Pro_PIClassType">
                    <div class="textClass">项目类别<a>*</a></div>
                    <el-select v-model="UpdateProject.Pro_PIClassType" placeholder="请选择项目类别" >
                      <el-option v-for="item in Pro_PIClassType" :key="item.Co_Values" :label="item.Co_Name"
                                 :value="item.Co_Values"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item  class="testAlign">
                    <div class="textClass">计次方式</div>
                    <el-select v-model="UpdateProject.Pro_TimesCountType" placeholder="请选择计次方式" >
                      <el-option v-for="item in Pro_TimesCountType" :key="item.Co_Values" :label="item.Co_Name"
                                 :value="item.Co_Values"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item  class="testAlign">
                    <div class="textClass">标准工时</div>
                    <el-input v-model="UpdateProject.Pro_StandardHour"
                              placeholder="请输入标准工时"></el-input>
                  </el-form-item>
                  <el-form-item  class="testAlign" prop="Pro_FenDianPrice">
                    <div class="textClass">门店体验价格 <a v-show="radioed">*</a></div>
                    <el-input v-model="UpdateProject.Pro_FenDianPrice"
                              placeholder="请输入门店体验价格"></el-input>
                  </el-form-item>
                </div>
                <div class="divOption">
                  <el-form-item  class="testAlign"  prop="Pro_SalePrice">
                    <div class="textClass">销售单价<a>*</a></div>
                    <el-input v-model="UpdateProject.Pro_SalePrice"
                              placeholder="请输入项目条码"></el-input>
                  </el-form-item>
                  <el-form-item  class="testAlign">
                    <div class="textClass">积分方式</div>
                    <el-select v-model="UpdateProject.Pro_IntegralTypeCode" placeholder="请选择积分方式" >
                      <el-option v-for="item in Pro_IntegralTypeCode" :key="item.Co_Values" :label="item.Co_Name"
                                 :value="item.Co_Values"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item  class="testAlign">
                    <div class="textClass">积分比率</div>
                    <el-input v-model="UpdateProject.Pro_IntegralRate"
                              placeholder="请输入积分比率"></el-input>
                  </el-form-item>

                  <el-form-item  class="testAlign">
                    <div class="textClass">是否启用门店体验价格</div>
                    <el-radio @click.native.prevent="onIsPriceValue('1')"  v-model="UpdateProject.Pro_IsFenDianPrice" label="1">是</el-radio>
                    <el-radio @click.native.prevent="onIsPriceValue('0')"  v-model="UpdateProject.Pro_IsFenDianPrice" label="0">否</el-radio>
                  </el-form-item>
                </div>
                <div class="divOption">
                  <el-form-item  class="testAlign">
                    <div class="textClass">回访间隔</div>
                    <el-input v-model="UpdateProject.Pro_VisitInterval"
                              placeholder="请输入回访间隔"></el-input>
                  </el-form-item>
                  <el-form-item  class="testAlign">
                    <div class="textClass">统计分类</div>
                    <el-select v-model="UpdateProject.Pro_StatisticalTypeCode" placeholder="请选择统计分类" >
                      <el-option v-for="item in Pro_StatisticalTypeCode" :key="item.Co_Values" :label="item.Co_Name"
                                 :value="item.Co_Values"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item  class="testAlign">
                    <div class="textClass">是否可以使用现金</div>
                    <el-radio @click.native.prevent="onIsUseValue('1')" v-model="UpdateProject.Pro_IsUseCash" label="1">是</el-radio>
                    <el-radio @click.native.prevent="onIsUseValue('0')" v-model="UpdateProject.Pro_IsUseCash" label="0">否</el-radio>
                  </el-form-item>
                  <el-form-item  class="testAlign" prop="Pro_MemberPrice">
                    <div class="textClass">统一会员价格 <a v-show="radioedg">*</a></div>
                    <el-input v-model="UpdateProject.Pro_MemberPrice"
                              placeholder="请输入统一会员价格"></el-input>
                  </el-form-item>
                </div>
                <div class="divOption">
                  <el-form-item class="testAlign">
                    <div class="textClass">安全次数</div>
                    <el-input v-model="UpdateProject.Pro_ShortLimit"
                              placeholder="请输入安全次数"></el-input>
                  </el-form-item>
                  <el-form-item  class="testAlign">
                    <div class="textClass">消费间隔</div>
                    <el-input v-model="UpdateProject.Pro_It_SaleInterval"
                              placeholder="请输入消费间隔"></el-input>
                  </el-form-item>
                  <el-form-item  class="testAlign">
                    <div class="textClass">是否可以评价</div>
                    <el-radio @click.native.prevent="onIsComentValue('1')" v-model="UpdateProject.Pro_IsUseComent" label="1">是</el-radio>
                    <el-radio @click.native.prevent="onIsComentValue('0')" v-model="UpdateProject.Pro_IsUseComent" label="0">否</el-radio>
                  </el-form-item>

                  <el-form-item  class="testAlign">
                    <div class="textClass">是否启用统一会员价格</div>
                    <el-radio @click.native.prevent="onIsMemberValue('1')" v-model="UpdateProject.Pro_IsMemberPrice" label="1">是</el-radio>
                    <el-radio @click.native.prevent="onIsMemberValue('0')" v-model="UpdateProject.Pro_IsMemberPrice" label="0">否</el-radio>
                  </el-form-item>
                  <el-form-item  class="testAlign">
                    <div class="textClass">状态</div>
                    <el-radio @click.native.prevent="onStateValue('1')" v-model="UpdateProject.State" label="1">无效</el-radio>
                    <el-radio @click.native.prevent="onStateValue('0')" v-model="UpdateProject.State" label="0">正常</el-radio>
                  </el-form-item>
                </div>
                <div style="padding: 30px">
                  <el-form-item class="testAlign"   style="margin:-15px 0px 0px 15px">
                    <div class="textClass">备注</div>
                    <el-input v-model="UpdateProject.Pro_Desc" type="textarea" :rows="7" class="desc"
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
                  <model-box :FendianNode="FendianNode" style="display:inline" @modelBox="modelBox"></model-box>
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
                    <AddProCard  :parentMessage="scope.row.Fe_GUID" :AddOrUpdata="UpdataCardPrice" :submitSuccess="IsSubmitSuccess" :Proid="Proid" @AddProCard="AddProCard"></AddProCard>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      </div>
    </div>
</template>

<script>
  import {UpdateProject,CommonDictionaryTree,EditProject,ProFenItem,AddProduct,CarFendian} from "../../../config/Api"
  import modelBox from "../../ModelBox"
  import Upload from "../../Upload"
  import setup from "../Product/Setup"
  import maxUpload from "../../maxUpload"
  import AddProCard from "./AddProCard"
    export default {
    components:{
      modelBox,
      maxUpload,
      setup,
      Upload,
      AddProCard,
    },
      data(){
        return{
          UpdataCardPrice:'UpdataCardPrice',
          IsSubmitSuccess:'',
          FendianNode:[],
          qwe:true,
          Pro_IntegralTypeCode:'',
          Pro_StatisticalTypeCode:[],
          Pro_ChargType:[],
          Pro_MemberPrice:'',
          Pro_TimesCountType:'',
          Pro_PIClassType:'',
          Proid:this.$route.params.Guid,
          radioed:true,
          radioedg:true,
          tableData:[],
          table:[],
          Pro_DepartmentCode:'',
          UpdateProject:{
            Pro_TypeCode:2,
            Pro_Name: '',
            Pro_PIClassType:'',
            Pro_Barcode: '',
            Pro_SalePrice:'',
            Pro_DepartmentCode: '',
            Pro_TimesCountType: '',
            Pro_StandardHour: '',
            Pro_ShortLimit: '',
            Pro_MemberPrice:'',
            Pro_ChargType: '',
            Pro_IntegralTypeCode: '',
            Pro_Desc:'',
            Pro_IntegralRate: '',
            Pro_It_SaleInterval: '',
            Pro_VisitInterval: '',
            Pro_StatisticalTypeCode: '',
            Pro_IsMemberPrice:'',
            Pro_IsUseCash:'',
            Pro_IsUseComent:'',
            Pro_IsFenDianPrice:'',
            Pro_FenDianPrice:'',
            State:'',
          },
          acmodexTreeb:[],
          rules:
            {
              Pro_Name: [
                {required: true, message: '请输入项目名称', trigger: 'blur'},
              ],
              Pro_PIClassType: [
                {required: true, message: '请选择项目类别', trigger: 'blur'},
              ],
              Pro_SalePrice:[
                {required: true, message: '请输入销售单价', trigger: 'blur'},
              ],
              Pro_FenDianPrice:[
                {required: true, message: '请输入门店价格', trigger: 'blur'},
              ],
              Pro_MemberPrice:[
                {required: true, message: '请输入统一会员价格', trigger: 'blur'},
              ],
            },
          selectTree:[],
        }
      },
      created(){
        this.queryProjectList();//根据id查询
        this.querySelectList();//获取字典树
        this.mendian();//获取门店数组
      },
      methods:{
        //批量设置
        reload(){
          this.qwe = false;
          this.$nextTick(function () {
            this.qwe = true;
          })
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
        //批量设置模态框
        setup(value){
          this.SetupList = value;
          if(this.SetupList.name === '1'){
              for(var i = 0;i<this.acmodexTreeb.length;i++){
                this.acmodexTreeb[i].PI_SalePrice = this.SetupList.value;
              }
              this.reload();
          }else if(this.SetupList.name === '2'){
              for (var i = 0; i < this.acmodexTreeb.length; i++) {
                this.acmodexTreeb[i].PI_FendianPrice = this.SetupList.value;
              }
              this.reload();
          }
        },
      //获取自组件数组
        modelBox(value){
          this.acmodexTreeb=value;
        },
      //获取门店接口
        mendian(){
          this.$http.post(ProFenItem + this.$route.params.Guid).then(resp=> {
            this.acmodexTreeb = resp.data.data;
            this.FendianNode = this.acmodexTreeb;
          });
          this.reload();
        },
      //提交表单
      submitSupplier(UpdateProject){
          this.$refs[UpdateProject].validate((valid) => {
            if (valid) {
              this.IsSubmitSuccess='Success';
              this.EditProject();
            } else {
              console.log('error submit!!');
              return false;
            }
          });
       },
        //修改方法
        EditProject(){
          let params={
            Pro_GUID: this.$route.params.Guid,
            Pro_Name:this.UpdateProject.Pro_Name,
            Pro_PIClassType:this.UpdateProject.Pro_PIClassType,
            Pro_Barcode:this.UpdateProject.Pro_Barcode,
            Pro_SalePrice:this.UpdateProject.Pro_SalePrice,
            Pro_DepartmentCode:this.UpdateProject.Pro_DepartmentCode,
            Pro_TimesCountType:this.UpdateProject.Pro_TimesCountType,
            Pro_StandardHour:this.UpdateProject.Pro_StandardHour,
            Pro_ShortLimit:this.UpdateProject.Pro_ShortLimit,
            Pro_ChargType:this.UpdateProject.Pro_ChargType,
            Pro_IntegralTypeCode:this.UpdateProject.Pro_IntegralTypeCode,
            Pro_IntegralRate:this.UpdateProject.Pro_IntegralRate,
            Pro_It_SaleInterval: this.UpdateProject.Pro_It_SaleInterval,
            Pro_VisitInterval: this.UpdateProject.Pro_VisitInterval,
            Pro_StatisticalTypeCode:this.UpdateProject.Pro_StatisticalTypeCode,
            Pro_IsMemberPrice:this.UpdateProject.Pro_IsMemberPrice,
            Pro_IsUseCash:this.UpdateProject.Pro_IsUseCash,
            Pro_IsUseComent:this.UpdateProject.Pro_IsUseComent,
            Pro_IsFenDianPrice:this.UpdateProject.Pro_IsFenDianPrice,
            State:this.UpdateProject.State,
            Pro_FenDianPrice:this.UpdateProject.Pro_FenDianPrice,
            Pro_MemberPrice:this.UpdateProject.Pro_MemberPrice,
            Pro_Desc:this.UpdateProject.Pro_Desc,
            Pro_TypeCode:2,
          };
            this.$http.post(EditProject,this.$qs.stringify(params)).then(resp=>{
              if (resp.data.code === 0) {
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success'
                });
              }
              this.proFendian();
            })
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
      //清空方法
        resetSupplierForm(UpdateProject){
          this.$refs[UpdateProject].resetFields();
        },
        //单选
        onIsMemberValue(data){
          if(data === '1'){
            this.rules.Pro_FenDianPrice[0].required = true;
            this.radioedg = true;
          }else if(data === '0'){
            this.rules.Pro_FenDianPrice[0].required = false;
            this.radioedg = false;
          }
          this.UpdateProject.Pro_IsMemberPrice = data;
        },
        onIsUseValue(data){
          this.UpdateProject.Pro_IsUseCash = data;
        },
        onIsComentValue(data){
          this.UpdateProject.Pro_IsUseComent = data;
        },
        onIsPriceValue(data){

          this.UpdateProject.Pro_IsFenDianPrice = data;
          if(data === '1'){
            this.radioed = true;
            this.rules.Pro_FenDianPrice[0].required = true;
          }else if(data === '0'){
            this.rules.Pro_FenDianPrice[0].required = false;
            this.radioed = false;
          }
        },
        onStateValue(data){
          this.UpdateProject.State = data;
        },
//根据id查询
        queryProjectList(){
          this.$http.post(UpdateProject + this.$route.params.Guid).then(resp=>{
            this.UpdateProject.Pro_Name = resp.data.data.Pro_Name;
            this.UpdateProject.Pro_PIClassType = resp.data.data.Pro_PIClassType;
            this.UpdateProject.Pro_Barcode = resp.data.data.Pro_Barcode;
            this.UpdateProject.Pro_SalePrice = resp.data.data.Pro_SalePrice;
            this.UpdateProject.Pro_DepartmentCode = resp.data.data.Pro_DepartmentCode;
            this.UpdateProject.Pro_TimesCountType = resp.data.data.Pro_TimesCountType;
            this.UpdateProject.Pro_StandardHour = resp.data.data.Pro_StandardHour;
            this.UpdateProject.Pro_ShortLimit = resp.data.data.Pro_ShortLimit;
            this.UpdateProject.Pro_ChargType = resp.data.data.Pro_ChargType;
            this.UpdateProject.Pro_IntegralTypeCode = resp.data.data.Pro_IntegralTypeCode;
            this.UpdateProject.Pro_IntegralRate = resp.data.data.Pro_IntegralRate;
            this.UpdateProject.Pro_It_SaleInterval = resp.data.data.Pro_It_SaleInterval;
            this.UpdateProject.Pro_VisitInterval = resp.data.data.Pro_VisitInterval;
            this.UpdateProject.Pro_StatisticalTypeCode = resp.data.data.Pro_StatisticalTypeCode;
            this.UpdateProject.Pro_IsMemberPrice = resp.data.data.Pro_IsMemberPrice+'';
            this.UpdateProject.Pro_IsUseCash = resp.data.data.Pro_IsUseCash+'';
            this.UpdateProject.Pro_IsUseComent = resp.data.data.Pro_IsUseComent+'';
            this.UpdateProject.Pro_IsFenDianPrice = resp.data.data.Pro_IsFenDianPrice+'';
            this.UpdateProject.Pro_FenDianPrice = resp.data.data.Pro_FenDianPrice;
            this.UpdateProject.Pro_MemberPrice = resp.data.data.Pro_MemberPrice;
            this.UpdateProject.State = resp.data.data.State+'';
            this.UpdateProject.Pro_Desc = resp.data.data.Pro_Desc;

          })
        },
        //获取字典树
        querySelectList(){
        let radio = {
          CoCode:["AW22","AY24","BB27","AX23","AV21","AC03"],
        };
          this.$http.post(CommonDictionaryTree,this.$qs.stringify(radio)).then(resp=>{
            for (let i in resp.data.data) {
              if (resp.data.data[i].Co_Code === 'AW22') {
                this.Pro_ChargType = resp.data.data[i].List;
              }else if (resp.data.data[i].Co_Code === 'AY24') {
                this.Pro_IntegralTypeCode  = resp.data.data[i].List;
              }else if (resp.data.data[i].Co_Code === 'BB27') {
                this.Pro_StatisticalTypeCode  = resp.data.data[i].List;
              }else if (resp.data.data[i].Co_Code === 'AX23') {
                this.Pro_TimesCountType  = resp.data.data[i].List;
              }else if (resp.data.data[i].Co_Code === 'AV21') {
                this.Pro_DepartmentCode  = resp.data.data[i].List;
              }else if (resp.data.data[i].Co_Code === 'AC03') {
                this.Pro_PIClassType  = resp.data.data[i].List;
              }
            }
          })
        },
      },
        name: "Updateproject"
    }
</script>

<style>

  .infoBox .el-input__inner {
    height: 30px !important;
    font-size: 12px;
    margin-right:2px;
    /*width:180px;*/
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
    padding: 10px 30px 0px 30px;
  }
  .textClass{
    margin:0px 0px -17px 0px;
  }
  .textClass a{
    color: red;
  }
  .desc{
    margin-top: 7px;
    width: 300px;
  }
  .store{
    overflow: hidden;
    color:#0082d6;
    float: left;
  }

</style>
